import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { normalizePortalEmail } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { email: rawEmail, password, name, accessCode } = await req.json();

        if (!rawEmail || !password || !name || !accessCode) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
        }

        const email = normalizePortalEmail(String(rawEmail));

        // Check if the access code is correct
        const correctCode = process.env.PORTAL_ACCESS_CODE;
        if (!correctCode) {
            console.error("PORTAL_ACCESS_CODE is not set in environment variables");
            return NextResponse.json({ error: "Error de configuración del servidor." }, { status: 500 });
        }

        const normalizedCode = String(accessCode).trim();
        if (normalizedCode !== correctCode.trim()) {
            return NextResponse.json({ error: "Código de acceso incorrecto. Contacta al administrador si no lo tienes." }, { status: 403 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Este correo ya está registrado." }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user (always defaults to "employee" role per schema)
        await prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
                role: "employee",
            },
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Ocurrió un error inesperado al registrarte." }, { status: 500 });
    }
}
