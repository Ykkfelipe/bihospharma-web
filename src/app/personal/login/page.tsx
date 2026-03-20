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
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            setLoading(false);

            if (result?.error) {
                setError("Correo o contraseña incorrectos. Por favor verifica tus datos.");
            } else if (result?.ok) {
                router.push("/personal");
                router.refresh();
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            setError("Ocurrió un error de red o de seguridad. Por favor recarga la página e intenta de nuevo.");
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
                        <h1 className="text-white text-xl sm:text-2xl font-bold">Acceso Corporativo</h1>
                    </div>

                    {/* Form */}
                    <div className="px-6 sm:px-8 py-6 sm:py-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
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

                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/50 focus:border-[#0f4c8a] transition-all bg-gray-50 focus:bg-white"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0f4c8a] transition-colors p-1"
                                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 sm:p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                    <span className="text-red-500 mt-0.5 text-sm">⚠️</span>
                                    <p className="text-red-600 text-xs sm:text-sm font-medium leading-tight">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#0a2540] to-[#0f4c8a] hover:opacity-90 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wide disabled:opacity-70 disabled:cursor-wait"
                            >
                                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            </button>
                        </form>

                        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs sm:text-sm text-gray-500">
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
