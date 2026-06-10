import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
    todayCO,
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

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const { reason } = await req.json();
        const text = typeof reason === "string" ? reason.trim() : "";
        if (text.length < 5) {
            return NextResponse.json(
                { error: "Escribe al menos 5 caracteres explicando el motivo." },
                { status: 400 }
            );
        }
        if (text.length > 500) {
            return NextResponse.json(
                { error: "La explicación no puede superar 500 caracteres." },
                { status: 400 }
            );
        }

        const today = todayCO();
        const shift = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: today } },
        });

        if (!shift) {
            return NextResponse.json({ error: "No hay turno registrado hoy." }, { status: 400 });
        }
        if (!shift.checkOut) {
            return NextResponse.json({ error: "Aún no has registrado tu salida hoy." }, { status: 400 });
        }
        if (!shift.isEarly) {
            return NextResponse.json(
                { error: "Tu salida de hoy no está marcada como anticipada." },
                { status: 400 }
            );
        }

        const updated = await prisma.shift.update({
            where: { id: shift.id },
            data: { earlyReason: text, earlyReasonAt: new Date() },
        });

        invalidateAttendanceCache(user.id, today);

        return NextResponse.json({ shift: updated, message: "Motivo registrado. Gracias." });
    } catch (err) {
        console.error("[POST /api/attendance/early-reason] Error:", err);
        return formatErrorResponse(err, 500);
    }
}
