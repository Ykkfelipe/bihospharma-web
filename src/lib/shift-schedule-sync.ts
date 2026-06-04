import { prisma } from "@/lib/prisma";
import { invalidateAttendanceCache, todayCO } from "@/lib/attendance-utils";
import {
    getScheduleForUser,
    isAfterLunch,
    isInLunchWindow,
    isLateCheckIn,
    type ScheduleUser,
} from "@/lib/work-schedule";

export async function syncUserShiftSchedule(userId: string, now = new Date()) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const date = todayCO();
    const schedule = getScheduleForUser(user as ScheduleUser, date);
    if (!schedule) return null;

    let shift = await prisma.shift.findUnique({
        where: { userId_date: { userId, date } },
    });

    if (!shift) return null;
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
    const isLate = isLateCheckIn(now, schedule);

    const shift = await prisma.shift.create({
        data: {
            userId,
            date,
            checkIn: now,
            ipAddress,
            userAgent,
            isLate,
            status: "active",
        },
    });

    invalidateAttendanceCache(userId, date);
    await syncUserShiftSchedule(userId, now);

    return { shift, alreadyCheckedIn: false, schedule };
}
