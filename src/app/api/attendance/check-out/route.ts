import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function todayCO(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

export async function POST() {
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
        const existing = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        if (!existing) {
            return NextResponse.json({ error: "No tienes una entrada registrada hoy." }, { status: 400 });
        }

        if (existing.checkOut) {
            return NextResponse.json({ error: "Ya registraste tu salida hoy." }, { status: 400 });
        }

        const shift = await prisma.shift.update({
            where: { id: existing.id },
            data: { checkOut: new Date() },
        });

        return NextResponse.json(shift);
    } catch (err) {
        console.error("[POST /api/attendance/check-out] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}
