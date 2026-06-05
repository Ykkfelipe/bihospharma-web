import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { todayCO } from "@/lib/attendance-utils";
import {
    formatEmployeeScheduleProfile,
    formatScheduleLabel,
    getScheduleForUser,
} from "@/lib/work-schedule";

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            area: true,
            workStart: true,
            morningEnd: true,
            lunchStart: true,
            lunchEnd: true,
            workEnd: true,
            satWorkStart: true,
            satWorkEnd: true,
            createdAt: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
    }

    const today = todayCO();
    const scheduleToday = getScheduleForUser(user, today);
    const scheduleTodayLabel = scheduleToday ? formatScheduleLabel(scheduleToday) : null;
    const scheduleLabel = formatEmployeeScheduleProfile(user);

    return NextResponse.json({
        ...user,
        scheduleLabel,
        scheduleTodayLabel,
        scheduleBlocks: {
            weekdays: [
                { label: "Mañana", time: `${user.workStart} – ${user.morningEnd}` },
                { label: "Almuerzo", time: `${user.lunchStart} – ${user.lunchEnd}`, kind: "break" as const },
                { label: "Tarde", time: `${user.lunchEnd} – ${user.workEnd}` },
            ],
            saturday:
                user.satWorkStart && user.satWorkEnd
                    ? { label: "Sábado", time: `${user.satWorkStart} – ${user.satWorkEnd}` }
                    : null,
        },
        roleLabel: user.role === "admin" ? "Administrador" : "Colaborador",
    });
}
