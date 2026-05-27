import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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

        if (user.role === "admin") {
            const shifts = await prisma.shift.findMany({
                orderBy: [{ date: "desc" }, { checkIn: "desc" }],
                include: { user: { select: { id: true, name: true, email: true } } },
            });
            return NextResponse.json(shifts);
        } else {
            const shifts = await prisma.shift.findMany({
                where: { userId: user.id },
                orderBy: { date: "desc" },
            });
            return NextResponse.json(shifts);
        }
    } catch (err) {
        console.error("[GET /api/attendance/history] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}
