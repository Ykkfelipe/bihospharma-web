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
    ipAddress?: string | null;
    user: { id: string; name: string; email: string };
};

export default function AttendanceReportPage() {
    const { data: session, status } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");
    const [filterUser, setFilterUser] = useState("all");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    const loadShifts = () => {
        setLoading(true);
        fetch("/api/attendance/history?limit=500", { cache: "no-store" })
            .then((res) => res.json())
            .then((payload) => {
                const rows = Array.isArray(payload) ? payload : payload.data;
                if (Array.isArray(rows)) setShifts(rows);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        setFilterDate(todayStr);
        loadShifts();
    }, [todayStr]);

    const employees = useMemo(() => {
        const map = new Map<string, { id: string; name: string; email: string }>();
        for (const s of shifts) {
            if (!map.has(s.user.id)) map.set(s.user.id, s.user);
        }
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [shifts]);

    const filteredShifts = useMemo(() => {
        return shifts.filter((s) => {
            if (filterDate && s.date !== filterDate) return false;
            if (filterUser !== "all" && s.user.id !== filterUser) return false;
            return true;
        });
    }, [shifts, filterDate, filterUser]);

    const stats = useMemo(() => {
        const onDate = filterDate ? shifts.filter((s) => s.date === filterDate) : shifts;
        const active = onDate.filter((s) => !s.checkOut && s.date === todayStr);
        const late = onDate.filter((s) => s.isLate);
        const completed = onDate.filter((s) => s.checkOut);
        return { total: onDate.length, active: active.length, late: late.length, completed: completed.length };
    }, [shifts, filterDate, todayStr]);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const calculateHours = (start: string, end: string | null) => {
        if (!end) return "—";
        const diff = new Date(end).getTime() - new Date(start).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m`;
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
            <header className="portal-header" style={{ position: "sticky", top: 0, zIndex: 50 }}>
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
                            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>Panel de Administración</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/personal/admin"
                            style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}
                        >
                            Publicaciones
                        </Link>
                        <Link href="/personal" style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}>
                            Portal
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: "Registros", value: stats.total, color: "#0f4c8a" },
                        { label: "En turno hoy", value: stats.active, color: "#10b981" },
                        { label: "Entradas tarde", value: stats.late, color: "#ef4444" },
                        { label: "Turnos cerrados", value: stats.completed, color: "#6366f1" },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                        >
                            <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold m-0">
                                {card.label}
                            </p>
                            <p className="text-2xl font-bold m-0 mt-1" style={{ color: card.color }}>
                                {card.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-base font-bold text-[#0a2540] m-0">
                            Historial de entradas y salidas
                        </h2>
                        <div className="flex flex-wrap gap-2 items-center">
                            <button
                                type="button"
                                onClick={loadShifts}
                                className="text-xs font-semibold text-[#0f4c8a] bg-[#e0e7ff] px-3 py-1.5 rounded-lg hover:bg-[#c7d2fe]"
                            >
                                Actualizar
                            </button>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0f4c8a]"
                            />
                            <select
                                value={filterUser}
                                onChange={(e) => setFilterUser(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0f4c8a] min-w-[160px]"
                            >
                                <option value="all">Todos los empleados</option>
                                {employees.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-sm text-gray-500 text-center py-10">Cargando datos...</p>
                    ) : filteredShifts.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-10">
                            No hay registros para los filtros seleccionados.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Empleado</th>
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Entrada</th>
                                        <th className="px-4 py-3">Salida</th>
                                        <th className="px-4 py-3">Tiempo total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredShifts.map((shift) => (
                                        <tr
                                            key={shift.id}
                                            className="border-b last:border-0 hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {shift.user.name}
                                                <br />
                                                <span className="text-xs text-gray-500 font-normal">
                                                    {shift.user.email}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">{shift.date}</td>
                                            <td className="px-4 py-3 text-[#10b981] font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span>{formatTime(shift.checkIn)}</span>
                                                    {shift.isLate && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full">
                                                            Tarde
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                {shift.checkOut ? (
                                                    <span className="text-[#ef4444]">
                                                        {formatTime(shift.checkOut)}
                                                    </span>
                                                ) : shift.date < todayStr ? (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 text-yellow-700 rounded-full">
                                                        Falta salida
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 italic">En curso</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-700">
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
