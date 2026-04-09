import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    try {
        const { filename } = await params;

        // Prevent directory traversal attacks
        if (filename.includes("/") || filename.includes("..")) {
            return new NextResponse("Invalid filename", { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", "uploads", filename);

        try {
            const fileBuffer = await readFile(filePath);

            // Determine content type
            const ext = filename.split(".").pop()?.toLowerCase();
            let contentType = "application/octet-stream";

            if (ext === "pdf") contentType = "application/pdf";
            else if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";
            else if (ext === "png") contentType = "image/png";
            else if (ext === "gif") contentType = "image/gif";
            else if (ext === "webp") contentType = "image/webp";

            return new NextResponse(fileBuffer as unknown as BodyInit, {
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        } catch {
            // File not found on disk
            return new NextResponse("File not found", { status: 404 });
        }
    } catch (error) {
        console.error("[uploads API] Error serving file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
