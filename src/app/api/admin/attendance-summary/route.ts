import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { todayCO } from "@/lib/attendance-utils";
import { syncUserShiftSchedule } from "@/lib/shift-schedule-sync";
import {
    computeShiftDurations,
    formatDurationMinutes,
    formatEmployeeScheduleProfile,
    formatScheduleLabel,
    getNowInBogota,
    getScheduleForUser,
    isPastScheduledStart,
    type ScheduleUser,
} from "@/lib/work-schedule";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== "admin") {
        return NextResponse.json({ error: "Acceso denegado." }, { status: 403 });
    }

    const url = new URL(req.url);
    const date = url.searchParams.get("date") || todayCO();

    const staff = await prisma.user.findMany({
        where: { role: { in: ["employee", "admin"] } },
        select: {
            id: true,
            name: true,
            email: true,
            workStart: true,
            morningEnd: true,
            lunchStart: true,
            lunchEnd: true,
            workEnd: true,
            satWorkStart: true,
            satWorkEnd: true,
        },
        orderBy: { name: "asc" },
    });

    let shifts = await prisma.shift.findMany({
        where: { date },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    workStart: true,
                    morningEnd: true,
                    lunchStart: true,
                    lunchEnd: true,
                    workEnd: true,
                    satWorkStart: true,
                    satWorkEnd: true,
                },
            },
        },
    });

    if (date === todayCO()) {
        for (const shift of shifts) {
            if (!shift.checkOut) {
                await syncUserShiftSchedule(shift.userId);
            }
        }
        shifts = await prisma.shift.findMany({
            where: { date },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        workStart: true,
                        morningEnd: true,
                        lunchStart: true,
                        lunchEnd: true,
                        workEnd: true,
                        satWorkStart: true,
                        satWorkEnd: true,
                    },
                },
            },
        });
    }

    const [recentLogins] = await Promise.all([
        prisma.loginLog.findMany({
            where: {
                success: true,
                createdAt: { gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
            },
            orderBy: { createdAt: "desc" },
            take: 500,
        }),
    ]);

    const shiftByUser = new Map(shifts.map((s) => [s.userId, s]));

    const loginDateCO = (d: Date) =>
        d.toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loginsOnDate = recentLogins.filter((l) => loginDateCO(l.createdAt) === date);

    const nowCO = getNowInBogota();
    const isToday = date === todayCO();

    const roster = staff.map((emp) => {
        const shift = shiftByUser.get(emp.id);
        const schedule = getScheduleForUser(emp as ScheduleUser, date);
        const scheduleToday = schedule ? formatScheduleLabel(schedule) : null;
        const scheduleProfile = formatEmployeeScheduleProfile(emp as ScheduleUser);

        let status: "sin_entrada" | "tarde_sin_entrada" | "en_turno" | "turno_cerrado" | "dia_libre" =
            "sin_entrada";

        if (!schedule) {
            status = "dia_libre";
        } else if (!shift) {
            if (isToday && isPastScheduledStart(nowCO, date, schedule)) {
                status = "tarde_sin_entrada";
            } else {
                status = "sin_entrada";
            }
        } else if (shift.checkOut) {
            status = "turno_cerrado";
        } else {
            status = "en_turno";
        }

        const lastLogin = loginsOnDate.find((l) => l.email === emp.email);
        return {
            user: emp,
            status,
            scheduleToday,
            scheduleProfile,
            expectedStart: schedule?.workStart ?? null,
            expectedEnd: schedule?.workEnd ?? null,
            shift: shift
                ? (() => {
                      const schedule = getScheduleForUser(shift.user as ScheduleUser, date);
                      const durations = computeShiftDurations(shift, schedule);
                      return {
                          id: shift.id,
                          checkIn: shift.checkIn,
                          checkOut: shift.checkOut,
                          isLate: shift.isLate,
                          lateReason: shift.lateReason,
                          lateReasonAt: shift.lateReasonAt,
                          isEarly: shift.isEarly,
                          earlyReason: shift.earlyReason,
                          earlyReasonAt: shift.earlyReasonAt,
                          status: shift.status,
                          workHours: formatDurationMinutes(durations.workMinutes),
                          breakHours: formatDurationMinutes(durations.breakMinutes),
                          totalHours: formatDurationMinutes(durations.totalMinutes),
                          workMinutes: durations.workMinutes,
                          breakMinutes: durations.breakMinutes,
                          totalMinutes: durations.totalMinutes,
                      };
                  })()
                : null,
            lastPortalLogin: lastLogin?.createdAt ?? null,
        };
    });

    const summary = {
        date,
        totalEmployees: staff.length,
        sinEntrada: roster.filter((r) => r.status === "sin_entrada").length,
        tardeSinEntrada: roster.filter((r) => r.status === "tarde_sin_entrada").length,
        enTurno: roster.filter((r) => r.status === "en_turno").length,
        turnoCerrado: roster.filter((r) => r.status === "turno_cerrado").length,
        tarde:
            shifts.filter((s) => s.isLate).length +
            roster.filter((r) => r.status === "tarde_sin_entrada").length,
        salidaAnticipada: shifts.filter((s) => s.isEarly).length,
        diaLibre: roster.filter((r) => r.status === "dia_libre").length,
    };

    const shiftsWithDurations = shifts.map((shift) => {
        const schedule = getScheduleForUser(shift.user as ScheduleUser, date);
        const durations = computeShiftDurations(shift, schedule);
        return {
            ...shift,
            workHours: formatDurationMinutes(durations.workMinutes),
            breakHours: formatDurationMinutes(durations.breakMinutes),
            totalHours: formatDurationMinutes(durations.totalMinutes),
            workMinutes: durations.workMinutes,
            breakMinutes: durations.breakMinutes,
            totalMinutes: durations.totalMinutes,
        };
    });

    return NextResponse.json({ summary, roster, shifts: shiftsWithDurations });
}
