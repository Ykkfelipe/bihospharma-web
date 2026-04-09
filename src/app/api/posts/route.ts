import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET — list all posts (any authenticated user)
export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const user = session.user?.email
            ? await prisma.user.findUnique({ where: { email: session.user.email } })
            : null;

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                reactions: { select: { type: true, userId: true } },
                comments: {
                    include: { user: { select: { id: true, name: true } } },
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        // Transform for client: add reaction counts + user's own reactions
        const result = posts.map((post) => {
            const reactionCounts: Record<string, number> = {};
            const userReactions: string[] = [];
            for (const r of post.reactions) {
                reactionCounts[r.type] = (reactionCounts[r.type] || 0) + 1;
                if (user && r.userId === user.id) userReactions.push(r.type);
            }
            return {
                id: post.id,
                title: post.title,
                body: post.body,
                fileUrl: post.fileUrl,
                type: post.type,
                createdAt: post.createdAt,
                reactionCounts,
                userReactions,
                commentCount: post.comments.length,
                comments: post.comments.map((c) => ({
                    id: c.id,
                    body: c.body,
                    createdAt: c.createdAt,
                    user: c.user,
                })),
            };
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("[GET /api/posts] Error:", err);
        return NextResponse.json({ error: "Error interno al cargar publicaciones." }, { status: 500 });
    }
}

// POST — create a new post (admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const role = (session?.user as { role?: string })?.role;

        if (!session || role !== "admin") {
            return NextResponse.json({ error: "Solo el administrador puede publicar." }, { status: 403 });
        }

        const body = await req.json();
        const { title, bodyText, fileUrl, type } = body;

        if (!title?.trim()) {
            return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                title: title.trim(),
                body: bodyText?.trim() || null,
                fileUrl: fileUrl?.trim() || null,
                type: type === "document" ? "document" : type === "pinned" ? "pinned" : "announcement",
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (err) {
        console.error("[POST /api/posts] Error:", err);
        return NextResponse.json({ error: "Error interno al publicar." }, { status: 500 });
    }
}
