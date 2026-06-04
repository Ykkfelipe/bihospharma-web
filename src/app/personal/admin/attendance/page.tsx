"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { signOutWithAttendance } from "../../lib/attendance-client";

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
    diaLibre?: number;
};

const STATUS_LABEL: Record<RosterStatus, { label: string; className: string }> = {
    sin_entrada: { label: "Sin entrada", className: "bg-gray-100 text-gray-600" },
    tarde_sin_entrada: { label: "Tarde (sin entrada)", className: "bg-red-100 text-red-700" },
    en_turno: { label: "En turno", className: "bg-green-100 text-green-700" },
    turno_cerrado: { label: "Turno cerrado", className: "bg-blue-100 text-blue-700" },
    dia_libre: { label: "Día libre", className: "bg-slate-100 text-slate-500" },
};

export default function AttendanceReportPage() {
    const { data: session, status } = useSession();
    const [roster, setRoster] = useState<RosterRow[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");
    const [filterUser, setFilterUser] = useState("all");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loadData = () => {
        setLoading(true);
        const date = filterDate || todayStr;
        fetch(`/api/admin/attendance-summary?date=${date}`, { cache: "no-store" })
            .then((r) => r.json())
            .then((summaryPayload) => {
                if (summaryPayload.roster) setRoster(summaryPayload.roster);
                if (summaryPayload.summary) setSummary(summaryPayload.summary);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (!filterDate) setFilterDate(todayStr);
    }, [todayStr]);

    useEffect(() => {
        if (filterDate) loadData();
        const interval = setInterval(loadData, 60_000);
        return () => clearInterval(interval);
    }, [filterDate]);

    const filteredRoster = useMemo(() => {
        if (filterUser === "all") return roster;
        return roster.filter((r) => r.user.id === filterUser);
    }, [roster, filterUser]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

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

    const exportCsv = () => {
        const date = filterDate || todayStr;
        const headers = [
            "Empleado",
            "Email",
            "Estado",
            "Horario hoy",
            "Horario asignado",
            "Entrada esperada",
            "Salida esperada",
            "Entrada",
            "Salida",
            "Horas trabajo",
            "Horas almuerzo",
            "Tiempo en turno",
            "Tarde",
            "Último acceso portal",
        ];
        const dataRows = filteredRoster.map((r) => {
            const st = STATUS_LABEL[r.status].label;
            const entrada = r.shift ? formatTime24(r.shift.checkIn) : "";
            const salida = r.shift?.checkOut ? formatTime24(r.shift.checkOut) : "";
            const tarde =
                r.status === "tarde_sin_entrada" || r.shift?.isLate ? "Sí" : "No";
            return csvRow([
                r.user.name,
                r.user.email,
                st,
                r.scheduleToday ?? "",
                r.scheduleProfile,
                r.expectedStart ?? "",
                r.expectedEnd ?? "",
                entrada,
                salida,
                r.shift?.workHours ?? "",
                r.shift?.breakHours ?? "",
                r.shift?.totalHours ?? "",
                tarde,
                r.lastPortalLogin ? formatTime24(r.lastPortalLogin) : "",
            ]);
        });
        const lines = [`sep=${CSV_SEP}`, csvRow(headers), ...dataRows];
        const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `asistencia-${date}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (status === "loading") {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-gray-500">Cargando panel...</p>
            </main>
        );
    }

    if (session?.user?.role !== "admin") {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-red-600 font-semibold mb-4">Acceso denegado</p>
                    <Link href="/personal" className="text-[#0f4c8a] text-sm font-medium">
                        Volver al portal
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <header className="portal-header">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%", background: "#fff", padding: 3 }}
                        />
                        <div>
                            <p className="text-white font-bold text-xs sm:text-sm leading-none">
                                Control de Asistencia
                            </p>
                            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>Bihospharma IPS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            href="/personal/admin"
                            style={{
                                color: "#94a3b8",
                                fontSize: 11,
                                textDecoration: "none",
                            }}
                        >
                            Publicaciones
                        </Link>
                        <Link
                            href="/personal/admin/attendance"
                            style={{
                                color: "#0f4c8a",
                                fontSize: 12,
                                fontWeight: 600,
                                textDecoration: "none",
                                background: "#e0e7ff",
                                padding: "6px 12px",
                                borderRadius: 8,
                            }}
                        >
                            Asistencia
                        </Link>
                        <Link href="/personal" style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}>
                            ← Ver portal
                        </Link>
                        <button
                            type="button"
                            onClick={() => signOutWithAttendance("/personal/login")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#64748b",
                                fontSize: 11,
                                cursor: "pointer",
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
                <div className="flex flex-wrap gap-2 items-center">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                    />
                    <button
                        type="button"
                        onClick={loadData}
                        className="text-xs font-semibold text-[#0f4c8a] bg-[#e0e7ff] px-3 py-1.5 rounded-lg"
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        onClick={exportCsv}
                        className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
                    >
                        Exportar CSV
                    </button>
                    <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm min-w-[160px]"
                    >
                        <option value="all">Todos los empleados</option>
                        {roster.map((r) => (
                            <option key={r.user.id} value={r.user.id}>
                                {r.user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {summary && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { label: "Empleados", value: summary.totalEmployees, color: "#64748b" },
                            { label: "Sin entrada", value: summary.sinEntrada, color: "#94a3b8" },
                            {
                                label: "Tarde sin entrada",
                                value: summary.tardeSinEntrada ?? 0,
                                color: "#ef4444",
                            },
                            { label: "En turno", value: summary.enTurno, color: "#10b981" },
                            { label: "Cerrados", value: summary.turnoCerrado, color: "#6366f1" },
                            { label: "Tarde (total)", value: summary.tarde, color: "#dc2626" },
                        ].map((card) => (
                            <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                <p className="text-[10px] uppercase text-gray-500 font-semibold m-0">{card.label}</p>
                                <p className="text-2xl font-bold m-0 mt-1" style={{ color: card.color }}>
                                    {card.value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-bold text-[#0a2540] m-0 mb-4">
                        Equipo y horarios — {filterDate}
                    </h2>
                    {loading ? (
                        <p className="text-sm text-gray-500 text-center py-8">Cargando…</p>
                    ) : filteredRoster.length === 0 ? (
                        <p className="text-sm text-gray-500">No hay empleados registrados.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left min-w-[1200px]">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-3 py-3 min-w-[180px]">Empleado</th>
                                        <th className="px-3 py-3 min-w-[120px]">Estado</th>
                                        <th className="px-3 py-3 min-w-[200px]">Horario hoy</th>
                                        <th className="px-3 py-3 min-w-[220px]">Horario asignado</th>
                                        <th className="px-3 py-3">Entrada</th>
                                        <th className="px-3 py-3">Salida</th>
                                        <th className="px-3 py-3">Horas trabajo</th>
                                        <th className="px-3 py-3">Horas almuerzo</th>
                                        <th className="px-3 py-3">Tiempo en turno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRoster.map((row) => (
                                        <tr key={row.user.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="px-3 py-3">
                                                <span className="font-medium block">{row.user.name}</span>
                                                <span className="text-xs text-gray-500">{row.user.email}</span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span
                                                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full whitespace-nowrap ${STATUS_LABEL[row.status].className}`}
                                                >
                                                    {STATUS_LABEL[row.status].label}
                                                </span>
                                                {row.shift?.isLate && row.status !== "tarde_sin_entrada" && (
                                                    <span className="ml-1 text-[10px] text-red-600 font-semibold">
                                                        Tarde
                                                    </span>
                                                )}
                                                {row.shift?.status === "lunch_break" && (
                                                    <span className="ml-1 text-[10px] text-amber-600">Almuerzo</span>
                                                )}
                                            </td>
                                            <td className="px-3 py-3 text-xs text-[#0f4c8a] whitespace-normal leading-snug">
                                                {row.scheduleToday ?? "—"}
                                            </td>
                                            <td className="px-3 py-3 text-[10px] text-gray-500 whitespace-normal leading-snug">
                                                {row.scheduleProfile}
                                            </td>
                                            <td className="px-3 py-3 text-[#10b981] whitespace-nowrap">
                                                {row.shift ? (
                                                    formatTime(row.shift.checkIn)
                                                ) : row.expectedStart ? (
                                                    <span className="text-gray-400">
                                                        Esperado {row.expectedStart}
                                                    </span>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="px-3 py-3 text-[#ef4444] whitespace-nowrap">
                                                {row.shift?.checkOut ? (
                                                    formatTime(row.shift.checkOut)
                                                ) : row.expectedEnd ? (
                                                    <span className="text-gray-400">
                                                        Esperado {row.expectedEnd}
                                                    </span>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="px-3 py-3 text-[#0f4c8a]">
                                                {row.shift?.workHours ?? "—"}
                                            </td>
                                            <td className="px-3 py-3 text-amber-700">
                                                {row.shift?.breakHours ?? "—"}
                                            </td>
                                            <td className="px-3 py-3 text-gray-600">
                                                {row.shift?.totalHours ?? "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
