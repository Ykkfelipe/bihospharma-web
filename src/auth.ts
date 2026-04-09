import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Correo electrónico", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const ip = (request?.headers as Headers)?.get?.("x-forwarded-for") ?? "unknown";
                const ua = (request?.headers as Headers)?.get?.("user-agent") ?? "unknown";

                try {
                    // BRUTE-FORCE PROTECTION: Check for failed attempts in the last 30 minutes
                    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
                    const failedAttempts = await prisma.loginLog.count({
                        where: {
                            email,
                            success: false,
                            createdAt: { gte: thirtyMinutesAgo },
                        },
                    });

                    if (failedAttempts >= 5) {
                        console.warn(`[auth] Account locked temporarily for ${email} due to ${failedAttempts} failed attempts.`);
                        throw new Error("Su cuenta ha sido bloqueada temporalmente debido a demasiados intentos fallidos. Intente de nuevo en 30 minutos.");
                    }

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user) {
                        // Log failed attempt (user not found)
                        await prisma.loginLog.create({
                            data: { email, success: false, ipAddress: ip, userAgent: ua },
                        }).catch(() => { }); // don't block auth on logging failure
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.passwordHash
                    );

                    if (!passwordMatch) {
                        // Log failed attempt (wrong password)
                        await prisma.loginLog.create({
                            data: { email, success: false, ipAddress: ip, userAgent: ua },
                        }).catch(() => { });
                        return null;
                    }

                    // Log successful login
                    await prisma.loginLog.create({
                        data: { email, success: true, ipAddress: ip, userAgent: ua },
                    }).catch(() => { });

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (e) {
                    console.error("[auth] Error during login:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
    },
});
