import { prisma } from "@/lib/prisma";
import { invalidateAttendanceCache, todayCO } from "@/lib/attendance-utils";
import {
    getScheduleForUser,
    isAfterLunch,
    isAtOrPastScheduledEnd,
    isInLunchWindow,
    isLateCheckIn,
    isPastLateCheckoutGrace,
    parseTimeOnDate,
    type DaySchedule,
    type ScheduleUser,
} from "@/lib/work-schedule";

type ShiftRow = Awaited<ReturnType<typeof prisma.shift.findUnique>> & object;

async function autoCloseShiftAtScheduledEnd(
    shiftId: string,
    userId: string,
    date: string,
    workEnd: Date,
    opts: { autoCheckout: boolean; isLateCheckout: boolean }
) {
    const shift = await prisma.shift.update({
        where: { id: shiftId },
        data: {
            checkOut: workEnd,
            status: "completed",
            isEarly: false,
            autoCheckout: opts.autoCheckout,
            isLateCheckout: opts.isLateCheckout,
        },
    });
    invalidateAttendanceCache(userId, date);
    return shift;
}

async function applyScheduledCheckout(
    shift: NonNullable<ShiftRow>,
    user: { id: string; autoAttendance: boolean },
    schedule: DaySchedule,
    date: string,
    now: Date
) {
    if (shift.checkOut) return shift;

    const workEnd = parseTimeOnDate(date, schedule.workEnd);

    if (user.autoAttendance && isAtOrPastScheduledEnd(now, date, schedule)) {
        return autoCloseShiftAtScheduledEnd(shift.id, user.id, date, workEnd, {
            autoCheckout: true,
            isLateCheckout: false,
        });
    }

    if (!user.autoAttendance && isPastLateCheckoutGrace(now, date, schedule)) {
        return autoCloseShiftAtScheduledEnd(shift.id, user.id, date, workEnd, {
            autoCheckout: true,
            isLateCheckout: true,
        });
    }

    return shift;
}

async function ensureAutoAttendanceCheckIn(
    user: { id: string; autoAttendance: boolean },
    schedule: DaySchedule,
    date: string,
    now: Date
) {
    if (!user.autoAttendance) return null;

    const existing = await prisma.shift.findUnique({
        where: { userId_date: { userId: user.id, date } },
    });
    if (existing) return existing;

    const workStart = parseTimeOnDate(date, schedule.workStart);
    const workEnd = parseTimeOnDate(date, schedule.workEnd);
    if (now.getTime() < workStart.getTime()) return null;
    if (now.getTime() >= workEnd.getTime()) return null;

    const shift = await prisma.shift.create({
        data: {
            userId: user.id,
            date,
            checkIn: workStart,
            isLate: false,
            autoCheckIn: true,
            status: "active",
        },
    });
    invalidateAttendanceCache(user.id, date);
    return shift;
}

export async function syncUserShiftSchedule(userId: string, now = new Date()) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const date = todayCO();
    const schedule = getScheduleForUser(user as ScheduleUser, date);
    if (!schedule) return null;

    let shift = await prisma.shift.findUnique({
        where: { userId_date: { userId, date } },
    });

    if (!shift) {
        shift = await ensureAutoAttendanceCheckIn(user, schedule, date, now);
        if (!shift) return null;
    }

    if (shift.checkOut) return { shift, schedule };

    shift = await applyScheduledCheckout(shift, user, schedule, date, now);
    if (shift.checkOut) return { shift, schedule };

    const status = shift.status || "active";
    const updates: {
        status?: string;
        lunchStartedAt?: Date;
        lunchEndedAt?: Date;
    } = {};

    if (schedule.hasLunchBreak) {
        if (status === "active" && isInLunchWindow(now, date, schedule)) {
            updates.status = "lunch_break";
            updates.lunchStartedAt = shift.lunchStartedAt ?? now;
        } else if (status === "lunch_break" && isAfterLunch(now, date, schedule)) {
            updates.status = "active";
            updates.lunchEndedAt = shift.lunchEndedAt ?? now;
        }
    }

    if (Object.keys(updates).length > 0) {
        shift = await prisma.shift.update({
            where: { id: shift.id },
            data: updates,
        });
        invalidateAttendanceCache(userId, date);
    }

    return { shift, schedule };
}

export async function scheduledCheckIn(
    userId: string,
    ipAddress: string | null,
    userAgent: string | null
) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const date = todayCO();
    const schedule = getScheduleForUser(user as ScheduleUser, date);
    if (!schedule) return { error: "Sin horario laboral hoy." };

    const existing = await prisma.shift.findUnique({
        where: { userId_date: { userId, date } },
    });
    if (existing) {
        await syncUserShiftSchedule(userId);
        return { shift: existing, alreadyCheckedIn: true, schedule };
    }

    const now = new Date();
    const scheduledStart = parseTimeOnDate(date, schedule.workStart);
    const scheduledEnd = parseTimeOnDate(date, schedule.workEnd);
    if (now.getTime() >= scheduledEnd.getTime()) {
        return { error: "La jornada de hoy ya terminó. Si necesita registrar una novedad, contacte al administrador." };
    }

    const checkIn =
        user.autoAttendance || now.getTime() < scheduledStart.getTime() ? scheduledStart : now;
    const isLate = user.autoAttendance ? false : isLateCheckIn(now, schedule);

    const shift = await prisma.shift.create({
        data: {
            userId,
            date,
            checkIn,
            ipAddress,
            userAgent,
            isLate,
            autoCheckIn: user.autoAttendance,
            status: "active",
        },
    });

    invalidateAttendanceCache(userId, date);
    await syncUserShiftSchedule(userId, now);

    return { shift, alreadyCheckedIn: false, schedule };
}

/** Server cron: auto entrada/salida, almuerzo y cierre tardío por olvido. */
export async function runAttendanceScheduleCron(now = new Date()) {
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
        const schedule = getScheduleForUser(user as ScheduleUser, date);
        if (!schedule) continue;

        let shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date } },
        });

        if (!shift) {
            const created = await ensureAutoAttendanceCheckIn(user, schedule, date, now);
            if (created) {
                stats.checkIns++;
                shift = created;
            } else {
                continue;
            }
        }

        if (shift.checkOut) continue;

        const beforeCheckout = shift.checkOut;
        const synced = await syncUserShiftSchedule(user.id, now);
        const after = synced?.shift;
        if (!after) continue;

        if (!beforeCheckout && after.checkOut) {
            stats.checkOuts++;
            if (after.isLateCheckout) stats.lateCheckouts++;
        }
    }

    return stats;
}
