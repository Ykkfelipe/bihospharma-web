import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
    safeCheckIn,
    todayCO,
    getCacheKey,
    getCachedResult,
    setCachedResult,
    invalidateAttendanceCache,
    formatErrorResponse,
} from "@/lib/attendance-utils";

export const dynamic = "force-dynamic";

// GET — Return today's shift for the authenticated user (with caching)
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const today = todayCO();
        const cacheKey = getCacheKey(user.id, "GET", today);

        const { syncUserShiftSchedule } = await import("@/lib/shift-schedule-sync");
        const { getScheduleForUser, formatScheduleLabel, getNextShiftInfo } =
            await import("@/lib/work-schedule");

        const schedule = getScheduleForUser(user, today);
        const dayOff = schedule === null;

        // Sync before read/cache so lunch_break resumes to active after 14:00
        if (!dayOff) {
            await syncUserShiftSchedule(user.id);
        }

        const shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        const scheduleLabel = schedule ? formatScheduleLabel(schedule) : null;
        const nextShift = getNextShiftInfo(user, today, Boolean(shift));

        if (shift) {
            setCachedResult(cacheKey, shift);
        }

        return NextResponse.json({
            shift,
            today,
            role: user.role,
            scheduleLabel,
            nextShift,
            dayOff,
            autoAttendance: user.autoAttendance,
            status: shift?.status ?? null,
        });
    } catch (err) {
        console.error("[GET /api/attendance] Error:", err);
        return formatErrorResponse(err);
    }
}

// POST — Auto check-in with retry logic and deduplication
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const today = todayCO();
        const cacheKey = getCacheKey(user.id, "POST", today);
        const cached = getCachedResult<{ shift: unknown; alreadyCheckedIn: boolean }>(cacheKey);
        if (cached) {
            return NextResponse.json(cached, { headers: { "X-Deduped": "true" } });
        }

        const { getScheduleForUser, isAtOrPastScheduledEnd } = await import("@/lib/work-schedule");
        const schedule = getScheduleForUser(user, today);
        if (!schedule) {
            return NextResponse.json(
                { error: "Hoy no hay jornada laboral.", dayOff: true },
                { status: 400 }
            );
        }
        if (isAtOrPastScheduledEnd(new Date(), today, schedule)) {
            return NextResponse.json(
                {
                    error: "La jornada de hoy ya terminó. Si necesita registrar una novedad, contacte al administrador.",
                },
                { status: 400 }
            );
        }

        const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
        const userAgent = req.headers.get("user-agent") || null;

        const result = await safeCheckIn(user.id, today, ipAddress, userAgent);

        invalidateAttendanceCache(user.id, today);
        setCachedResult(cacheKey, result);

        const status = result.alreadyCheckedIn ? 200 : 201;
        return NextResponse.json(result, { status });
    } catch (err) {
        console.error("[POST /api/attendance] Error:", err);
        return formatErrorResponse(err, 500);
    }
}
