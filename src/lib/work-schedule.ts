/** Colombia (Bogota) work schedule helpers */

export type DaySchedule = {
    workStart: string;
    morningEnd: string;
    lunchStart: string;
    lunchEnd: string;
    workEnd: string;
    hasLunchBreak: boolean;
};

export type ScheduleUser = {
    workStart: string;
    morningEnd: string;
    lunchStart: string;
    lunchEnd: string;
    workEnd: string;
    satWorkStart: string | null;
    satWorkEnd: string | null;
};

export function parseTimeOnDate(dateStr: string, hhmm: string): Date {
    return new Date(`${dateStr}T${hhmm}:00-05:00`);
}

export function getWeekdayInBogota(dateStr: string): number {
    const d = new Date(`${dateStr}T12:00:00-05:00`);
    return d.getDay(); // 0 Sun, 6 Sat
}

export function getScheduleForUser(user: ScheduleUser, dateStr: string): DaySchedule | null {
    const day = getWeekdayInBogota(dateStr);

    if (day === 0) return null; // Domingo

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

    if (day === 6) return null; // Sábado sin horario asignado

    return {
        workStart: user.workStart,
        morningEnd: user.morningEnd,
        lunchStart: user.lunchStart,
        lunchEnd: user.lunchEnd,
        workEnd: user.workEnd,
        hasLunchBreak: true,
    };
}

export function isLateCheckIn(now: Date, schedule: DaySchedule): boolean {
    const start = parseTimeOnDate(
        now.toLocaleDateString("en-CA", { timeZone: "America/Bogota" }),
        schedule.workStart
    );
    return now.getTime() > start.getTime() + 60_000; // after 7:31
}

export function isInLunchWindow(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    if (!schedule.hasLunchBreak) return false;
    const lunchStart = parseTimeOnDate(dateStr, schedule.lunchStart);
    const lunchEnd = parseTimeOnDate(dateStr, schedule.lunchEnd);
    const t = now.getTime();
    return t >= lunchStart.getTime() && t < lunchEnd.getTime();
}

export function isAfterLunch(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    if (!schedule.hasLunchBreak) return false;
    return now.getTime() >= parseTimeOnDate(dateStr, schedule.lunchEnd).getTime();
}

export function formatScheduleLabel(schedule: DaySchedule): string {
    if (!schedule.hasLunchBreak) {
        return `Sáb: ${schedule.workStart} – ${schedule.workEnd}`;
    }
    return `Inicio ${schedule.workStart}–${schedule.morningEnd} · Almuerzo ${schedule.lunchStart}–${schedule.lunchEnd} · Tarde ${schedule.lunchEnd}–${schedule.workEnd}`;
}

/** Horario completo del empleado (para panel admin). */
export function formatEmployeeScheduleProfile(user: ScheduleUser): string {
    const base = `L-V: ${user.workStart}–${user.morningEnd} · Almuerzo ${user.lunchStart}–${user.lunchEnd} · ${user.lunchEnd}–${user.workEnd}`;
    if (user.satWorkStart && user.satWorkEnd) {
        return `${base} · Sábados: ${user.satWorkStart}–${user.satWorkEnd}`;
    }
    return base;
}

export function getNowInBogota(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
}

export function isPastScheduledStart(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    return now.getTime() >= parseTimeOnDate(dateStr, schedule.workStart).getTime();
}

export type ShiftForDuration = {
    date: string;
    checkIn: Date | string;
    checkOut: Date | string | null;
    status?: string | null;
    lunchStartedAt?: Date | string | null;
    lunchEndedAt?: Date | string | null;
};

export type ShiftDurations = {
    workMinutes: number;
    breakMinutes: number;
    totalMinutes: number;
};

export function formatDurationMinutes(minutes: number): string {
    if (minutes <= 0) return "0h 0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

/** Work = morning + afternoon blocks; break = lunch window (excluded from work). */
export function computeShiftDurations(
    shift: ShiftForDuration,
    schedule: DaySchedule | null,
    now: Date = new Date()
): ShiftDurations {
    const checkIn = new Date(shift.checkIn);
    const endTime = shift.checkOut ? new Date(shift.checkOut) : now;

    if (!schedule?.hasLunchBreak) {
        const workMinutes = Math.max(0, Math.round((endTime.getTime() - checkIn.getTime()) / 60_000));
        return { workMinutes, breakMinutes: 0, totalMinutes: workMinutes };
    }

    const schedLunchStart = parseTimeOnDate(shift.date, schedule.lunchStart);
    const schedLunchEnd = parseTimeOnDate(shift.date, schedule.lunchEnd);
    const schedMorningEnd = parseTimeOnDate(shift.date, schedule.morningEnd);

    if (endTime.getTime() <= checkIn.getTime()) {
        return { workMinutes: 0, breakMinutes: 0, totalMinutes: 0 };
    }

    if (endTime.getTime() <= schedLunchStart.getTime()) {
        const workMinutes = Math.max(0, Math.round((endTime.getTime() - checkIn.getTime()) / 60_000));
        return { workMinutes, breakMinutes: 0, totalMinutes: workMinutes };
    }

    const lunchStart = shift.lunchStartedAt
        ? new Date(shift.lunchStartedAt)
        : schedLunchStart;

    let lunchEnd: Date;
    if (shift.lunchEndedAt) {
        lunchEnd = new Date(shift.lunchEndedAt);
    } else if (shift.status === "lunch_break") {
        lunchEnd = endTime;
    } else if (endTime.getTime() >= schedLunchEnd.getTime()) {
        lunchEnd = schedLunchEnd;
    } else {
        lunchEnd = endTime;
    }

    const morningStop = Math.min(
        schedMorningEnd.getTime(),
        lunchStart.getTime(),
        endTime.getTime()
    );
    const morningMinutes =
        morningStop > checkIn.getTime()
            ? Math.max(0, Math.round((morningStop - checkIn.getTime()) / 60_000))
            : 0;

    const breakEnd = Math.min(lunchEnd.getTime(), endTime.getTime());
    const breakMinutes =
        breakEnd > lunchStart.getTime()
            ? Math.max(0, Math.round((breakEnd - lunchStart.getTime()) / 60_000))
            : 0;

    const afternoonStart = Math.max(schedLunchEnd.getTime(), lunchEnd.getTime());
    const afternoonMinutes =
        endTime.getTime() > afternoonStart
            ? Math.max(0, Math.round((endTime.getTime() - afternoonStart) / 60_000))
            : 0;

    const workMinutes = morningMinutes + afternoonMinutes;
    return {
        workMinutes,
        breakMinutes,
        totalMinutes: workMinutes + breakMinutes,
    };
}
