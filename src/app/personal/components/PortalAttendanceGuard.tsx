"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { autoCheckInIfNeeded } from "../lib/attendance-client";

const PUBLIC_AUTH_PATHS = [
    "/personal/login",
    "/personal/register",
    "/personal/forgot-password",
    "/personal/reset-password",
];

export function PortalAttendanceGuard() {
    const { status } = useSession();
    const pathname = usePathname();
    const ranForSession = useRef(false);

    useEffect(() => {
        if (status !== "authenticated") {
            ranForSession.current = false;
            return;
        }
        if (!pathname || PUBLIC_AUTH_PATHS.some((p) => pathname.startsWith(p))) return;
        if (ranForSession.current) return;

        ranForSession.current = true;
        void autoCheckInIfNeeded();
    }, [status, pathname]);

    return null;
}
