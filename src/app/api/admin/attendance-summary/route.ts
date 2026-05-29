import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { todayCO } from "@/lib/attendance-utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== "admin") {
        return NextResponse.json({ error: "Acceso denegado." }, { status: 403 });
    }

    const url = new URL(req.url);
    const date = url.searchParams.get("date") || todayCO();

    const [employees, shifts, recentLogins] = await Promise.all([
        prisma.user.findMany({
            where: { role: "employee" },
            select: { id: true, name: true, email: true },
            orderBy: { name: "asc" },
        }),
        prisma.shift.findMany({
            where: { date },
            include: { user: { select: { id: true, name: true, email: true } } },
        }),
        prisma.loginLog.findMany({
            where: {
                success: true,
                createdAt: { gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
            },
            orderBy: { createdAt: "desc" },
            take: 500,
        }),
    ]);

    const shiftByUser = new Map(shifts.map((s) => [s.userId, s]));

    const loginDateCO = (d: Date) =>
        d.toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loginsOnDate = recentLogins.filter((l) => loginDateCO(l.createdAt) === date);

    const roster = employees.map((emp) => {
        const shift = shiftByUser.get(emp.id);
        let status: "sin_entrada" | "en_turno" | "turno_cerrado" = "sin_entrada";
        if (shift) {
            status = shift.checkOut ? "turno_cerrado" : "en_turno";
        }
        const lastLogin = loginsOnDate.find((l) => l.email === emp.email);
        return {
            user: emp,
            status,
            shift: shift
                ? {
                      id: shift.id,
                      checkIn: shift.checkIn,
                      checkOut: shift.checkOut,
                      isLate: shift.isLate,
                  }
                : null,
            lastPortalLogin: lastLogin?.createdAt ?? null,
        };
    });

    const summary = {
        date,
        totalEmployees: employees.length,
        sinEntrada: roster.filter((r) => r.status === "sin_entrada").length,
        enTurno: roster.filter((r) => r.status === "en_turno").length,
        turnoCerrado: roster.filter((r) => r.status === "turno_cerrado").length,
        tarde: shifts.filter((s) => s.isLate).length,
    };

    return NextResponse.json({ summary, roster, shifts });
}
