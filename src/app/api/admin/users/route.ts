import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function requireAdmin() {
    const session = await auth();
    if (!session?.user?.email) {
        return { error: NextResponse.json({ error: "No autorizado." }, { status: 401 }) };
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== "admin") {
        return { error: NextResponse.json({ error: "Acceso denegado." }, { status: 403 }) };
    }

    return { admin };
}

export async function GET() {
    const gate = await requireAdmin();
    if ("error" in gate && gate.error) return gate.error;

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            area: true,
        },
        orderBy: [{ role: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ users });
}
