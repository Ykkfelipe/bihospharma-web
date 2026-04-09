import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST — toggle a reaction on a post
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const { postId, type } = await req.json();

        if (!postId || !type) {
            return NextResponse.json({ error: "postId y type son requeridos." }, { status: 400 });
        }

        const validTypes = ["like", "love", "clap", "idea", "check"];
        if (!validTypes.includes(type)) {
            return NextResponse.json({ error: "Tipo de reacción inválido." }, { status: 400 });
        }

        // Toggle: if exists, remove; if not, create
        const existing = await prisma.reaction.findUnique({
            where: { userId_postId_type: { userId: user.id, postId, type } },
        });

        if (existing) {
            await prisma.reaction.delete({ where: { id: existing.id } });
        } else {
            await prisma.reaction.create({
                data: { type, userId: user.id, postId },
            });
        }

        // Return updated counts for this post
        const reactions = await prisma.reaction.findMany({
            where: { postId },
            select: { type: true, userId: true },
        });

        const counts: Record<string, number> = {};
        const userReactions: string[] = [];
        for (const r of reactions) {
            counts[r.type] = (counts[r.type] || 0) + 1;
            if (r.userId === user.id) userReactions.push(r.type);
        }

        return NextResponse.json({ counts, userReactions });
    } catch (err) {
        console.error("[POST /api/reactions] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}
