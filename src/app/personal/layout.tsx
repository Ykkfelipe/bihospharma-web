"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function PersonalLayout({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
