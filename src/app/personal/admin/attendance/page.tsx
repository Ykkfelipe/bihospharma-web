"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AdminPortalShell, PortalShell } from "../../components/PortalShell";

type RosterStatus =
    | "sin_entrada"
    | "tarde_sin_entrada"
    | "en_turno"
    | "turno_cerrado"
    | "dia_libre";

type RosterRow = {
    user: { id: string; name: string; email: string };
    status: RosterStatus;
    scheduleToday: string | null;
    scheduleProfile: string;
    expectedStart: string | null;
    expectedEnd: string | null;
    shift: {
        checkIn: string;
        checkOut: string | null;
        isLate: boolean;
        lateReason?: string | null;
        lateReasonAt?: string | null;
        isEarly?: boolean;
        earlyReason?: string | null;
        earlyReasonAt?: string | null;
        autoCheckIn?: boolean;
        autoCheckout?: boolean;
        isLateCheckout?: boolean;
        status?: string;
        workHours?: string;
        breakHours?: string;
        totalHours?: string;
    } | null;
    lastPortalLogin: string | null;
};

type Summary = {
    date: string;
    totalEmployees: number;
    sinEntrada: number;
    tardeSinEntrada?: number;
    enTurno: number;
    turnoCerrado: number;
    tarde: number;
    salidaAnticipada?: number;
    cierreTardio?: number;
    diaLibre?: number;
};

const STATUS_LABEL: Record<RosterStatus, { label: string; className: string }> = {
    sin_entrada: { label: "Sin entrada", className: "portal-roster-status--sin_entrada" },
    tarde_sin_entrada: { label: "Tarde (sin entrada)", className: "portal-roster-status--tarde_sin_entrada" },
    en_turno: { label: "En turno", className: "portal-roster-status--en_turno" },
    turno_cerrado: { label: "Turno cerrado", className: "portal-roster-status--turno_cerrado" },
    dia_libre: { label: "Día libre", className: "portal-roster-status--dia_libre" },
};

export default function AttendanceReportPage() {
    const { data: session, status } = useSession();
    const [roster, setRoster] = useState<RosterRow[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [filterDate, setFilterDate] = useState("");
    const [exportFromDate, setExportFromDate] = useState("");
    const [exportToDate, setExportToDate] = useState("");
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);
    const [filterUser, setFilterUser] = useState("all");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loadData = useCallback(() => {
        setLoading(true);
        setLoadError(null);
        const date = filterDate || todayStr;
        fetch(`/api/admin/attendance-summary?date=${date}`, { cache: "no-store" })
            .then(async (r) => {
                const summaryPayload = await r.json().catch(() => ({}));
                if (!r.ok) {
                    const message =
                        typeof summaryPayload.error === "string"
                            ? summaryPayload.error
                            : `Error al cargar el reporte (${r.status})`;
                    setLoadError(message);
                    setRoster([]);
                    setSummary(null);
                    return;
                }
                if (summaryPayload.roster) setRoster(summaryPayload.roster);
                if (summaryPayload.summary) setSummary(summaryPayload.summary);
            })
            .catch(() => {
                setLoadError(
                    "No se pudo cargar el reporte de asistencia. Verifica tu conexión e intenta de nuevo."
                );
                setRoster([]);
                setSummary(null);
            })
            .finally(() => setLoading(false));
    }, [filterDate, todayStr]);

    useEffect(() => {
        if (!filterDate) setFilterDate(todayStr);
        if (!exportFromDate) setExportFromDate(todayStr);
        if (!exportToDate) setExportToDate(todayStr);
    }, [exportFromDate, exportToDate, filterDate, todayStr]);

    useEffect(() => {
        if (filterDate) loadData();
        const interval = setInterval(loadData, 60_000);
        return () => clearInterval(interval);
    }, [filterDate, loadData]);

    const filteredRoster = useMemo(() => {
        if (filterUser === "all") return roster;
        return roster.filter((r) => r.user.id === filterUser);
    }, [roster, filterUser]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatPortalLogin = (iso: string) =>
        new Date(iso).toLocaleString("es-CO", {
            timeZone: "America/Bogota",
            dateStyle: "short",
            timeStyle: "short",
        });

    const CSV_SEP = ";";

    const formatTime24 = (iso: string) => {
        const parts = new Intl.DateTimeFormat("es-CO", {
            timeZone: "America/Bogota",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).formatToParts(new Date(iso));
        const hour = (parts.find((p) => p.type === "hour")?.value ?? "00").padStart(2, "0");
        const minute = (parts.find((p) => p.type === "minute")?.value ?? "00").padStart(2, "0");
        return `${hour}:${minute}`;
    };

    const escapeCsvField = (value: string) => {
        if (/[";\r\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
        return value;
    };

    const csvRow = (fields: string[]) => fields.map(escapeCsvField).join(CSV_SEP);

    const listDatesInclusive = (start: string, end: string) => {
        const dates: string[] = [];
        const current = new Date(`${start}T00:00:00.000Z`);
        const last = new Date(`${end}T00:00:00.000Z`);

        while (current.getTime() <= last.getTime()) {
            dates.push(current.toISOString().slice(0, 10));
            current.setUTCDate(current.getUTCDate() + 1);
        }

        return dates;
    };

    const formatReason = (reason: string, recordedAt?: string | null) => {
        if (!recordedAt) return reason;
        return `${reason} (registrado ${formatTime24(recordedAt)})`;
    };

    const buildCsvRows = (rows: Array<{ date: string; roster: RosterRow[] }>) => {
        const headers = [
            "Fecha",
            "Empleado",
            "Email",
            "Estado",
            "Horario del día",
            "Entrada esperada",
            "Entrada registrada",
            "Salida esperada",
            "Salida registrada",
            "Horas trabajadas",
            "Almuerzo",
            "Total jornada",
            "Llegada tarde",
            "Motivo llegada tarde",
            "Salida anticipada",
            "Motivo salida anticipada",
            "Tipo de cierre",
            "Último acceso portal",
            "Observaciones",
        ];

        const dataRows = rows.flatMap(({ date, roster }) =>
            roster
                .filter((r) => filterUser === "all" || r.user.id === filterUser)
                .map((r) => {
                    const entrada = r.shift ? formatTime24(r.shift.checkIn) : "";
                    const salida = r.shift?.checkOut ? formatTime24(r.shift.checkOut) : "";
                    const tarde = r.status === "tarde_sin_entrada" || r.shift?.isLate;
                    const motivoTarde =
                        r.shift?.lateReason ??
                        (r.shift?.isLate
                            ? "Pendiente"
                            : r.status === "tarde_sin_entrada"
                              ? "Sin entrada al portal"
                              : "");
                    const anticipada = Boolean(r.shift?.isEarly);
                    const motivoAnticipada =
                        r.shift?.earlyReason ?? (r.shift?.isEarly ? "Pendiente" : "");
                    const tipoCierre = r.shift?.checkOut
                        ? r.shift.isLateCheckout
                            ? "Cierre automático por olvido"
                            : r.shift.autoCheckout
                              ? "Cierre automático por horario"
                              : r.shift.isEarly
                                ? "Salida anticipada"
                                : "Registro manual"
                        : "";
                    const observations = [
                        r.shift?.autoCheckIn ? "Entrada automática" : "",
                        r.shift?.autoCheckout ? "Salida automática" : "",
                        r.status === "dia_libre" ? "Día sin horario asignado" : "",
                    ].filter(Boolean);

                    return csvRow([
                        date,
                        r.user.name,
                        r.user.email,
                        STATUS_LABEL[r.status].label,
                        r.scheduleToday ?? "",
                        r.expectedStart ?? "",
                        entrada,
                        r.expectedEnd ?? "",
                        salida,
                        r.shift?.workHours ?? "",
                        r.shift?.breakHours ?? "",
                        r.shift?.totalHours ?? "",
                        tarde ? "Sí" : "No",
                        motivoTarde ? formatReason(motivoTarde, r.shift?.lateReasonAt) : "",
                        anticipada ? "Sí" : "No",
                        motivoAnticipada ? formatReason(motivoAnticipada, r.shift?.earlyReasonAt) : "",
                        tipoCierre,
                        r.lastPortalLogin ? formatPortalLogin(r.lastPortalLogin) : "",
                        observations.join(" · "),
                    ]);
                })
        );

        const lines = [`sep=${CSV_SEP}`, csvRow(headers), ...dataRows];
        return lines.join("\r\n");
    };

    const exportCsv = async () => {
        const from = exportFromDate || filterDate || todayStr;
        const to = exportToDate || from;
        const start = new Date(`${from}T00:00:00.000Z`);
        const end = new Date(`${to}T00:00:00.000Z`);

        setExportError(null);

        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            setExportError("Seleccione fechas válidas para exportar.");
            return;
        }

        if (start.getTime() > end.getTime()) {
            setExportError("La fecha inicial no puede ser mayor que la fecha final.");
            return;
        }

        const dates = listDatesInclusive(from, to);
        if (dates.length > 120) {
            setExportError("Seleccione un rango de máximo 120 días por exportación.");
            return;
        }

        setExporting(true);
        try {
            const rows: Array<{ date: string; roster: RosterRow[] }> = [];
            for (const date of dates) {
                const response = await fetch(`/api/admin/attendance-summary?date=${date}`, {
                    cache: "no-store",
                });
                const payload = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(
                        typeof payload.error === "string"
                            ? payload.error
                            : `No se pudo exportar la asistencia de ${date}.`
                    );
                }
                rows.push({
                    date,
                    roster: Array.isArray(payload.roster) ? (payload.roster as RosterRow[]) : [],
                });
            }

            const csv = buildCsvRows(rows);
            const dateSuffix = from === to ? from : `${from}_a_${to}`;
            const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `asistencia-${dateSuffix}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setExportError(err instanceof Error ? err.message : "No se pudo generar el CSV.");
        } finally {
            setExporting(false);
        }
    };

    if (status === "loading") {
        return (
            <PortalShell title="Administración">
                <div className="portal-page">
                    <p className="portal-admin-loading">Cargando panel…</p>
                </div>
            </PortalShell>
        );
    }

    if (session?.user?.role !== "admin") {
        return (
            <PortalShell title="Administración">
                <div className="portal-page">
                    <div className="portal-admin-alert" role="alert">
                        Acceso denegado.{" "}
                        <Link href="/personal" className="portal-profile-inline-link">
                            Volver al portal
                        </Link>
                    </div>
                </div>
            </PortalShell>
        );
    }

    return (
        <AdminPortalShell
            heading="Control de asistencia"
            lead="Consulte entradas, salidas, tardanzas y horas del equipo."
        >
            <div>
                <div className="portal-admin-toolbar">
                    <label className="portal-admin-field">
                        <span>Ver día</span>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="portal-input"
                        />
                    </label>
                    <button type="button" onClick={loadData} className="portal-admin-btn portal-admin-btn--primary">
                        Actualizar
                    </button>
                    <div className="portal-admin-export-range" aria-label="Rango para exportar CSV">
                        <label className="portal-admin-field">
                            <span>Exportar desde</span>
                            <input
                                type="date"
                                value={exportFromDate}
                                onChange={(e) => setExportFromDate(e.target.value)}
                                className="portal-input"
                            />
                        </label>
                        <label className="portal-admin-field">
                            <span>Hasta</span>
                            <input
                                type="date"
                                value={exportToDate}
                                onChange={(e) => setExportToDate(e.target.value)}
                                className="portal-input"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={exportCsv}
                            disabled={exporting}
                            className="portal-admin-btn"
                        >
                            {exporting ? "Exportando…" : "Exportar CSV"}
                        </button>
                    </div>
                    <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="portal-equipo-select"
                    >
                        <option value="all">Todos los empleados</option>
                        {roster.map((r) => (
                            <option key={r.user.id} value={r.user.id}>
                                {r.user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {exportError && (
                    <div role="alert" className="portal-admin-alert" style={{ marginBottom: 24 }}>
                        {exportError}
                    </div>
                )}

                {loadError && (
                    <div role="alert" className="portal-admin-alert" style={{ marginBottom: 24 }}>
                        {loadError}
                    </div>
                )}

                {summary && (
                    <div className="portal-admin-stat-grid">
                        {[
                            { label: "Empleados", value: summary.totalEmployees, color: "var(--portal-text-body)" },
                            { label: "Sin entrada", value: summary.sinEntrada, color: "var(--text-subtle)" },
                            {
                                label: "Tarde sin entrada",
                                value: summary.tardeSinEntrada ?? 0,
                                color: "#f87171",
                            },
                            { label: "En turno", value: summary.enTurno, color: "#34d399" },
                            { label: "Cerrados", value: summary.turnoCerrado, color: "#a5b4fc" },
                            { label: "Tarde (total)", value: summary.tarde, color: "#f87171" },
                            {
                                label: "Salida anticipada",
                                value: summary.salidaAnticipada ?? 0,
                                color: "#fbbf24",
                            },
                            {
                                label: "Cierre tardío",
                                value: summary.cierreTardio ?? 0,
                                color: "#fb923c",
                            },
                            {
                                label: "Día libre",
                                value: summary.diaLibre ?? 0,
                                color: "var(--text-subtle)",
                            },
                        ].map((card) => (
                            <div key={card.label} className="portal-admin-stat-card">
                                <p className="portal-admin-stat-label">{card.label}</p>
                                <p className="portal-admin-stat-value" style={{ color: card.color }}>
                                    {card.value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <p className="portal-equipo-scroll-hint">Deslice horizontalmente para ver todas las columnas</p>
                <div className="portal-section-card portal-equipo-table-wrap" style={{ padding: 24 }}>
                    <h2 className="portal-admin-panel-title">Equipo y horarios — {filterDate}</h2>
                    {loading ? (
                        <p className="portal-admin-loading">Cargando…</p>
                    ) : loadError ? (
                        <p className="portal-admin-loading">
                            No se pudo mostrar el equipo. Use «Actualizar» para reintentar.
                        </p>
                    ) : filteredRoster.length === 0 ? (
                        <p className="portal-empty-hint">No hay empleados registrados.</p>
                    ) : (
                        <table className="portal-equipo-table portal-attendance-table">
                            <thead>
                                <tr>
                                    <th>Empleado</th>
                                    <th>Estado</th>
                                    <th>Motivo tarde</th>
                                    <th>Motivo salida anticipada</th>
                                    <th>Cierre de turno</th>
                                    <th>Horario hoy</th>
                                    <th>Horario asignado</th>
                                    <th>Entrada</th>
                                    <th>Salida</th>
                                    <th>Horas trabajo</th>
                                    <th>Horas almuerzo</th>
                                    <th>Tiempo en turno</th>
                                    <th>Último acceso portal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRoster.map((row) => (
                                    <tr key={row.user.id}>
                                        <td>
                                            <span className="portal-equipo-name" style={{ display: "block" }}>
                                                {row.user.name}
                                            </span>
                                            <span className="portal-equipo-email">{row.user.email}</span>
                                        </td>
                                        <td>
                                            <span className={`portal-roster-status ${STATUS_LABEL[row.status].className}`}>
                                                {STATUS_LABEL[row.status].label}
                                            </span>
                                            {row.shift?.isLate && row.status !== "tarde_sin_entrada" && (
                                                <span className="portal-attendance-tag portal-attendance-tag--late">Tarde</span>
                                            )}
                                            {row.shift?.isEarly && (
                                                <span className="portal-attendance-tag portal-attendance-tag--early">
                                                    Salida anticipada
                                                </span>
                                            )}
                                            {row.shift?.isLateCheckout && (
                                                <span className="portal-attendance-tag portal-attendance-tag--late-checkout">
                                                    Cierre tardío
                                                </span>
                                            )}
                                            {row.shift?.autoCheckout && !row.shift?.isLateCheckout && (
                                                <span className="portal-attendance-tag portal-attendance-tag--auto">
                                                    Salida automática
                                                </span>
                                            )}
                                            {row.shift?.status === "lunch_break" && (
                                                <span className="portal-attendance-tag portal-attendance-tag--lunch">Almuerzo</span>
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-muted">
                                            {row.shift?.isLate || row.status === "tarde_sin_entrada" ? (
                                                row.shift?.lateReason ? (
                                                    <span title={row.shift.lateReason}>{row.shift.lateReason}</span>
                                                ) : row.status === "tarde_sin_entrada" ? (
                                                    <span className="portal-attendance-missing">Sin entrada al portal</span>
                                                ) : (
                                                    <span className="portal-attendance-pending">Pendiente</span>
                                                )
                                            ) : (
                                                "—"
                                            )}
                                            {row.shift?.lateReasonAt && (
                                                <span
                                                    className="portal-attendance-cell-expected"
                                                    style={{ display: "block", marginTop: 4 }}
                                                >
                                                    {new Date(row.shift.lateReasonAt).toLocaleString("es-CO", {
                                                        timeZone: "America/Bogota",
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                    })}
                                                </span>
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-muted">
                                            {row.shift?.isEarly ? (
                                                row.shift.earlyReason ? (
                                                    <span title={row.shift.earlyReason}>{row.shift.earlyReason}</span>
                                                ) : (
                                                    <span className="portal-attendance-pending">Pendiente</span>
                                                )
                                            ) : (
                                                "—"
                                            )}
                                            {row.shift?.earlyReasonAt && (
                                                <span
                                                    className="portal-attendance-cell-expected"
                                                    style={{ display: "block", marginTop: 4 }}
                                                >
                                                    {new Date(row.shift.earlyReasonAt).toLocaleString("es-CO", {
                                                        timeZone: "America/Bogota",
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                    })}
                                                </span>
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-muted">
                                            {row.shift?.checkOut ? (
                                                <>
                                                    {row.shift.isLateCheckout && (
                                                        <span className="portal-attendance-missing">
                                                            No registró salida — cierre automático
                                                        </span>
                                                    )}
                                                    {row.shift.autoCheckout && !row.shift.isLateCheckout && (
                                                        <span>Cierre automático (horario)</span>
                                                    )}
                                                    {row.shift.isEarly && (
                                                        <span>Salida anticipada</span>
                                                    )}
                                                    {!row.shift.isLateCheckout &&
                                                        !row.shift.autoCheckout &&
                                                        !row.shift.isEarly && (
                                                            <span>Registro manual</span>
                                                        )}
                                                </>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-schedule">{row.scheduleToday ?? "—"}</td>
                                        <td className="portal-attendance-cell-profile">{row.scheduleProfile}</td>
                                        <td className="portal-attendance-cell-in">
                                            {row.shift ? (
                                                formatTime(row.shift.checkIn)
                                            ) : row.expectedStart ? (
                                                <span className="portal-attendance-cell-expected">
                                                    Esperado {row.expectedStart}
                                                </span>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-out">
                                            {row.shift?.checkOut ? (
                                                formatTime(row.shift.checkOut)
                                            ) : row.expectedEnd ? (
                                                <span className="portal-attendance-cell-expected">
                                                    Esperado {row.expectedEnd}
                                                </span>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="portal-attendance-cell-hours">{row.shift?.workHours ?? "—"}</td>
                                        <td className="portal-attendance-cell-break">{row.shift?.breakHours ?? "—"}</td>
                                        <td className="portal-attendance-cell-muted">{row.shift?.totalHours ?? "—"}</td>
                                        <td className="portal-attendance-cell-muted">
                                            {row.lastPortalLogin ? formatPortalLogin(row.lastPortalLogin) : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminPortalShell>
    );
}
