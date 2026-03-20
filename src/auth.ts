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
            async authorize(credentials) {
                console.log("[auth] Inside authorize... email =", credentials?.email);
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    console.log("[auth] Finding user in DB...");
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });
                    console.log("[auth] DB query finished. User found:", !!user);

                    if (!user) return null;

                    console.log("[auth] Comparing passwords...");
                    const passwordMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.passwordHash
                    );
                    console.log("[auth] Password match result:", passwordMatch);

                    if (!passwordMatch) return null;

                    console.log("[auth] Returning user object");
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
