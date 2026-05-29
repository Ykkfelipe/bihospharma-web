"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type Shift = {
    id: string;
    date: string;
    checkIn: string;
    checkOut: string | null;
    isLate?: boolean;
    user: { id: string; name: string; email: string };
};

type RosterRow = {
    user: { id: string; name: string; email: string };
    status: "sin_entrada" | "en_turno" | "turno_cerrado";
    shift: { checkIn: string; checkOut: string | null; isLate: boolean } | null;
    lastPortalLogin: string | null;
};

type Summary = {
    date: string;
    totalEmployees: number;
    sinEntrada: number;
    enTurno: number;
    turnoCerrado: number;
    tarde: number;
};

const STATUS_LABEL: Record<RosterRow["status"], { label: string; className: string }> = {
    sin_entrada: { label: "Sin entrada", className: "bg-gray-100 text-gray-600" },
    en_turno: { label: "En turno", className: "bg-green-100 text-green-700" },
    turno_cerrado: { label: "Turno cerrado", className: "bg-blue-100 text-blue-700" },
};

export default function AttendanceReportPage() {
    const { data: session, status } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [roster, setRoster] = useState<RosterRow[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");
    const [filterUser, setFilterUser] = useState("all");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loadData = () => {
        setLoading(true);
        const date = filterDate || todayStr;
        Promise.all([
            fetch(`/api/admin/attendance-summary?date=${date}`, { cache: "no-store" }).then((r) => r.json()),
            fetch("/api/attendance/history?limit=500", { cache: "no-store" }).then((r) => r.json()),
        ])
            .then(([summaryPayload, historyPayload]) => {
                if (summaryPayload.roster) setRoster(summaryPayload.roster);
                if (summaryPayload.summary) setSummary(summaryPayload.summary);
                const rows = Array.isArray(historyPayload) ? historyPayload : historyPayload.data;
                if (Array.isArray(rows)) setShifts(rows);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (!filterDate) setFilterDate(todayStr);
    }, [todayStr]);

    useEffect(() => {
        if (filterDate) loadData();
    }, [filterDate]);

    const employees = useMemo(() => {
        const map = new Map<string, { id: string; name: string; email: string }>();
        for (const r of roster) map.set(r.user.id, r.user);
        for (const s of shifts) map.set(s.user.id, s.user);
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [roster, shifts]);

    const filteredShifts = useMemo(() => {
        return shifts.filter((s) => {
            if (filterDate && s.date !== filterDate) return false;
            if (filterUser !== "all" && s.user.id !== filterUser) return false;
            return true;
        });
    }, [shifts, filterDate, filterUser]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const calculateHours = (start: string, end: string | null) => {
        if (!end) return "—";
        const diff = new Date(end).getTime() - new Date(start).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m`;
    };

    const exportCsv = () => {
        const date = filterDate || todayStr;
        const lines = [
            "Empleado,Email,Estado,Entrada,Salida,Tarde,Último acceso portal",
            ...roster.map((r) => {
                const st = STATUS_LABEL[r.status].label;
                const entrada = r.shift ? formatTime(r.shift.checkIn) : "";
                const salida = r.shift?.checkOut ? formatTime(r.shift.checkOut) : "";
                const tarde = r.shift?.isLate ? "Sí" : "No";
                const login = r.lastPortalLogin ? formatTime(r.lastPortalLogin) : "";
                return `"${r.user.name}","${r.user.email}","${st}","${entrada}","${salida}","${tarde}","${login}"`;
            }),
        ];
        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
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
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
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
                            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>
                                Lo que registra el portal
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/personal/admin" style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}>
                            Publicaciones
                        </Link>
                        <Link href="/personal" style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}>
                            Portal
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
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
                </div>

                {summary && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {[
                            { label: "Empleados", value: summary.totalEmployees, color: "#64748b" },
                            { label: "Sin entrada", value: summary.sinEntrada, color: "#94a3b8" },
                            { label: "En turno", value: summary.enTurno, color: "#10b981" },
                            { label: "Turno cerrado", value: summary.turnoCerrado, color: "#6366f1" },
                            { label: "Llegaron tarde", value: summary.tarde, color: "#ef4444" },
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
                        Estado del equipo — {filterDate}
                    </h2>
                    {loading ? (
                        <p className="text-sm text-gray-500 text-center py-8">Cargando…</p>
                    ) : roster.length === 0 ? (
                        <p className="text-sm text-gray-500">No hay empleados registrados en el portal.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Empleado</th>
                                        <th className="px-4 py-3">Estado</th>
                                        <th className="px-4 py-3">Entrada</th>
                                        <th className="px-4 py-3">Salida</th>
                                        <th className="px-4 py-3">Acceso portal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roster.map((row) => (
                                        <tr key={row.user.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <span className="font-medium">{row.user.name}</span>
                                                <br />
                                                <span className="text-xs text-gray-500">{row.user.email}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${STATUS_LABEL[row.status].className}`}
                                                >
                                                    {STATUS_LABEL[row.status].label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-[#10b981]">
                                                {row.shift ? formatTime(row.shift.checkIn) : "—"}
                                            </td>
                                            <td className="px-4 py-3 text-[#ef4444]">
                                                {row.shift?.checkOut ? formatTime(row.shift.checkOut) : "—"}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {row.lastPortalLogin ? formatTime(row.lastPortalLogin) : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 className="text-base font-bold text-[#0a2540] m-0">Detalle de registros</h2>
                        <select
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm min-w-[160px]"
                        >
                            <option value="all">Todos</option>
                            {employees.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {filteredShifts.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-8">Sin registros para esta fecha.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Empleado</th>
                                        <th className="px-4 py-3">Entrada</th>
                                        <th className="px-4 py-3">Salida</th>
                                        <th className="px-4 py-3">Horas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredShifts.map((shift) => (
                                        <tr key={shift.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">{shift.user.name}</td>
                                            <td className="px-4 py-3 text-[#10b981]">
                                                {formatTime(shift.checkIn)}
                                                {shift.isLate && (
                                                    <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                        Tarde
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {shift.checkOut ? (
                                                    <span className="text-[#ef4444]">{formatTime(shift.checkOut)}</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">En curso</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {calculateHours(shift.checkIn, shift.checkOut)}
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
