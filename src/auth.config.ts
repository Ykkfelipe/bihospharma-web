import type { NextAuthConfig } from "next-auth";

/**
 * auth.config.ts — Edge-compatible NextAuth config (no Node.js modules).
 * Used ONLY by middleware.ts which runs on the Edge Runtime.
 * The full auth.ts (with Prisma) is used everywhere else.
 */
export const authConfig: NextAuthConfig = {
    providers: [], // Providers are added in auth.ts
    pages: {
        signIn: "/personal/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdminLegacy = nextUrl.pathname.startsWith("/admin");
            const isOnPersonal = nextUrl.pathname.startsWith("/personal");
            const isOnLogin = nextUrl.pathname === "/personal/login";
            const isOnRegister = nextUrl.pathname === "/personal/register";
            const isOnForgotPassword = nextUrl.pathname === "/personal/forgot-password";
            const isOnResetPassword = nextUrl.pathname === "/personal/reset-password";

            if (isOnLogin || isOnRegister || isOnForgotPassword || isOnResetPassword) return true;
            if (isOnAdminLegacy) {
                if (!isLoggedIn) return false;
                const role = (auth?.user as { role?: string })?.role;
                return role === "admin";
            }
            if (isOnPersonal && !isLoggedIn) return false; // redirect to login
            if (nextUrl.pathname.startsWith("/personal/admin")) {
                const role = (auth?.user as { role?: string })?.role;
                return role === "admin";
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as { role?: string; id?: string }).role = token.role as string;
                (session.user as { role?: string; id?: string }).id = token.id as string;
            }
            return session;
        },
    },
    session: { 
        strategy: "jwt",
        maxAge: 180 * 24 * 60 * 60, // 180 days
    },
    trustHost: true,
    debug: false,
};

