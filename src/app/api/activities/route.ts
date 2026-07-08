import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, withRetry } from "@/lib/prisma";
import { todayCO } from "@/lib/attendance-utils";
import { formatErrorResponse } from "@/lib/attendance-utils";
import { resolveUserArea } from "@/lib/activity-areas";

export const dynamic = "force-dynamic";

const MIN_SUMMARY_LENGTH = 10;

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const url = new URL(req.url);
        const date = url.searchParams.get("date") || todayCO();
        const area = url.searchParams.get("area");
        const userId = url.searchParams.get("userId");
        const adminView = url.searchParams.get("view") === "admin";

        if (user.role === "admin" && adminView) {
            const where: { date?: string; area?: string; userId?: string } = { date };
            if (area && area !== "all") where.area = area;
            if (userId && userId !== "all") where.userId = userId;

            const logs = await prisma.activityLog.findMany({
                where,
                orderBy: [{ createdAt: "desc" }],
                include: {
                    user: { select: { id: true, name: true, email: true, area: true } },
                },
            });

            const employees = await prisma.user.findMany({
                where: { role: "employee" },
                select: { id: true, name: true, email: true, area: true },
                orderBy: { name: "asc" },
            });

            return NextResponse.json({ logs, employees, date });
        }

        const logs = await prisma.activityLog.findMany({
            where: { userId: user.id, date },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            logs,
            date,
            userArea: resolveUserArea(user.area),
        });
    } catch (err) {
        console.error("[GET /api/activities] Error:", err);
        return formatErrorResponse(err);
    }
}

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

        const body = await req.json();
        const summary = typeof body.summary === "string" ? body.summary.trim() : "";

        if (summary.length < MIN_SUMMARY_LENGTH) {
            return NextResponse.json(
                { error: `Describa sus actividades con al menos ${MIN_SUMMARY_LENGTH} caracteres.` },
                { status: 400 }
            );
        }

        const date = todayCO();
        const area = resolveUserArea(user.area);

        const log = await withRetry(() =>
            prisma.activityLog.create({
                data: {
                    userId: user.id,
                    date,
                    area,
                    summary,
                },
            })
        );

        return NextResponse.json({ log }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/activities] Error:", err);
        return formatErrorResponse(err);
    }
}
