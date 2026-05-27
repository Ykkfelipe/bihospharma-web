"use client";

import { useState, useEffect } from "react";
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
    const { data: session } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

    useEffect(() => {
        setFilterDate(todayStr);

        fetch("/api/attendance/history")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setShifts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredShifts = filterDate
        ? shifts.filter(s => s.date === filterDate)
        : shifts;

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    const calculateHours = (start: string, end: string | null) => {
        if (!end) return "-";
        const diff = new Date(end).getTime() - new Date(start).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m`;
    };

    if (session?.user && (session.user as { role?: string }).role !== "admin") {
        return <div className="p-10 text-center text-red-500">Acceso denegado</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <header className="portal-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Image src="/logos/bihos-logo.png" alt="Bihospharma" width={32} height={32} style={{ borderRadius: '50%', background: '#fff', padding: 3 }} />
                        <div>
                            <p className="text-white font-bold text-xs sm:text-sm leading-none">Reporte de Asistencia</p>
                            <p style={{ color: '#64748b', fontSize: 10, margin: 0 }}>Panel de Administración</p>
                        </div>
                    </div>
                    <Link href="/personal/admin" style={{ color: '#94a3b8', fontSize: 11, textDecoration: 'none' }}>
                        ← Volver a Admin
                    </Link>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-base font-bold text-[#0a2540]">Historial de Entradas y Salidas</h2>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0f4c8a]"
                        />
                    </div>

                    {loading ? (
                        <p className="text-sm text-gray-500 text-center py-10">Cargando datos...</p>
                    ) : filteredShifts.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-10">No hay registros para esta fecha.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Empleado</th>
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Entrada</th>
                                        <th className="px-4 py-3">Salida</th>
                                        <th className="px-4 py-3">Tiempo Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredShifts.map((shift) => (
                                        <tr key={shift.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{shift.user.name} <br /><span className="text-xs text-gray-500 font-normal">{shift.user.email}</span></td>
                                            <td className="px-4 py-3 text-gray-500">{shift.date}</td>
                                            <td className="px-4 py-3 text-[#10b981] font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span>{formatTime(shift.checkIn)}</span>
                                                    {shift.isLate && <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full">Tarde</span>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                {shift.checkOut ? (
                                                    <span className="text-[#ef4444]">{formatTime(shift.checkOut)}</span>
                                                ) : shift.date < todayStr ? (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 text-yellow-700 rounded-full">Falta Salida</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">En curso</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-700">{calculateHours(shift.checkIn, shift.checkOut)}</td>
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
