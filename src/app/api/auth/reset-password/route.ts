import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token y contraseña son obligatorios." }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
        }

        // Find the token
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken) {
            return NextResponse.json({ error: "El enlace es inválido o ya fue usado." }, { status: 400 });
        }

        // Check expiration
        if (new Date() > resetToken.expiresAt) {
            await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
            return NextResponse.json({ error: "El enlace ha expirado. Solicita uno nuevo." }, { status: 400 });
        }

        // Hash new password and update user
        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email: resetToken.email },
            data: { passwordHash },
        });

        // Delete the used token (and any other tokens for this email)
        await prisma.passwordResetToken.deleteMany({ where: { email: resetToken.email } });

        return NextResponse.json({ success: true, message: "Contraseña actualizada exitosamente." });
    } catch (error) {
        console.error("[reset-password] Error:", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
