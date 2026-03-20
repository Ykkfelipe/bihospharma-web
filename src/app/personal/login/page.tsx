"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Correo o contraseña incorrectos. Por favor verifica tus datos.");
        } else {
            router.push("/personal");
            router.refresh();
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0a2540 0%, #0f4c8a 60%, #1d6fbf 100%)" }}>
            <div className="w-full max-w-md mx-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] px-8 py-8 text-center">
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={70}
                            height={70}
                            className="mx-auto rounded-full bg-white p-1.5 mb-4"
                        />
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Bihospharma IPS</p>
                        <h1 className="text-white text-2xl font-bold">Acceso Corporativo</h1>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
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
                                className="w-full bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wide disabled:opacity-70 disabled:cursor-wait"
                            >
                                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">
                                ¿No tienes cuenta?{" "}
                                <Link href="/personal/register" className="text-[#0f4c8a] font-bold hover:underline">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
