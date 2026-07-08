"use client";

import Link from "next/link";
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
    status?: string | null;
};

type AttendancePayload = {
    shift: Shift | null;
    nextShift: { dayLabel: string; schedule: string } | null;
    status: string | null;
    dayOff: boolean;
    autoAttendance: boolean;
};

function useLiveClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    return now;
}

function formatClockParts(date: Date) {
    const parts = new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).formatToParts(date);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? "";

    return {
        hour: get("hour"),
        minute: get("minute"),
        second: get("second"),
        dayPeriod: get("dayPeriod"),
    };
}

function turnoState(
    shift: Shift | null,
    shiftStatus: string | null,
    dayOff: boolean
) {
    if (dayOff) return { label: "Día libre", tone: "dayoff" as const };
    if (!shift) return { label: "Sin entrada", tone: "idle" as const };
    if (shift.checkOut) return { label: "Turno cerrado", tone: "done" as const };
    if (shiftStatus === "lunch_break") return { label: "En almuerzo", tone: "lunch" as const };
    return { label: "En turno", tone: "active" as const };
}

export default function RelojPage() {
    const { status } = useSession();
    const now = useLiveClock();
    const [shift, setShift] = useState<Shift | null>(null);
    const [nextShift, setNextShift] = useState<AttendancePayload["nextShift"]>(null);
    const [shiftStatus, setShiftStatus] = useState<string | null>(null);
    const [dayOff, setDayOff] = useState(false);
    const [autoAttendance, setAutoAttendance] = useState(false);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [elapsed, setElapsed] = useState("");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

    const load = async () => {
        const res = await fetch("/api/attendance", { cache: "no-store" });
        const data: AttendancePayload = await res.json();
        setShift(data.shift ?? null);
        setNextShift(data.nextShift ?? null);
        setShiftStatus(data.status ?? data.shift?.status ?? null);
        setDayOff(Boolean(data.dayOff));
        setAutoAttendance(Boolean(data.autoAttendance));
        setLoading(false);
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        void load();
        const refresh = () => load();
        window.addEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
        return () => window.removeEventListener(ATTENDANCE_CHANGED_EVENT, refresh);
    }, [status]);

    useEffect(() => {
        if (!shift?.checkIn || shift.checkOut || shiftStatus === "lunch_break") {
            setElapsed("");
            return;
        }
        const tick = () => {
            const diff = Math.max(0, Date.now() - new Date(shift.checkIn).getTime());
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setElapsed(`${hours}h ${mins}m`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [shift, shiftStatus]);

    const clock = formatClockParts(now);
    const tabTime = `${clock.hour}:${clock.minute}:${clock.second} ${clock.dayPeriod}`;

    useEffect(() => {
        const previous = document.title;
        document.title = `${tabTime} · Reloj · Bihospharma`;
        return () => {
            document.title = previous;
        };
    }, [tabTime]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour: "2-digit",
            minute: "2-digit",
        });

    const onEntrada = async () => {
        setBusy(true);
        setToast(null);
        const result = await autoCheckInIfNeeded();
        await load();
        if (result.skipped) {
            setBusy(false);
            return;
        }
        if (!result.ok) {
            setToast({
                msg: result.error || "No se pudo registrar la entrada.",
                type: "error",
            });
        } else if (result.alreadyCheckedIn) {
            setToast({ msg: "Ya tenías entrada registrada hoy.", type: "info" });
        } else {
            setToast({ msg: "Entrada registrada.", type: "success" });
        }
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

    const today = now.toLocaleDateString("es-CO", {
        timeZone: "America/Bogota",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const turno = turnoState(shift, shiftStatus, dayOff);
    const registroLabel = dayOff
        ? "Sin jornada hoy"
        : shift
          ? shift.checkOut
              ? `Entrada ${formatTime(shift.checkIn)} · Salida ${formatTime(shift.checkOut)}`
              : `Entrada ${formatTime(shift.checkIn)}`
          : "—";

    const showManualActions = !dayOff && !autoAttendance && (!shift || !shift.checkOut);

    return (
        <PortalShell title="Reloj" fullHeight>
            <div className="portal-page portal-page--reloj">
                <div className="portal-reloj-stage">
                    <div className="portal-reloj-card">
                        <div className="portal-reloj-clock" aria-live="off">
                            <div className="portal-reloj-topline">
                                <p className="portal-reloj-date">{today}</p>
                                {!loading && (
                                    <span className={`portal-reloj-pill portal-reloj-pill--${turno.tone}`}>
                                        {turno.label}
                                    </span>
                                )}
                            </div>

                            <div className="portal-reloj-time" aria-label={`Hora actual: ${tabTime}`}>
                                <span className="portal-reloj-time-main">
                                    {clock.hour}:{clock.minute}
                                </span>
                                <span className="portal-reloj-time-secs">:{clock.second}</span>
                                <span className="portal-reloj-time-ampm">{clock.dayPeriod}</span>
                            </div>
                            <p className="portal-reloj-tz">Hora Colombia</p>
                        </div>

                        {loading ? (
                            <p className="portal-reloj-shift-loading">Cargando…</p>
                        ) : (
                            <>
                                <div className="portal-reloj-metrics">
                                    <div className="portal-reloj-metric portal-reloj-metric--next-shift">
                                        <span className="portal-reloj-metric-label">Próximo turno</span>
                                        {nextShift ? (
                                            <>
                                                <span className="portal-reloj-metric-value portal-reloj-metric-value--day">
                                                    {nextShift.dayLabel}
                                                </span>
                                                <span className="portal-reloj-metric-sub">
                                                    {nextShift.schedule}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="portal-reloj-metric-value">—</span>
                                        )}
                                    </div>
                                    <div className="portal-reloj-metric">
                                        <span className="portal-reloj-metric-label">Tiempo activo</span>
                                        <span className="portal-reloj-metric-value portal-reloj-metric-value--emphasis">
                                            {dayOff
                                                ? "—"
                                                : elapsed || (shift && !shift.checkOut ? "0h 0m" : "—")}
                                        </span>
                                    </div>
                                    <div className="portal-reloj-metric">
                                        <span className="portal-reloj-metric-label">Registro</span>
                                        <span className="portal-reloj-metric-value">{registroLabel}</span>
                                    </div>
                                </div>

                                {dayOff && (
                                    <p className="portal-reloj-notice">
                                        Hoy no tienes jornada programada. Disfruta tu día libre.
                                    </p>
                                )}

                                {autoAttendance && !dayOff && (
                                    <p className="portal-reloj-notice">
                                        Su entrada y salida se registran automáticamente según su horario asignado.
                                    </p>
                                )}

                                {showManualActions && (
                                    <div className="portal-reloj-actions">
                                        {!shift ? (
                                            <button
                                                type="button"
                                                className="portal-btn-checkin portal-reloj-btn"
                                                disabled={busy}
                                                onClick={onEntrada}
                                            >
                                                {busy ? "…" : "Registrar entrada"}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="portal-btn-checkout portal-reloj-btn"
                                                disabled={busy}
                                                onClick={onSalida}
                                            >
                                                {busy ? "…" : "Registrar salida"}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {toast && <PortalToast message={toast.msg} type={toast.type} />}

                                <div className="portal-reloj-card-footer">
                                    <Link href="/personal/shifts" className="portal-reloj-card-link">
                                        Historial de turnos
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </PortalShell>
    );
}
