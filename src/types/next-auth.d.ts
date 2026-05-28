import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role: "admin" | "employee";
        };
    }

    interface User {
        role: "admin" | "employee";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: "admin" | "employee";
    }
}
