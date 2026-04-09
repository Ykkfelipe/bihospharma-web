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
        <main className="portal-auth-bg min-h-screen flex items-center justify-center p-4">
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
                        <div style={{
                            position: 'absolute', width: 120, height: 120, borderRadius: '50%',
                            background: 'rgba(79, 195, 247, 0.06)', top: -30, right: -20,
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
                            />
                        </div>
                        <p style={{ color: '#7dd3fc', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                            Bihospharma IPS
                        </p>
                        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: 0 }}>
                            Recuperar Contraseña
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="portal-animate-in-delay" style={{ padding: '28px 32px 32px' }}>
                        {sent ? (
                            <div style={{ textAlign: 'center', padding: '16px 0' }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 16px', fontSize: 28,
                                }}>
                                    ✓
                                </div>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0a2540', marginBottom: 8 }}>¡Correo enviado!</h2>
                                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
                                    Si el correo está registrado, recibirás un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y la carpeta de spam.
                                </p>
                                <Link
                                    href="/personal/login"
                                    style={{ color: '#0f4c8a', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
                                >
                                    ← Volver a Iniciar sesión
                                </Link>
                            </div>
                        ) : (
                            <>
                                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20, lineHeight: 1.5 }}>
                                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                            Correo electrónico
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 16 }}>
                                                ✉
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

                                    {error && (
                                        <div className="portal-alert-error">
                                            <span style={{ flexShrink: 0, marginTop: 1 }}>⚠️</span>
                                            <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{error}</p>
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading} className="portal-btn-primary">
                                        {loading ? (
                                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span className="portal-spinner" />
                                                Enviando...
                                            </span>
                                        ) : "Enviar enlace de recuperación"}
                                    </button>
                                </form>

                                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                                    <Link href="/personal/login" style={{ color: '#0f4c8a', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                                        ← Volver a Iniciar sesión
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 24 }}>
                    © {new Date().getFullYear()} Bihospharma IPS S.A.S · Todos los derechos reservados
                </p>
            </div>
        </main>
    );
}
