/**
 * PM2 cron (every 5 min): auto check-in/out, lunch sync, cierre tardío.
 * This script stays plain Node.js because production installs omit devDependencies.
 */
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./prod.db";
const LATE_CHECKOUT_GRACE_MINUTES = 15;

function todayCO() {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

function parseTime(dateStr, hhmm) {
    return new Date(`${dateStr}T${hhmm}:00-05:00`);
}

function getWeekdayInBogota(dateStr) {
    return new Date(`${dateStr}T12:00:00-05:00`).getDay();
}

function getScheduleForUser(user, dateStr) {
    const day = getWeekdayInBogota(dateStr);

    if (day === 0) return null;

    if (day === 6 && user.satWorkStart && user.satWorkEnd) {
        return {
            workStart: user.satWorkStart,
            morningEnd: user.satWorkEnd,
            lunchStart: user.satWorkEnd,
            lunchEnd: user.satWorkEnd,
            workEnd: user.satWorkEnd,
            hasLunchBreak: false,
        };
    }

    if (day === 6) return null;

    const workEnd = day === 5 ? (user.friWorkEnd ?? user.workEnd) : user.workEnd;

    return {
        workStart: user.workStart,
        morningEnd: user.morningEnd,
        lunchStart: user.lunchStart,
        lunchEnd: user.lunchEnd,
        workEnd,
        hasLunchBreak: true,
    };
}

function isAtOrPastScheduledEnd(now, dateStr, schedule) {
    return now.getTime() >= parseTime(dateStr, schedule.workEnd).getTime();
}

function isPastLateCheckoutGrace(now, dateStr, schedule) {
    const workEnd = parseTime(dateStr, schedule.workEnd);
    return now.getTime() >= workEnd.getTime() + LATE_CHECKOUT_GRACE_MINUTES * 60_000;
}

function isInLunchWindow(now, dateStr, schedule) {
    if (!schedule.hasLunchBreak) return false;
    const lunchStart = parseTime(dateStr, schedule.lunchStart);
    const lunchEnd = parseTime(dateStr, schedule.lunchEnd);
    const time = now.getTime();
    return time >= lunchStart.getTime() && time < lunchEnd.getTime();
}

function isAfterLunch(now, dateStr, schedule) {
    if (!schedule.hasLunchBreak) return false;
    return now.getTime() >= parseTime(dateStr, schedule.lunchEnd).getTime();
}

async function autoCloseShiftAtScheduledEnd(prisma, shiftId, workEnd, opts) {
    return prisma.shift.update({
        where: { id: shiftId },
        data: {
            checkOut: workEnd,
            status: "completed",
            isEarly: false,
            autoCheckout: opts.autoCheckout,
            isLateCheckout: opts.isLateCheckout,
        },
    });
}

async function applyScheduledCheckout(prisma, shift, user, schedule, date, now) {
    if (shift.checkOut) return shift;

    const workEnd = parseTime(date, schedule.workEnd);

    if (user.autoAttendance && isAtOrPastScheduledEnd(now, date, schedule)) {
        return autoCloseShiftAtScheduledEnd(prisma, shift.id, workEnd, {
            autoCheckout: true,
            isLateCheckout: false,
        });
    }

    if (!user.autoAttendance && isPastLateCheckoutGrace(now, date, schedule)) {
        return autoCloseShiftAtScheduledEnd(prisma, shift.id, workEnd, {
            autoCheckout: true,
            isLateCheckout: true,
        });
    }

    return shift;
}

async function ensureAutoAttendanceCheckIn(prisma, user, schedule, date, now) {
    if (!user.autoAttendance) return null;

    const existing = await prisma.shift.findUnique({
        where: { userId_date: { userId: user.id, date } },
    });
    if (existing) return existing;

    const workStart = parseTime(date, schedule.workStart);
    const workEnd = parseTime(date, schedule.workEnd);
    if (now.getTime() < workStart.getTime()) return null;
    if (now.getTime() >= workEnd.getTime()) return null;

    return prisma.shift.create({
        data: {
            userId: user.id,
            date,
            checkIn: workStart,
            isLate: false,
            autoCheckIn: true,
            status: "active",
        },
    });
}

async function syncUserShiftSchedule(prisma, userId, now = new Date()) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const date = todayCO();
    const schedule = getScheduleForUser(user, date);
    if (!schedule) return null;

    let shift = await prisma.shift.findUnique({
        where: { userId_date: { userId, date } },
    });

    if (!shift) {
        shift = await ensureAutoAttendanceCheckIn(prisma, user, schedule, date, now);
        if (!shift) return null;
    }

    if (shift.checkOut) return shift;

    shift = await applyScheduledCheckout(prisma, shift, user, schedule, date, now);
    if (shift.checkOut) return shift;

    const updates = {};
    const status = shift.status || "active";

    if (schedule.hasLunchBreak) {
        if (status === "active" && isInLunchWindow(now, date, schedule)) {
            updates.status = "lunch_break";
            updates.lunchStartedAt = shift.lunchStartedAt || now;
        } else if (status === "lunch_break" && isAfterLunch(now, date, schedule)) {
            updates.status = "active";
            updates.lunchEndedAt = shift.lunchEndedAt || now;
        }
    }

    if (Object.keys(updates).length === 0) return shift;

    return prisma.shift.update({
        where: { id: shift.id },
        data: updates,
    });
}

async function runAttendanceScheduleCron(prisma, now = new Date()) {
    const date = todayCO();
    const users = await prisma.user.findMany({
        where: { role: { in: ["employee", "admin"] } },
    });

    const stats = {
        date,
        checkIns: 0,
        checkOuts: 0,
        lateCheckouts: 0,
        lunchUpdates: 0,
    };

    for (const user of users) {
        const schedule = getScheduleForUser(user, date);
        if (!schedule) continue;

        let shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date } },
        });

        if (!shift) {
            const created = await ensureAutoAttendanceCheckIn(prisma, user, schedule, date, now);
            if (created) {
                stats.checkIns++;
                shift = created;
            } else {
                continue;
            }
        }

        if (shift.checkOut) continue;

        const previousStatus = shift.status;
        const synced = await syncUserShiftSchedule(prisma, user.id, now);
        if (!synced) continue;

        if (!shift.checkOut && synced.checkOut) {
            stats.checkOuts++;
            if (synced.isLateCheckout) stats.lateCheckouts++;
        }

        if (previousStatus !== synced.status && (previousStatus === "lunch_break" || synced.status === "lunch_break")) {
            stats.lunchUpdates++;
        }
    }

    return stats;
}

async function main() {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
        const stats = await runAttendanceScheduleCron(prisma);
        console.log(
            `[Attendance cron] ${stats.date}: +${stats.checkIns} in, +${stats.checkOuts} out (${stats.lateCheckouts} cierre tardío, ${stats.lunchUpdates} almuerzo)`
        );
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
