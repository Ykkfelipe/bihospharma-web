import { signOut } from "next-auth/react";

export const ATTENDANCE_CHANGED_EVENT = "portal-attendance-change";

export function notifyAttendanceChanged() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(ATTENDANCE_CHANGED_EVENT));
    }
}

export type AutoCheckInResult = {
    ok: boolean;
    alreadyCheckedIn?: boolean;
    error?: string;
};

/** Register today's check-in if the user has no open shift yet. */
export async function autoCheckInIfNeeded(): Promise<AutoCheckInResult> {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) {
        return { ok: false, error: data.error || "No se pudo consultar la asistencia." };
    }
    if (data.shift) {
        return { ok: true, alreadyCheckedIn: true };
    }

    const post = await fetch("/api/attendance", { method: "POST" });
    const created = await post.json();
    if (!post.ok) {
        return { ok: false, error: created.error || "No se pudo registrar la entrada." };
    }
    if (created.shift) {
        if (!created.alreadyCheckedIn) {
            notifyAttendanceChanged();
        }
        return { ok: true, alreadyCheckedIn: Boolean(created.alreadyCheckedIn) };
    }
    return { ok: false, error: "No se pudo registrar la entrada." };
}

/** Register today's check-out if the user has an open shift. Returns shift or null. */
export async function registerCheckOutIfNeeded(): Promise<{
    ok: boolean;
    shift?: { checkIn: string; checkOut: string | null };
    error?: string;
    skipped?: boolean;
}> {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    if (!data.shift || data.shift.checkOut) {
        return { ok: true, skipped: true };
    }

    const post = await fetch("/api/attendance/check-out", { method: "POST", cache: "no-store" });
    const result = await post.json();
    if (!post.ok) {
        return { ok: false, error: result.error || "No se pudo registrar la salida." };
    }

    notifyAttendanceChanged();
    return { ok: true, shift: result.shift ?? result };
}

/** Close today's shift if still open (silent, no confirm). */
export async function autoCheckOutIfNeeded(): Promise<boolean> {
    const result = await registerCheckOutIfNeeded();
    return result.ok && !result.skipped;
}

/** Cierra sesión sin registrar salida (cambiar de cuenta, salir del portal). */
export async function signOutPortal(callbackUrl = "/personal/login") {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    const hasOpenShift = data.shift && !data.shift.checkOut;

    if (hasOpenShift) {
        const confirmed = window.confirm(
            "Tienes un turno abierto. ¿Cerrar sesión sin registrar salida? Usa Terminar turno si quieres registrar tu salida."
        );
        if (!confirmed) return;
    }

    await signOut({ callbackUrl });
}

/**
 * Terminar turno: registra salida si hay turno abierto, luego cierra sesión.
 */
export async function signOutWithAttendance(callbackUrl = "/personal/login") {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    const data = await res.json();
    const hasOpenShift = data.shift && !data.shift.checkOut;

    if (hasOpenShift) {
        const confirmed = window.confirm(
            "¿Terminar turno y cerrar sesión?\n\nSe registrará tu salida en el sistema."
        );
        if (!confirmed) return;

        const checkout = await registerCheckOutIfNeeded();
        if (!checkout.ok) {
            window.alert(checkout.error || "No se pudo registrar la salida. Intenta de nuevo.");
            return;
        }
    } else if (typeof window !== "undefined") {
        const confirmed = window.confirm("¿Cerrar sesión en el portal?");
        if (!confirmed) return;
    }

    await signOut({ callbackUrl });
}
