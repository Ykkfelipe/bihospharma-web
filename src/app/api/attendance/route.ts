import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Get today's date as YYYY-MM-DD in Colombia timezone */
function todayCO(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

// GET — Return today's shift for the authenticated user
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
        const shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        return NextResponse.json({ shift, today, role: user.role });
    } catch (err) {
        console.error("[GET /api/attendance] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}

// POST — Auto check-in (creates today's shift if none exists)
// For employees: called automatically on portal load
// For admins: called manually via "Registrar Entrada" button
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

        // Check if already checked in today
        const existing = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        if (existing) {
            return NextResponse.json({ shift: existing, alreadyCheckedIn: true });
        }

        // Check if late (Threshold: 8:00 AM Colombia time)
        const nowCO = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
        const isLate = nowCO.getHours() > 8 || (nowCO.getHours() === 8 && nowCO.getMinutes() > 0);

        const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
        const userAgent = req.headers.get("user-agent") || null;

        // Create new shift
        const shift = await prisma.shift.create({
            data: {
                userId: user.id,
                date: today,
                checkIn: new Date(),
                ipAddress,
                userAgent,
                isLate,
            },
        });

        return NextResponse.json({ shift, alreadyCheckedIn: false }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/attendance] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}
