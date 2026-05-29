"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    const { data: session, status } = useSession();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [todayShift, setTodayShift] = useState<Shift | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

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

    if (status === "loading" || loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-gray-500">Cargando...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-16">
            <header className="portal-header">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%", background: "#fff", padding: 3 }}
                        />
                        <p className="text-white font-bold text-sm m-0">Mis turnos</p>
                    </div>
                    <Link href="/personal" style={{ color: "#94a3b8", fontSize: 11, textDecoration: "none" }}>
                        ← Portal
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                <div className="portal-attendance-card">
                    <h2 className="text-base font-bold text-[#0a2540] m-0 mb-2">Turno de hoy</h2>
                    {toast && <PortalToast message={toast.msg} type={toast.type} />}
                    {!todayShift ? (
                        <>
                            <p className="text-sm text-gray-500 m-0 mb-4">
                                Aún no has registrado entrada ({todayStr}).
                            </p>
                            <button
                                type="button"
                                className="portal-btn-checkin"
                                onClick={startShift}
                                disabled={actionLoading}
                            >
                                {actionLoading ? "Registrando..." : "Registrar entrada"}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-6 mb-4">
                                <div>
                                    <p className="text-[10px] uppercase text-gray-400 font-semibold m-0">Entrada</p>
                                    <p className="text-[#0f4c8a] font-bold m-0">{formatTime(todayShift.checkIn)}</p>
                                </div>
                                {todayShift.checkOut && (
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-semibold m-0">Salida</p>
                                        <p className="text-[#ef4444] font-bold m-0">
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
                                >
                                    {actionLoading ? "Registrando..." : "Registrar salida"}
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-bold text-[#0a2540] m-0">Historial reciente</h2>
                    </div>
                    {shifts.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-10 m-0">Sin registros aún.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Fecha</th>
                                        <th className="px-4 py-3 text-left">Entrada</th>
                                        <th className="px-4 py-3 text-left">Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shifts.map((s) => (
                                        <tr key={s.id} className="border-t border-gray-50">
                                            <td className="px-4 py-3">{s.date}</td>
                                            <td className="px-4 py-3 text-[#10b981]">{formatTime(s.checkIn)}</td>
                                            <td className="px-4 py-3">
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
        </main>
    );
}
