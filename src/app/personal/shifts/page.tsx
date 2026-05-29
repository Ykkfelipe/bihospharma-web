"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PortalShell } from "../components/PortalShell";
import { PortalToast } from "../components/PortalToast";
import { ATTENDANCE_CHANGED_EVENT } from "../lib/attendance-client";

type Shift = {
    id: string;
    date: string;
    checkIn: string;
    checkOut?: string | null;
    isLate?: boolean;
};

export default function EmployeeShiftsPage() {
    const { status } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [todayShift, setTodayShift] = useState<Shift | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const todayStr = new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Bogota",
    });

    const loadData = async () => {
        const [historyRes, todayRes] = await Promise.all([
            fetch("/api/attendance/history?limit=60"),
            fetch("/api/attendance"),
        ]);
        const historyPayload = await historyRes.json();
        const rows = Array.isArray(historyPayload) ? historyPayload : historyPayload.data;
        setShifts(Array.isArray(rows) ? rows : []);

        const todayPayload = await todayRes.json();
        setTodayShift(todayPayload.shift ?? null);
        setLoading(false);
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        loadData();
        const refresh = () => loadData();
        window.addEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
        return () => window.removeEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
    }, [status]);

    const startShift = async () => {
        setActionLoading(true);
        setToast(null);
        try {
            const res = await fetch("/api/attendance", { method: "POST" });
            const data = await res.json();
            if (data.shift) {
                setTodayShift(data.shift);
                setToast({ msg: "Entrada registrada y guardada en el sistema.", type: "success" });
                await loadData();
            } else {
                setToast({ msg: data.error || "No se pudo registrar la entrada.", type: "error" });
            }
        } finally {
            setActionLoading(false);
        }
    };

    const endShift = async () => {
        if (!confirm("¿Registrar salida de tu turno?")) return;
        setActionLoading(true);
        setToast(null);
        try {
            const res = await fetch("/api/attendance/check-out", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setToast({ msg: "Salida registrada y guardada en el sistema.", type: "success" });
                await loadData();
            } else {
                setToast({ msg: data.error || "No se pudo registrar la salida.", type: "error" });
            }
        } finally {
            setActionLoading(false);
        }
    };

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const formatDate = (dateStr: string) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        if (!y || !m || !d) return dateStr;
        return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    if (status === "loading" || loading) {
        return (
            <PortalShell title="Mis turnos">
                <p style={{ textAlign: "center", color: "#94a3b8", padding: 48 }}>Cargando…</p>
            </PortalShell>
        );
    }

    return (
        <PortalShell title="Mis turnos">
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 48px" }}>
                <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, margin: "0 0 20px" }}>
                    {todayStr}
                </p>

                <div className="portal-attendance-card portal-attendance-card--stacked" style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a2540", margin: 0 }}>Turno de hoy</h2>
                    {toast && <PortalToast message={toast.msg} type={toast.type} />}
                    {!todayShift ? (
                        <>
                            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                                Aún no has registrado entrada hoy.
                            </p>
                            <button
                                type="button"
                                className="portal-btn-checkin"
                                onClick={startShift}
                                disabled={actionLoading}
                                style={{ alignSelf: "flex-start" }}
                            >
                                {actionLoading ? "Registrando..." : "Registrar entrada"}
                            </button>
                        </>
                    ) : (
                        <>
                            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                <div>
                                    <p style={{ fontSize: 10, textTransform: "uppercase", color: "#94a3b8", fontWeight: 600, margin: 0 }}>
                                        Entrada
                                    </p>
                                    <p style={{ fontSize: 20, fontWeight: 700, color: "#0f4c8a", margin: "4px 0 0" }}>
                                        {formatTime(todayShift.checkIn)}
                                    </p>
                                </div>
                                {todayShift.checkOut && (
                                    <div>
                                        <p style={{ fontSize: 10, textTransform: "uppercase", color: "#94a3b8", fontWeight: 600, margin: 0 }}>
                                            Salida
                                        </p>
                                        <p style={{ fontSize: 20, fontWeight: 700, color: "#ef4444", margin: "4px 0 0" }}>
                                            {formatTime(todayShift.checkOut)}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {!todayShift.checkOut && (
                                <button
                                    type="button"
                                    className="portal-btn-checkout"
                                    onClick={endShift}
                                    disabled={actionLoading}
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    {actionLoading ? "Registrando..." : "Registrar salida"}
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="portal-section-card">
                    <div className="portal-section-header">
                        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0a2540", margin: 0 }}>Historial reciente</h2>
                    </div>
                    {shifts.length === 0 ? (
                        <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", padding: "40px 16px", margin: 0 }}>
                            Sin registros aún.
                        </p>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ background: "#f8fafc", fontSize: 11, textTransform: "uppercase", color: "#64748b" }}>
                                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Fecha</th>
                                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Entrada</th>
                                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shifts.map((s) => (
                                        <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                                            <td style={{ padding: "12px 16px", color: "#334155", whiteSpace: "nowrap" }}>
                                                {formatDate(s.date)}
                                            </td>
                                            <td style={{ padding: "12px 16px", color: "#10b981", fontWeight: 600 }}>
                                                {formatTime(s.checkIn)}
                                            </td>
                                            <td style={{ padding: "12px 16px", color: "#64748b" }}>
                                                {s.checkOut ? formatTime(s.checkOut) : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </PortalShell>
    );
}
