"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { signOutWithAttendance } from "../../lib/attendance-client";
import { ACTIVITY_AREAS } from "@/lib/activity-areas";

type Employee = {
    id: string;
    name: string;
    email: string;
    area: string | null;
};

type ActivityLog = {
    id: string;
    date: string;
    area: string;
    summary: string;
    createdAt: string;
    user: { id: string; name: string; email: string; area: string | null };
};

export default function AdminActividadesPage() {
    const { data: session, status } = useSession();
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");
    const [filterArea, setFilterArea] = useState("all");
    const [filterUser, setFilterUser] = useState("all");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loadData = () => {
        setLoading(true);
        const date = filterDate || todayStr;
        const params = new URLSearchParams({ date });
        if (filterArea !== "all") params.set("area", filterArea);
        if (filterUser !== "all") params.set("userId", filterUser);

        fetch(`/api/activities?${params}`, { cache: "no-store" })
            .then((r) => r.json())
            .then((data) => {
                if (data.logs) setLogs(data.logs);
                if (data.employees) setEmployees(data.employees);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (!filterDate) setFilterDate(todayStr);
    }, [todayStr]);

    useEffect(() => {
        if (filterDate && status === "authenticated") loadData();
    }, [filterDate, filterArea, filterUser, status]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const formatDateTime = (iso: string) =>
        new Date(iso).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" });

    const CSV_SEP = ";";

    const escapeCsvField = (value: string) => {
        if (/[";\r\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
        return value;
    };

    const csvRow = (fields: string[]) => fields.map(escapeCsvField).join(CSV_SEP);

    const exportCsv = () => {
        const date = filterDate || todayStr;
        const headers = ["Empleado", "Email", "Área", "Fecha", "Actividades", "Hora de registro"];
        const dataRows = logs.map((log) =>
            csvRow([
                log.user.name,
                log.user.email,
                log.area,
                log.date,
                log.summary,
                formatDateTime(log.createdAt),
            ])
        );
        const lines = [`sep=${CSV_SEP}`, csvRow(headers), ...dataRows];
        const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `actividades-${date}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const summaryByArea = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const log of logs) {
            counts[log.area] = (counts[log.area] ?? 0) + 1;
        }
        return counts;
    }, [logs]);

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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">
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
                                Seguimiento de actividades
                            </p>
                            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>Bihospharma IPS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        <Link
                            href="/personal/admin"
                            style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}
                        >
                            Publicaciones
                        </Link>
                        <Link
                            href="/personal/admin/attendance"
                            style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}
                        >
                            Asistencia
                        </Link>
                        <Link
                            href="/personal/admin/actividades"
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
                            Actividades
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
                    <select
                        value={filterArea}
                        onChange={(e) => setFilterArea(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm min-w-[160px]"
                    >
                        <option value="all">Todas las áreas</option>
                        {ACTIVITY_AREAS.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm min-w-[160px]"
                    >
                        <option value="all">Todos los empleados</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
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

                {Object.keys(summaryByArea).length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(summaryByArea).map(([area, count]) => (
                            <div
                                key={area}
                                className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm"
                            >
                                <p className="text-[10px] uppercase text-gray-500 font-semibold m-0">{area}</p>
                                <p className="text-xl font-bold text-[#0f4c8a] m-0 mt-1">{count}</p>
                                <p className="text-[10px] text-gray-400 m-0">registros</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-bold text-[#0a2540] m-0 mb-4">
                        Actividades — {filterDate}
                    </h2>
                    {loading ? (
                        <p className="text-sm text-gray-500 text-center py-8">Cargando…</p>
                    ) : logs.length === 0 ? (
                        <p className="text-sm text-gray-500">No hay registros para los filtros seleccionados.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left min-w-[800px]">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-3 py-3 min-w-[160px]">Empleado</th>
                                        <th className="px-3 py-3 min-w-[120px]">Área</th>
                                        <th className="px-3 py-3 min-w-[90px]">Fecha</th>
                                        <th className="px-3 py-3 min-w-[280px]">Actividades</th>
                                        <th className="px-3 py-3 min-w-[120px]">Registrado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="px-3 py-3">
                                                <span className="font-medium block">{log.user.name}</span>
                                                <span className="text-xs text-gray-500">{log.user.email}</span>
                                            </td>
                                            <td className="px-3 py-3 text-[#0f4c8a] font-medium">{log.area}</td>
                                            <td className="px-3 py-3 whitespace-nowrap">{log.date}</td>
                                            <td className="px-3 py-3 text-gray-700 whitespace-normal leading-snug">
                                                {log.summary}
                                            </td>
                                            <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                                {formatTime(log.createdAt)}
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
