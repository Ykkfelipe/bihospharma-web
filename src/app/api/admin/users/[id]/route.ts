import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ACTIVITY_AREAS } from "@/lib/activity-areas";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== "admin") {
        return NextResponse.json({ error: "Acceso denegado." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const rawArea = body.area;

    let area: string | null;
    if (rawArea === null || rawArea === "" || rawArea === "General") {
        area = null;
    } else if (typeof rawArea === "string" && ACTIVITY_AREAS.includes(rawArea as (typeof ACTIVITY_AREAS)[number])) {
        area = rawArea;
    } else {
        return NextResponse.json({ error: "Área no válida." }, { status: 400 });
    }

    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
        return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
    }

    const user = await prisma.user.update({
        where: { id },
        data: { area },
        select: { id: true, name: true, email: true, role: true, area: true },
    });

    return NextResponse.json({ user });
}
