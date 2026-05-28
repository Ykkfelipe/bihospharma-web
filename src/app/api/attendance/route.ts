import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
    safeCheckIn,
    todayCO,
    getCacheKey,
    getCachedResult,
    setCachedResult,
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

        // Deduplication: check if this request was just processed
        const cacheKey = getCacheKey(user.id, "POST_CHECKIN", today);
        const cachedResult = getCachedResult(cacheKey);
        if (cachedResult) {
            console.log(`[POST /api/attendance] Duplicate request prevented for ${user.email}`);
            return NextResponse.json(cachedResult, { status: 201, headers: { "X-Deduped": "true" } });
        }

        const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
        const userAgent = req.headers.get("user-agent") || null;

        // Use safe check-in with built-in retry logic
        const result = await safeCheckIn(user.id, today, ipAddress, userAgent);

        // Cache successful result
        setCachedResult(cacheKey, result);

        return NextResponse.json(result, { status: 201 });
    } catch (err) {
        console.error("[POST /api/attendance] Error:", err);
        return formatErrorResponse(err, 500);
    }
}
