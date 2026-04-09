import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const role = (session?.user as { role?: string })?.role;

        if (!session || role !== "admin") {
            return NextResponse.json({ error: "Solo el administrador puede subir archivos." }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
        }

        // Limit to 50MB
        if (file.size > 50 * 1024 * 1024) {
            return NextResponse.json({ error: "El archivo es demasiado grande (máximo 50MB)." }, { status: 400 });
        }

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/mp4",
            "video/webm",
            "video/quicktime"
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Solo se permiten PDF, imágenes o videos (MP4, WebM)." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({ fileUrl: `/uploads/${filename}` }, { status: 201 });
    } catch (err) {
        console.error("[upload] Error:", err);
        return NextResponse.json({ error: "Error interno al subir el archivo." }, { status: 500 });
    }
}
