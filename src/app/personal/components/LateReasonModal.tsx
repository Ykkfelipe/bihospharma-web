"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ATTENDANCE_CHANGED_EVENT } from "../lib/attendance-client";

type ShiftInfo = {
    isLate: boolean;
    lateReason: string | null;
    checkIn: string;
};

export function LateReasonModal() {
    const { status } = useSession();
    const pathname = usePathname();
    const dismissedRef = useRef(false);
    const [open, setOpen] = useState(false);
    const [checkInLabel, setCheckInLabel] = useState("");
    const [reason, setReason] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const evaluate = useCallback(async () => {
        if (status !== "authenticated") {
            setOpen(false);
            return;
        }
        try {
            const res = await fetch("/api/attendance", { cache: "no-store" });
            const data = await res.json();
            if (data.dayOff) {
                setOpen(false);
                return;
            }
            const shift = data.shift as ShiftInfo | null;
            if (shift?.isLate && !shift.lateReason) {
                setCheckInLabel(
                    new Date(shift.checkIn).toLocaleTimeString("es-CO", {
                        timeZone: "America/Bogota",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                );
                setOpen(!dismissedRef.current);
            } else {
                dismissedRef.current = false;
                setOpen(false);
            }
        } catch {
            /* ignore */
        }
    }, [status]);

    useEffect(() => {
        dismissedRef.current = false;
        void evaluate();
    }, [pathname, evaluate]);

    useEffect(() => {
        const onChange = () => evaluate();
        window.addEventListener(ATTENDANCE_CHANGED_EVENT, onChange);
        return () => window.removeEventListener(ATTENDANCE_CHANGED_EVENT, onChange);
    }, [evaluate]);

    const submit = async () => {
        setError("");
        setSaving(true);
        try {
            const res = await fetch("/api/attendance/late-reason", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "No se pudo guardar.");
            setReason("");
            setOpen(false);
            window.dispatchEvent(new Event(ATTENDANCE_CHANGED_EVENT));
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al guardar.");
        } finally {
            setSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="late-reason-title"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                background: "rgba(15, 37, 64, 0.55)",
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 440,
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg, #0a2540, #0f4c8a)",
                        padding: "20px 24px",
                    }}
                >
                    <h2
                        id="late-reason-title"
                        style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: 0 }}
                    >
                        Llegó tarde hoy
                    </h2>
                    <p style={{ color: "#b6d9f7", fontSize: 13, margin: "8px 0 0" }}>
                        Entrada registrada a las <strong>{checkInLabel}</strong>. Cuéntenos el motivo.
                    </p>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                    <label
                        htmlFor="late-reason-text"
                        style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}
                    >
                        Motivo del retraso *
                    </label>
                    <textarea
                        id="late-reason-text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        maxLength={500}
                        placeholder="Ej.: Tráfico en Yopal, cita médica, falla de transporte..."
                        style={{
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: 12,
                            padding: 12,
                            fontSize: 14,
                            resize: "vertical",
                            boxSizing: "border-box",
                        }}
                    />
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "6px 0 0", textAlign: "right" }}>
                        {reason.length}/500
                    </p>
                    {error && (
                        <p style={{ fontSize: 13, color: "#dc2626", margin: "12px 0 0" }}>{error}</p>
                    )}
                    <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                        <button
                            type="button"
                            onClick={submit}
                            disabled={saving || reason.trim().length < 5}
                            style={{
                                flex: 1,
                                minWidth: 140,
                                background: "#0f4c8a",
                                color: "#fff",
                                border: "none",
                                borderRadius: 10,
                                padding: "12px 16px",
                                fontWeight: 700,
                                fontSize: 14,
                                cursor: saving ? "wait" : "pointer",
                                opacity: reason.trim().length < 5 ? 0.6 : 1,
                            }}
                        >
                            {saving ? "Guardando..." : "Enviar motivo"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                dismissedRef.current = true;
                                setOpen(false);
                            }}
                            style={{
                                background: "#f1f5f9",
                                color: "#64748b",
                                border: "none",
                                borderRadius: 10,
                                padding: "12px 16px",
                                fontWeight: 600,
                                fontSize: 13,
                                cursor: "pointer",
                            }}
                        >
                            Más tarde
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
