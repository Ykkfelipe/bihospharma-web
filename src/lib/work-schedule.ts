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
        return `${schedule.workStart} – ${schedule.workEnd}`;
    }
    return `${schedule.workStart}–${schedule.morningEnd} · almuerzo ${schedule.lunchStart}–${schedule.lunchEnd} · ${schedule.lunchEnd}–${schedule.workEnd}`;
}
