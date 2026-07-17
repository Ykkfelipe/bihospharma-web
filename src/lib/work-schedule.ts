/** Colombia (Bogota) work schedule helpers */

export type RestBreakConfig = {
    label: string;
    windowStart: string;
    windowEnd: string;
    durationMinutes: number;
};

export type DaySchedule = {
    workStart: string;
    morningEnd: string;
    lunchStart: string;
    lunchEnd: string;
    workEnd: string;
    hasLunchBreak: boolean;
    restBreaks?: RestBreakConfig[];
    /** Minutos de descanso corto a descontar del trabajo (auto-asistencia). */
    scheduledRestMinutes?: number;
};

export type ScheduleUser = {
    workStart: string;
    morningEnd: string;
    lunchStart: string;
    lunchEnd: string;
    workEnd: string;
    friWorkEnd?: string | null;
    satWorkStart: string | null;
    satWorkEnd: string | null;
    morningBreakStart?: string | null;
    morningBreakEnd?: string | null;
    afternoonBreakStart?: string | null;
    afternoonBreakEnd?: string | null;
    restBreakMinutes?: number | null;
};

export type ProfileScheduleBlock = {
    label: string;
    time: string;
    kind?: "break";
};

export const STANDARD_SCHEDULE = {
    workStart: "08:00",
    morningEnd: "13:00",
    lunchStart: "13:00",
    lunchEnd: "14:00",
    workEnd: "17:30",
    friWorkEnd: "17:00",
} as const;

/** Servicios Generales Bogotá — María Angélica Arenas Gómez */
export const MARIA_ANGELICA_EMAIL = "mariaangelicaar02@gmail.com";

export const MARIA_ANGELICA_SCHEDULE = {
    workStart: "08:00",
    morningEnd: "13:00",
    lunchStart: "13:00",
    lunchEnd: "14:00",
    workEnd: "16:30",
    friWorkEnd: "16:30",
    satWorkStart: "08:00",
    satWorkEnd: "12:30",
    morningBreakStart: "10:00",
    morningBreakEnd: "11:00",
    afternoonBreakStart: "16:00",
    afternoonBreakEnd: "16:30",
    restBreakMinutes: 15,
} as const;

export function getRestBreaks(user: ScheduleUser): RestBreakConfig[] {
    const durationMinutes = user.restBreakMinutes ?? 15;
    const breaks: RestBreakConfig[] = [];

    if (user.morningBreakStart && user.morningBreakEnd) {
        breaks.push({
            label: "Descanso (mañana)",
            windowStart: user.morningBreakStart,
            windowEnd: user.morningBreakEnd,
            durationMinutes,
        });
    }
    if (user.afternoonBreakStart && user.afternoonBreakEnd) {
        breaks.push({
            label: "Descanso (tarde)",
            windowStart: user.afternoonBreakStart,
            windowEnd: user.afternoonBreakEnd,
            durationMinutes,
        });
    }

    return breaks;
}

export function formatRestBreakTime(breakConfig: RestBreakConfig): string {
    return `${breakConfig.durationMinutes} min (entre ${breakConfig.windowStart} – ${breakConfig.windowEnd})`;
}

function attachRestBreaks(user: ScheduleUser, schedule: DaySchedule): DaySchedule {
    const restBreaks = getRestBreaks(user);
    if (restBreaks.length === 0) return schedule;

    const scheduledRestMinutes = restBreaks.reduce((sum, b) => sum + b.durationMinutes, 0);
    return { ...schedule, restBreaks, scheduledRestMinutes };
}

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

    const workEnd = day === 5 ? (user.friWorkEnd ?? user.workEnd) : user.workEnd;

    return attachRestBreaks(user, {
        workStart: user.workStart,
        morningEnd: user.morningEnd,
        lunchStart: user.lunchStart,
        lunchEnd: user.lunchEnd,
        workEnd,
        hasLunchBreak: true,
    });
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
    const rest =
        schedule.restBreaks?.map((b) => `${b.label.replace("Descanso ", "")} ${formatRestBreakTime(b)}`).join(" · ") ??
        "";
    const base = `Mañana ${schedule.workStart}–${schedule.morningEnd} · Almuerzo ${schedule.lunchStart}–${schedule.lunchEnd} · Tarde ${schedule.lunchEnd}–${schedule.workEnd}`;
    return rest ? `${base} · ${rest}` : base;
}

/** Horario completo del empleado (para panel admin). */
export function formatEmployeeScheduleProfile(user: ScheduleUser): string {
    const friEnd = user.friWorkEnd ?? user.workEnd;
    const weekdayBlock = `Mañana ${user.workStart}–${user.morningEnd} · Almuerzo ${user.lunchStart}–${user.lunchEnd}`;
    const restBreaks = getRestBreaks(user)
        .map((b) => `${b.label} ${formatRestBreakTime(b)}`)
        .join(" · ");
    const restSuffix = restBreaks ? ` · ${restBreaks}` : "";
    const base =
        friEnd === user.workEnd
            ? `L-V · ${weekdayBlock} · Tarde ${user.lunchEnd}–${user.workEnd}${restSuffix}`
            : `L-J · ${weekdayBlock} · Tarde ${user.lunchEnd}–${user.workEnd} · V · ${weekdayBlock} · Tarde ${user.lunchEnd}–${friEnd}${restSuffix}`;
    if (user.satWorkStart && user.satWorkEnd) {
        return `${base} · Sáb: ${user.satWorkStart}–${user.satWorkEnd}`;
    }
    return base;
}

export function buildProfileScheduleBlocks(user: ScheduleUser): {
    weekdays: ProfileScheduleBlock[];
    saturday: ProfileScheduleBlock | null;
} {
    const friEnd = user.friWorkEnd ?? user.workEnd;
    const restBreaks = getRestBreaks(user);
    const morningRest = restBreaks.find((b) => b.label.includes("mañana"));
    const afternoonRest = restBreaks.find((b) => b.label.includes("tarde"));

    const weekdays: ProfileScheduleBlock[] = [
        { label: "Mañana", time: `${user.workStart} – ${user.morningEnd}` },
    ];

    if (morningRest) {
        weekdays.push({
            label: morningRest.label,
            time: formatRestBreakTime(morningRest),
            kind: "break",
        });
    }

    weekdays.push({
        label: "Almuerzo",
        time: `${user.lunchStart} – ${user.lunchEnd}`,
        kind: "break",
    });

    if (friEnd === user.workEnd) {
        weekdays.push({ label: "Tarde (L–V)", time: `${user.lunchEnd} – ${user.workEnd}` });
    } else {
        weekdays.push({ label: "Tarde (L–J)", time: `${user.lunchEnd} – ${user.workEnd}` });
        weekdays.push({ label: "Tarde (V)", time: `${user.lunchEnd} – ${friEnd}` });
    }

    if (afternoonRest) {
        weekdays.push({
            label: afternoonRest.label,
            time: formatRestBreakTime(afternoonRest),
            kind: "break",
        });
    }

    return {
        weekdays,
        saturday:
            user.satWorkStart && user.satWorkEnd
                ? { label: "Sábado", time: `${user.satWorkStart} – ${user.satWorkEnd}` }
                : null,
    };
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

    if (schedule?.scheduledRestMinutes && schedule.scheduledRestMinutes > 0) {
        breakMinutes += schedule.scheduledRestMinutes;
        return {
            workMinutes: Math.max(0, workMinutes - schedule.scheduledRestMinutes),
            breakMinutes,
            totalMinutes: spanMinutes,
        };
    }

    return {
        workMinutes,
        breakMinutes,
        totalMinutes: spanMinutes,
    };
}
