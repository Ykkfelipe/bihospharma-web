"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al enviar solicitud.");
            }

            setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado.");
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-white text-xl sm:text-2xl font-bold">Recuperar Contraseña</h1>
                    </div>

                    {/* Content */}
                    <div className="px-6 sm:px-8 py-6 sm:py-8">
                        {sent ? (
                            <div className="text-center py-4">
                                <div className="text-4xl mb-4">📧</div>
                                <h2 className="text-lg font-bold text-[#0a2540] mb-2">¡Correo enviado!</h2>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                    Si el correo está registrado, recibirás un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y la carpeta de spam.
                                </p>
                                <Link
                                    href="/personal/login"
                                    className="text-[#0f4c8a] font-bold text-sm hover:underline"
                                >
                                    ← Volver a Iniciar sesión
                                </Link>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600 mb-5">
                                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                                            placeholder="usuario@bihospharma.com"
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
                                        {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                                    </button>
                                </form>

                                <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                                    <Link href="/personal/login" className="text-[#0f4c8a] font-bold text-sm hover:underline">
                                        ← Volver a Iniciar sesión
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
