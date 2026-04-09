import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET — list comments for a post
export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const postId = req.nextUrl.searchParams.get("postId");
        if (!postId) {
            return NextResponse.json({ error: "postId es requerido." }, { status: 400 });
        }

        const comments = await prisma.comment.findMany({
            where: { postId },
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(comments);
    } catch (err) {
        console.error("[GET /api/comments] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}

// POST — create a comment
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

        const { postId, body } = await req.json();

        if (!postId || !body?.trim()) {
            return NextResponse.json({ error: "postId y body son requeridos." }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: { body: body.trim(), userId: user.id, postId },
            include: { user: { select: { id: true, name: true, email: true } } },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (err) {
        console.error("[POST /api/comments] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}

// DELETE — delete own comment (or admin can delete any)
export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const { commentId } = await req.json();
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });

        if (!comment) {
            return NextResponse.json({ error: "Comentario no encontrado." }, { status: 404 });
        }

        const role = (session.user as { role?: string })?.role;
        if (comment.userId !== user.id && role !== "admin") {
            return NextResponse.json({ error: "No autorizado para eliminar este comentario." }, { status: 403 });
        }

        await prisma.comment.delete({ where: { id: commentId } });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[DELETE /api/comments] Error:", err);
        return NextResponse.json({ error: "Error interno." }, { status: 500 });
    }
}
