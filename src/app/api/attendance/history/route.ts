import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAttendanceHistory, formatErrorResponse } from "@/lib/attendance-utils";

export const dynamic = "force-dynamic";

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

        // Parse pagination parameters from query string
        const url = new URL(req.url);
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 500); // Max 500
        const offset = parseInt(url.searchParams.get("offset") || "0");

        if (user.role === "admin") {
            // Admin: fetch all records
            const shifts = await getAttendanceHistory(null, limit, offset);
            
            // Get total count for pagination info
            const total = await prisma.shift.count();
            
            return NextResponse.json({
                data: shifts,
                pagination: { limit, offset, total },
            });
        } else {
            // Employee: fetch only their records
            const shifts = await getAttendanceHistory(user.id, limit, offset);
            
            const total = await prisma.shift.count({ where: { userId: user.id } });
            
            return NextResponse.json({
                data: shifts,
                pagination: { limit, offset, total },
            });
        }
    } catch (err) {
        console.error("[GET /api/attendance/history] Error:", err);
        return formatErrorResponse(err);
    }
}
