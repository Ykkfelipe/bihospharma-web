"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, accessCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al registrarse");
            }

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error("Cuenta creada, pero hubo un error al iniciar sesión.");
            } else {
                router.push("/personal");
                router.refresh();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center py-10 px-4" style={{ background: "linear-gradient(135deg, #0a2540 0%, #0f4c8a 60%, #1d6fbf 100%)" }}>
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] px-8 py-8 text-center">
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={65}
                            height={65}
                            className="mx-auto rounded-full bg-white p-1.5 mb-4"
                        />
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Bihospharma IPS</p>
                        <h1 className="text-white text-xl font-bold">Crear Cuenta Corporativa</h1>
                        <p className="text-blue-200 text-xs mt-2 px-4">Ingresa el código proporcionado por RRHH para activar tu cuenta.</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Crea una contraseña
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
                                <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                                    Código de acceso corporativo *
                                </label>
                                <input
                                    type="text"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    required
                                    className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm font-mono text-blue-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-blue-50/50 uppercase placeholder-blue-300"
                                    placeholder="EJEMPLO: BIHOS2026"
                                />
                            </div>

                            {error && (
                                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                    <span className="text-red-500 mt-0.5 text-sm">⚠️</span>
                                    <p className="text-red-600 text-sm font-medium leading-tight">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wide disabled:opacity-70 disabled:cursor-wait mt-2"
                            >
                                {loading ? "Creando cuenta..." : "Crear mi cuenta corporativa"}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">
                                ¿Ya tienes cuenta?{" "}
                                <Link href="/personal/login" className="text-[#0f4c8a] font-bold hover:underline">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
