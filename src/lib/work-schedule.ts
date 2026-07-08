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

export function isEarlyCheckOut(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    const end = parseTimeOnDate(dateStr, schedule.workEnd);
    return now.getTime() < end.getTime() - 60_000; // before scheduled end (1 min grace)
}

/** Minutes after scheduled end before the system auto-closes an open shift (olvido de cierre). */
export const LATE_CHECKOUT_GRACE_MINUTES = 15;

export function getLateCheckoutGraceMs(): number {
    return LATE_CHECKOUT_GRACE_MINUTES * 60_000;
}

export function isPastLateCheckoutGrace(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    const workEnd = parseTimeOnDate(dateStr, schedule.workEnd);
    return now.getTime() >= workEnd.getTime() + getLateCheckoutGraceMs();
}

export function isAtOrPastScheduledEnd(now: Date, dateStr: string, schedule: DaySchedule): boolean {
    return now.getTime() >= parseTimeOnDate(dateStr, schedule.workEnd).getTime();
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

export type NextShiftDisplay = {
    /** "Hoy" o fecha del próximo turno, ej. "miércoles, 17 de junio" */
    dayLabel: string;
    /** Horario completo del turno */
    schedule: string;
};

function addDaysToDateStr(dateStr: string, days: number): string {
    const d = new Date(`${dateStr}T12:00:00-05:00`);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

function findScheduledDayFrom(
    user: ScheduleUser,
    startDateStr: string,
    maxDays = 14
): { dateStr: string; schedule: DaySchedule } | null {
    for (let i = 0; i < maxDays; i++) {
        const dateStr = addDaysToDateStr(startDateStr, i);
        const schedule = getScheduleForUser(user, dateStr);
        if (schedule) return { dateStr, schedule };
    }
    return null;
}

function formatShiftDayLabel(dateStr: string, isToday: boolean): string {
    if (isToday) return "Hoy";
    const label = new Date(`${dateStr}T12:00:00-05:00`).toLocaleDateString("es-CO", {
        timeZone: "America/Bogota",
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Próximo turno laboral con horario completo.
 * Si aún no hay entrada hoy → turno de hoy. Si ya hay entrada → siguiente día laboral.
 */
export function getNextShiftInfo(
    user: ScheduleUser,
    todayStr: string,
    hasShiftToday: boolean
): NextShiftDisplay | null {
    const todaySchedule = getScheduleForUser(user, todayStr);

    if (!hasShiftToday && todaySchedule) {
        return {
            dayLabel: "Hoy",
            schedule: formatScheduleLabel(todaySchedule),
        };
    }

    const next = findScheduledDayFrom(user, addDaysToDateStr(todayStr, 1));
    if (!next) return null;

    return {
        dayLabel: formatShiftDayLabel(next.dateStr, false),
        schedule: formatScheduleLabel(next.schedule),
    };
}

export function formatScheduleLabel(schedule: DaySchedule): string {
    if (!schedule.hasLunchBreak) {
        return `Sábado · ${schedule.workStart} – ${schedule.workEnd}`;
    }
    return `Mañana ${schedule.workStart}–${schedule.morningEnd} · Almuerzo ${schedule.lunchStart}–${schedule.lunchEnd} · Tarde ${schedule.lunchEnd}–${schedule.workEnd}`;
}

/** Horario completo del empleado (para panel admin). */
export function formatEmployeeScheduleProfile(user: ScheduleUser): string {
    const base = `L-V · Mañana ${user.workStart}–${user.morningEnd} · Almuerzo ${user.lunchStart}–${user.lunchEnd} · Tarde ${user.lunchEnd}–${user.workEnd}`;
    if (user.satWorkStart && user.satWorkEnd) {
        return `${base} · Sáb: ${user.satWorkStart}–${user.satWorkEnd}`;
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

/**
 * Work = tiempo real entre entrada y salida, sin almuerzo.
 * Almuerzo = solo el tramo de pausa registrado (lunchStartedAt / lunch_break), acotado al turno.
 * Total = trabajo + almuerzo (tiempo en portal ese día).
 */
export function computeShiftDurations(
    shift: ShiftForDuration,
    schedule: DaySchedule | null,
    now: Date = new Date()
): ShiftDurations {
    const checkIn = new Date(shift.checkIn);
    const endTime = shift.checkOut ? new Date(shift.checkOut) : now;

    if (endTime.getTime() <= checkIn.getTime()) {
        return { workMinutes: 0, breakMinutes: 0, totalMinutes: 0 };
    }

    const spanMinutes = Math.max(
        0,
        Math.round((endTime.getTime() - checkIn.getTime()) / 60_000)
    );

    if (!schedule?.hasLunchBreak) {
        return { workMinutes: spanMinutes, breakMinutes: 0, totalMinutes: spanMinutes };
    }

    let lunchStart: Date | null = null;
    let lunchEnd: Date | null = null;

    if (shift.lunchStartedAt) {
        lunchStart = new Date(shift.lunchStartedAt);
        if (shift.lunchEndedAt) {
            lunchEnd = new Date(shift.lunchEndedAt);
        } else if (shift.status === "lunch_break") {
            lunchEnd = endTime;
        }
    } else if (shift.status === "lunch_break") {
        lunchStart = parseTimeOnDate(shift.date, schedule.lunchStart);
        lunchEnd = endTime;
    }

    let breakMinutes = 0;
    if (lunchStart && lunchEnd) {
        const overlapStart = Math.max(checkIn.getTime(), lunchStart.getTime());
        const overlapEnd = Math.min(endTime.getTime(), lunchEnd.getTime());
        if (overlapEnd > overlapStart) {
            breakMinutes = Math.max(0, Math.round((overlapEnd - overlapStart) / 60_000));
        }
    }

    const workMinutes = Math.max(0, spanMinutes - breakMinutes);
    return {
        workMinutes,
        breakMinutes,
        totalMinutes: spanMinutes,
    };
}
