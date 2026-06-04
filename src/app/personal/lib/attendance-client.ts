import { signOut } from "next-auth/react";

export const ATTENDANCE_CHANGED_EVENT = "portal-attendance-change";

export function notifyAttendanceChanged() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(ATTENDANCE_CHANGED_EVENT));
    }
}

/** Register today's check-in if the user has no open shift yet. */
export async function autoCheckInIfNeeded(): Promise<boolean> {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    if (data.shift) return false;

    const post = await fetch("/api/attendance", { method: "POST" });
    const created = await post.json();
    if (created.shift) {
        notifyAttendanceChanged();
        return true;
    }
    return false;
}

/** Close today's shift if still open. */
export async function autoCheckOutIfNeeded(): Promise<boolean> {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    if (!data.shift || data.shift.checkOut) return false;

    const post = await fetch("/api/attendance/check-out", { method: "POST" });
    if (post.ok) {
        notifyAttendanceChanged();
        return true;
    }
    return false;
}

/** Sign out only — salida del turno es manual (Terminar turno / Registrar salida). */
export async function signOutWithAttendance(callbackUrl = "/personal/login") {
    await signOut({ callbackUrl });
}
