import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function normalizePostType(value: unknown): "announcement" | "document" | "pinned" {
    if (value === "document") return "document";
    if (value === "pinned") return "pinned";
    return "announcement";
}

// DELETE — delete a post (admin only)
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;

    if (!session || role !== "admin") {
        return NextResponse.json({ error: "Solo el administrador puede eliminar." }, { status: 403 });
    }

    const { id } = await params;

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
}

// PATCH — update a post (admin only)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;

    if (!session || role !== "admin") {
        return NextResponse.json({ error: "Solo el administrador puede editar." }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, bodyText, fileUrl, type } = body;
    const normalizedType = normalizePostType(type);
    const normalizedFileUrl = fileUrl?.trim() || null;
    const normalizedBody = bodyText?.trim() || null;

    if (!title?.trim()) {
        return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
    }
    if (normalizedType === "document" && !normalizedFileUrl) {
        return NextResponse.json(
            { error: "Los documentos deben incluir un PDF o imagen adjunta." },
            { status: 400 }
        );
    }

    const post = await prisma.post.update({
        where: { id },
        data: {
            title: title.trim(),
            body: normalizedBody,
            fileUrl: normalizedFileUrl,
            type: normalizedType,
        },
    });

    return NextResponse.json(post);
}
