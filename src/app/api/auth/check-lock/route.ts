import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ locked: false });
        }

        // BRUTE-FORCE PROTECTION: Check for failed attempts in the last 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const failedAttempts = await prisma.loginLog.count({
            where: {
                email,
                success: false,
                createdAt: { gte: thirtyMinutesAgo },
            },
        });

        if (failedAttempts >= 5) {
            return NextResponse.json({
                locked: true,
                message: "Su cuenta ha sido bloqueada temporalmente debido a demasiados intentos fallidos. Intente de nuevo en 30 minutos."
            });
        }

        return NextResponse.json({ locked: false });
    } catch (err) {
        console.error("[check-lock] Error:", err);
        return NextResponse.json({ locked: false });
    }
}
