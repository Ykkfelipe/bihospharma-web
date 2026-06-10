import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAttendanceHistory, formatErrorResponse } from "@/lib/attendance-utils";
import {
    computeShiftDurations,
    formatDurationMinutes,
    getScheduleForUser,
    type ScheduleUser,
} from "@/lib/work-schedule";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        // Parse pagination parameters from query string
        const url = new URL(req.url);
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 500); // Max 500
        const offset = parseInt(url.searchParams.get("offset") || "0");

        if (user.role === "admin") {
            const shifts = await prisma.shift.findMany({
                orderBy: [{ date: "desc" }, { checkIn: "desc" }],
                take: limit,
                skip: offset,
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

            const total = await prisma.shift.count();

            const data = shifts.map((shift) => {
                const schedule = getScheduleForUser(shift.user as ScheduleUser, shift.date);
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

            return NextResponse.json({
                data,
                pagination: { limit, offset, total },
            });
        } else {
            const shifts = await getAttendanceHistory(user.id, limit, offset);
            const total = await prisma.shift.count({ where: { userId: user.id } });

            const scheduleUser = user as ScheduleUser;
            const data = shifts.map((shift) => {
                const schedule = getScheduleForUser(scheduleUser, shift.date);
                const durations = computeShiftDurations(shift, schedule);
                return {
                    id: shift.id,
                    date: shift.date,
                    checkIn: shift.checkIn,
                    checkOut: shift.checkOut,
                    isLate: shift.isLate,
                    lateReason: shift.lateReason,
                    isEarly: shift.isEarly,
                    earlyReason: shift.earlyReason,
                    workHours: formatDurationMinutes(durations.workMinutes),
                    breakHours: formatDurationMinutes(durations.breakMinutes),
                    totalHours: formatDurationMinutes(durations.totalMinutes),
                };
            });

            return NextResponse.json({
                data,
                pagination: { limit, offset, total },
            });
        }
    } catch (err) {
        console.error("[GET /api/attendance/history] Error:", err);
        return formatErrorResponse(err);
    }
}
