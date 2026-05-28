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
        
        // Check cache first for GET requests
        const cacheKey = getCacheKey(user.id, "GET", today);
        const cachedShift = getCachedResult(cacheKey);
        if (cachedShift) {
            return NextResponse.json({ shift: cachedShift, today, role: user.role, fromCache: true });
        }

        const shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        // Cache the result
        if (shift) {
            setCachedResult(cacheKey, shift);
        }

        return NextResponse.json({ shift, today, role: user.role });
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

            // -------------------------------------------------
            // Guard: ensure a shift for today does not already exist.
            // The Prisma schema defines a unique composite index
            // (`@@unique([userId, date])`), which creates the helper
            // field `userId_date` for `findUnique`.
            // -------------------------------------------------
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
