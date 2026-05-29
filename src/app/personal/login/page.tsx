"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MailIcon, LockIcon, AlertIcon } from "../components/PortalFieldIcons";

export default function LoginPage() {
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
            const lockCheck = await fetch(`/api/auth/check-lock?email=${encodeURIComponent(email)}`);
            const lockData = await lockCheck.json();

            if (lockData.locked) {
                setError(lockData.message);
                setLoading(false);
                return;
            }

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            setLoading(false);

            if (result?.error) {
                if (result.error === "CredentialsSignin" || result.error === "Credentials") {
                    setError("Correo o contraseña incorrectos. Por favor verifica tus datos.");
                } else {
                    setError(result.error);
                }
            } else if (result?.ok) {
                window.location.href = "/personal";
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            setError("Ocurrió un error de red o de seguridad. Por favor recarga la página e intenta de nuevo.");
        }
    };

    return (
        <main className="portal-auth-bg min-h-screen flex items-center justify-center p-4">
            {/* Floating orb */}
            <div className="portal-orb" />

            <div className="w-full max-w-md portal-animate-in" style={{ position: 'relative', zIndex: 1 }}>
                <div className="portal-auth-card">
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0a2540 0%, #0f4c8a 100%)',
                        padding: '32px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Decorative circles */}
                        <div style={{
                            position: 'absolute', width: 120, height: 120, borderRadius: '50%',
                            background: 'rgba(79, 195, 247, 0.06)', top: -30, right: -20,
                        }} />
                        <div style={{
                            position: 'absolute', width: 80, height: 80, borderRadius: '50%',
                            background: 'rgba(129, 212, 250, 0.05)', bottom: -20, left: 30,
                        }} />

                        <div style={{
                            width: 80, height: 80, borderRadius: '50%', background: '#fff',
                            margin: '0 auto 16px', padding: 12, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        }}>
                            <Image
                                src="/logos/bihos-logo.png"
                                alt="Bihospharma"
                                width={48}
                                height={48}
                                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                priority
                            />
                        </div>
                        <p style={{ color: '#7dd3fc', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                            Bihospharma IPS
                        </p>
                        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: 0 }}>
                            Acceso Corporativo
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>
                            Portal exclusivo para colaboradores
                        </p>
                    </div>

                    {/* Form */}
                    <div className="portal-animate-in-delay" style={{ padding: '28px 32px 32px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                    Correo electrónico
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                                        <MailIcon />
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="portal-input"
                                        style={{ paddingLeft: 40 }}
                                        placeholder="usuario@bihospharma.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                    Contraseña
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                                        <LockIcon />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="portal-input"
                                        style={{ paddingLeft: 40, paddingRight: 44 }}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                                            color: '#94a3b8', fontSize: 14, transition: 'color 0.2s',
                                        }}
                                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="portal-alert-error">
                                    <span style={{ flexShrink: 0, marginTop: 1, color: '#dc2626', display: 'flex' }}>
                                        <AlertIcon />
                                    </span>
                                    <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{error}</p>
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="portal-btn-primary" style={{ marginTop: 4 }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="portal-spinner" />
                                        Iniciando sesión...
                                    </span>
                                ) : "Iniciar sesión"}
                            </button>
                        </form>

                        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                            <p style={{ marginBottom: 10 }}>
                                <Link href="/personal/forgot-password" style={{ color: '#0f4c8a', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </p>
                            <p style={{ fontSize: 13, color: '#6b7280' }}>
                                ¿No tienes cuenta?{" "}
                                <Link href="/personal/register" style={{ color: '#0f4c8a', fontWeight: 700, textDecoration: 'none' }}>
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer branding */}
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 24 }}>
                    © {new Date().getFullYear()} Bihospharma IPS S.A.S · Todos los derechos reservados
                </p>
            </div>
        </main>
    );
}
