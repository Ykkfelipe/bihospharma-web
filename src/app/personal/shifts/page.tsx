"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PortalShell } from "../components/PortalShell";
import { ATTENDANCE_CHANGED_EVENT } from "../lib/attendance-client";

type Shift = {
    id: string;
    date: string;
    checkIn: string;
    checkOut?: string | null;
    isLate?: boolean;
    lateReason?: string | null;
    isEarly?: boolean;
    earlyReason?: string | null;
    isLateCheckout?: boolean;
    autoCheckout?: boolean;
    workHours?: string;
};

export default function EmployeeShiftsPage() {
    const { status } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [todayShift, setTodayShift] = useState<Shift | null>(null);

    const todayStr = new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Bogota",
    });

    const loadData = async () => {
        const [historyRes, todayRes] = await Promise.all([
            fetch("/api/attendance/history?limit=60", { cache: "no-store" }),
            fetch("/api/attendance", { cache: "no-store" }),
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

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatDate = (dateStr: string) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        if (!y || !m || !d) return dateStr;
        return new Date(`${dateStr}T12:00:00-05:00`).toLocaleDateString("es-CO", {
            timeZone: "America/Bogota",
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const shiftReason = (s: Shift) => {
        if (s.isLateCheckout) return "Cierre tardío (automático)";
        if (s.isLate && s.lateReason) return s.lateReason;
        if (s.isEarly && s.earlyReason) return s.earlyReason;
        if (s.isLate) return "Pendiente";
        if (s.isEarly) return "Pendiente";
        if (s.autoCheckout) return "Salida automática";
        return null;
    };

    if (status === "loading" || loading) {
        return (
            <PortalShell title="Mis turnos">
                <div className="portal-page portal-animate-in">
                    <p className="portal-admin-loading">Cargando…</p>
                </div>
            </PortalShell>
        );
    }

    return (
        <PortalShell title="Mis turnos">
            <div className="portal-page portal-animate-in">
                <header className="portal-page-hero">
                    <p className="portal-page-eyebrow">Asistencia</p>
                    <h1 className="portal-page-title">Mis turnos</h1>
                    <p className="portal-page-lead portal-shifts-date">{todayStr}</p>
                </header>

                <section className="portal-surface portal-shifts-today">
                    <h2 className="portal-surface-title">Turno de hoy</h2>
                    {!todayShift ? (
                        <p className="portal-shifts-empty">Sin entrada registrada hoy.</p>
                    ) : (
                        <div className="portal-shifts-metrics">
                            <div>
                                <p className="portal-shifts-metric-label">Entrada</p>
                                <p className="portal-shifts-metric-value portal-shifts-metric-value--in">
                                    {formatTime(todayShift.checkIn)}
                                </p>
                            </div>
                            {todayShift.checkOut && (
                                <div>
                                    <p className="portal-shifts-metric-label">Salida</p>
                                    <p className="portal-shifts-metric-value portal-shifts-metric-value--out">
                                        {formatTime(todayShift.checkOut)}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <Link href="/personal/reloj" className="portal-btn-checkin portal-shifts-reloj-link">
                        Ir al reloj
                    </Link>
                </section>

                <div className="portal-section-card portal-equipo-table-wrap">
                    <div className="portal-section-header">
                        <h2 className="portal-shifts-section-title">Historial reciente</h2>
                    </div>
                    {shifts.length === 0 ? (
                        <p className="portal-shifts-empty portal-shifts-empty--padded">Sin registros aún.</p>
                    ) : (
                        <>
                            <p className="portal-equipo-scroll-hint">Desliza horizontalmente para ver todas las columnas</p>
                            <table className="portal-equipo-table portal-shifts-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Entrada</th>
                                        <th>Salida</th>
                                        <th>Tarde</th>
                                        <th>Sal. ant.</th>
                                        <th>Cierre tardío</th>
                                        <th>Horas</th>
                                        <th>Motivo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shifts.map((s) => {
                                        const reason = shiftReason(s);
                                        return (
                                            <tr key={s.id}>
                                                <td className="portal-shifts-cell-date">{formatDate(s.date)}</td>
                                                <td className="portal-shifts-cell-in">{formatTime(s.checkIn)}</td>
                                                <td className="portal-shifts-cell-muted">
                                                    {s.checkOut ? formatTime(s.checkOut) : "—"}
                                                </td>
                                                <td className={s.isLate ? "portal-shifts-cell-late" : "portal-shifts-cell-muted"}>
                                                    {s.isLate ? "Sí" : "No"}
                                                </td>
                                                <td className={s.isEarly ? "portal-shifts-cell-early" : "portal-shifts-cell-muted"}>
                                                    {s.isEarly ? "Sí" : "No"}
                                                </td>
                                                <td className={s.isLateCheckout ? "portal-shifts-cell-late-checkout" : "portal-shifts-cell-muted"}>
                                                    {s.isLateCheckout ? "Sí" : "No"}
                                                </td>
                                                <td className="portal-shifts-cell-hours">{s.workHours ?? "—"}</td>
                                                <td className="portal-shifts-cell-reason">{reason ?? "—"}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </PortalShell>
    );
}
