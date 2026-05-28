import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
    safeCheckOut,
    todayCO,
    getCacheKey,
    getCachedResult,
    setCachedResult,
    invalidateAttendanceCache,
    formatErrorResponse,
} from "@/lib/attendance-utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const { prisma } = await import("@/lib/prisma");
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const today = todayCO();

        // Deduplication: prevent double check-out
        const cacheKey = getCacheKey(user.id, "POST_CHECKOUT", today);
        const cachedResult = getCachedResult(cacheKey);
        if (cachedResult) {
            console.log(`[POST /api/attendance/check-out] Duplicate request prevented for ${user.email}`);
            return NextResponse.json(cachedResult, { headers: { "X-Deduped": "true" } });
        }

        const checkoutIpAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
        const checkoutUserAgent = req.headers.get("user-agent") || null;

        // Use safe check-out with built-in retry logic
        const shift = await safeCheckOut(user.id, today, checkoutIpAddress, checkoutUserAgent);

        invalidateAttendanceCache(user.id, today);
        setCachedResult(cacheKey, shift);

        return NextResponse.json({ shift, success: true });
    } catch (err) {
        console.error("[POST /api/attendance/check-out] Error:", err);
        return formatErrorResponse(err, 500);
    }
}
