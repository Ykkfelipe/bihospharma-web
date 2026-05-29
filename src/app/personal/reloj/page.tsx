"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PortalShell } from "../components/PortalShell";
import { PortalToast } from "../components/PortalToast";
import {
    ATTENDANCE_CHANGED_EVENT,
    autoCheckInIfNeeded,
    autoCheckOutIfNeeded,
} from "../lib/attendance-client";

type Shift = {
    checkIn: string;
    checkOut: string | null;
};

export default function RelojPage() {
    const { status } = useSession();
    const [shift, setShift] = useState<Shift | null>(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const load = async () => {
        const res = await fetch("/api/attendance", { cache: "no-store" });
        const data = await res.json();
        setShift(data.shift ?? null);
        setLoading(false);
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        void load();
        const refresh = () => load();
        window.addEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
        return () => window.removeEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
    }, [status]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const onEntrada = async () => {
        setBusy(true);
        setToast(null);
        const ok = await autoCheckInIfNeeded();
        await load();
        setToast({
            msg: ok ? "Entrada registrada." : "Ya tenías entrada registrada hoy.",
            type: "success",
        });
        setBusy(false);
    };

    const onSalida = async () => {
        setBusy(true);
        setToast(null);
        const ok = await autoCheckOutIfNeeded();
        await load();
        setToast({
            msg: ok ? "Salida registrada." : "No había turno abierto para cerrar.",
            type: ok ? "success" : "error",
        });
        setBusy(false);
    };

    const today = new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <PortalShell title="Reloj de asistencia">
            <div style={{ maxWidth: 420, margin: "0 auto", padding: "32px 20px" }}>
                <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, margin: "0 0 24px" }}>
                    {today}
                </p>

                {loading ? (
                    <p style={{ textAlign: "center", color: "#94a3b8" }}>Cargando…</p>
                ) : (
                    <div className="portal-section-card" style={{ padding: 28, textAlign: "center" }}>
                        {shift ? (
                            <>
                                <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", margin: 0 }}>
                                    Entrada
                                </p>
                                <p style={{ fontSize: 28, fontWeight: 800, color: "#0f4c8a", margin: "4px 0 20px" }}>
                                    {formatTime(shift.checkIn)}
                                </p>
                                {shift.checkOut && (
                                    <>
                                        <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", margin: 0 }}>
                                            Salida
                                        </p>
                                        <p style={{ fontSize: 28, fontWeight: 800, color: "#ef4444", margin: "4px 0 20px" }}>
                                            {formatTime(shift.checkOut)}
                                        </p>
                                    </>
                                )}
                            </>
                        ) : (
                            <p style={{ color: "#64748b", marginBottom: 20 }}>Sin registro de entrada hoy.</p>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {!shift && (
                                <button
                                    type="button"
                                    className="portal-btn-checkin"
                                    disabled={busy}
                                    onClick={onEntrada}
                                    style={{ width: "100%" }}
                                >
                                    {busy ? "…" : "Registrar entrada"}
                                </button>
                            )}
                            {shift && !shift.checkOut && (
                                <button
                                    type="button"
                                    className="portal-btn-checkout"
                                    disabled={busy}
                                    onClick={onSalida}
                                    style={{ width: "100%" }}
                                >
                                    {busy ? "…" : "Registrar salida"}
                                </button>
                            )}
                        </div>

                        {toast && <PortalToast message={toast.msg} type={toast.type} />}
                    </div>
                )}

                <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
                    Marque entrada al llegar y salida al terminar. Al cerrar sesión en el portal también se
                    registra su salida automáticamente.
                </p>
            </div>
        </PortalShell>
    );
}
