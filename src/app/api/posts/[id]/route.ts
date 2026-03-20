import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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

    if (!title?.trim()) {
        return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
    }

    const post = await prisma.post.update({
        where: { id },
        data: {
            title: title.trim(),
            body: bodyText?.trim() || null,
            fileUrl: fileUrl?.trim() || null,
            type: type === "document" ? "document" : "announcement",
        },
    });

    return NextResponse.json(post);
}
