"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al restablecer contraseña.");
            }

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-lg font-bold text-[#0a2540] mb-2">Enlace inválido</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Este enlace no es válido. Solicita uno nuevo desde la página de inicio de sesión.
                </p>
                <Link href="/personal/forgot-password" className="text-[#0f4c8a] font-bold text-sm hover:underline">
                    Solicitar nuevo enlace →
                </Link>
            </div>
        );
    }

    if (success) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-lg font-bold text-[#0a2540] mb-2">¡Contraseña actualizada!</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.
                </p>
                <Link
                    href="/personal/login"
                    className="inline-block bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] text-white font-bold py-3 px-8 rounded-xl text-sm uppercase tracking-wide shadow-lg hover:opacity-90 transition"
                >
                    Iniciar sesión
                </Link>
            </div>
        );
    }

    return (
        <>
            <p className="text-sm text-gray-600 mb-5">
                Ingresa tu nueva contraseña.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                        placeholder="Repite tu contraseña"
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 text-sm">⚠️</span>
                        <p className="text-red-600 text-xs sm:text-sm font-medium leading-tight">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] hover:opacity-90 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wide disabled:opacity-70 disabled:cursor-wait"
                >
                    {loading ? "Guardando..." : "Restablecer contraseña"}
                </button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0a2540 0%, #0f4c8a 60%, #1d6fbf 100%)" }}>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] px-6 sm:px-8 py-6 sm:py-8 text-center">
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={70}
                            height={70}
                            className="mx-auto rounded-full bg-white p-1.5 mb-4"
                        />
                        <p className="text-blue-200 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1">Bihospharma IPS</p>
                        <h1 className="text-white text-xl sm:text-2xl font-bold">Nueva Contraseña</h1>
                    </div>

                    {/* Content */}
                    <div className="px-6 sm:px-8 py-6 sm:py-8">
                        <Suspense fallback={<div className="text-center py-8 text-gray-400 text-sm">Cargando...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    );
}
