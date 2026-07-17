import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { todayCO } from "@/lib/attendance-utils";
import {
    buildProfileScheduleBlocks,
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
            friWorkEnd: true,
            satWorkStart: true,
            satWorkEnd: true,
            morningBreakStart: true,
            morningBreakEnd: true,
            afternoonBreakStart: true,
            afternoonBreakEnd: true,
            restBreakMinutes: true,
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
        scheduleBlocks: buildProfileScheduleBlocks(user),
        roleLabel: user.role === "admin" ? "Administrador" : "Colaborador",
    });
}
