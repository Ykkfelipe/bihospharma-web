"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PortalShell } from "../components/PortalShell";
import { PortalToast } from "../components/PortalToast";

type ActivityLog = {
    id: string;
    date: string;
    area: string;
    summary: string;
    createdAt: string;
};

const MIN_LENGTH = 10;

export default function ActividadesPage() {
    const { status } = useSession();
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [userArea, setUserArea] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const load = async () => {
        const res = await fetch("/api/activities", { cache: "no-store" });
        const data = await res.json();
        if (res.ok) {
            setLogs(data.logs ?? []);
            setUserArea(data.userArea ?? "");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        void load();
    }, [status]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const today = new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (summary.trim().length < MIN_LENGTH) {
            setToast({
                msg: `Escriba al menos ${MIN_LENGTH} caracteres describiendo sus actividades.`,
                type: "error",
            });
            return;
        }
        setSubmitting(true);
        setToast(null);
        const res = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary }),
        });
        const data = await res.json();
        if (!res.ok) {
            setToast({ msg: data.error ?? "No se pudo guardar.", type: "error" });
            setSubmitting(false);
            return;
        }
        setSummary("");
        await load();
        setToast({ msg: "Actividades registradas correctamente.", type: "success" });
        setSubmitting(false);
    };

    return (
        <PortalShell title="Seguimiento de actividades">
            <div className="portal-page portal-animate-in">
                <header className="portal-page-hero" style={{ textAlign: "center" }}>
                    <p className="portal-page-eyebrow">Registro diario</p>
                    <h1 className="portal-page-title">Actividades del día</h1>
                    <p className="portal-page-lead" style={{ margin: "0 auto" }}>
                        {today}
                        {userArea ? ` · Área: ${userArea}` : ""}
                    </p>
                </header>

                <div className="portal-section-card" style={{ padding: 24, marginBottom: 24 }}>
                    <div className="portal-section-header" style={{ margin: "-24px -24px 20px", borderRadius: "16px 16px 0 0" }}>
                        <div className="portal-section-icon announcement">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a2540", margin: 0 }}>
                            Registrar actividades
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="activity-summary"
                            style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0a2540", marginBottom: 8 }}
                        >
                            ¿Qué actividades realizó hoy?
                        </label>
                        <textarea
                            id="activity-summary"
                            className="portal-input"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={5}
                            placeholder="Describa las tareas, atenciones o gestiones que realizó durante el día…"
                            style={{ width: "100%", resize: "vertical", minHeight: 120, marginBottom: 12 }}
                            disabled={submitting}
                        />
                        <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 16px" }}>
                            Mínimo {MIN_LENGTH} caracteres. Puede registrar varias entradas en el mismo día.
                        </p>
                        <button
                            type="submit"
                            className="portal-btn-primary"
                            disabled={submitting || summary.trim().length < MIN_LENGTH}
                            style={{ width: "100%" }}
                        >
                            {submitting ? "Guardando…" : "Registrar actividades"}
                        </button>
                    </form>
                    {toast && <PortalToast message={toast.msg} type={toast.type} />}
                </div>

                <div className="portal-section-card" style={{ padding: 24 }}>
                    <div className="portal-section-header" style={{ margin: "-24px -24px 20px", borderRadius: "16px 16px 0 0" }}>
                        <div className="portal-section-icon document">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a2540", margin: 0 }}>
                            Registros de hoy
                        </h2>
                    </div>
                    {loading ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Cargando…</p>
                    ) : logs.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
                            Aún no ha registrado actividades hoy.
                        </p>
                    ) : (
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                            {logs.map((log) => (
                                <li
                                    key={log.id}
                                    style={{
                                        borderBottom: "1px solid #e2e8f0",
                                        paddingBottom: 16,
                                    }}
                                >
                                    <p style={{ margin: "0 0 6px", fontSize: 13, color: "#334155", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                                        {log.summary}
                                    </p>
                                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>
                                        {formatTime(log.createdAt)} · {log.area}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <p className="portal-programas-footnote">
                    Este registro es independiente del control de asistencia. Use{" "}
                    <strong>Reloj</strong> en el menú para marcar entrada y salida.
                </p>
            </div>
        </PortalShell>
    );
}
