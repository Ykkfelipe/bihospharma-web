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

    const getPasswordStrength = () => {
        if (password.length === 0) return { level: 0, label: "", color: "#e5e7eb" };
        if (password.length < 6) return { level: 1, label: "Débil", color: "#ef4444" };
        if (password.length < 8) return { level: 2, label: "Media", color: "#f59e0b" };
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);
        if (password.length >= 8 && (hasSpecial || hasMixed)) return { level: 4, label: "Fuerte", color: "#22c55e" };
        return { level: 3, label: "Buena", color: "#84cc16" };
    };

    const strength = getPasswordStrength();

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
        <main className="portal-auth-bg min-h-screen flex items-center justify-center py-10 px-4">
            <div className="portal-orb" />

            <div className="w-full max-w-lg portal-animate-in" style={{ position: 'relative', zIndex: 1 }}>
                <div className="portal-auth-card">
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0a2540 0%, #0f4c8a 100%)',
                        padding: '28px 32px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute', width: 120, height: 120, borderRadius: '50%',
                            background: 'rgba(79, 195, 247, 0.06)', top: -30, right: -20,
                        }} />
                        <div style={{
                            width: 72, height: 72, borderRadius: '50%', background: '#fff',
                            margin: '0 auto 14px', padding: 12, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        }}>
                            <Image
                                src="/logos/bihos-logo.png"
                                alt="Bihospharma"
                                width={42}
                                height={42}
                                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </div>
                        <p style={{ color: '#7dd3fc', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                            Bihospharma IPS
                        </p>
                        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>
                            Crear Cuenta Corporativa
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: 11, marginTop: 6, padding: '0 16px' }}>
                            Ingresa el código proporcionado por Recursos Humanos para activar tu cuenta.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="portal-animate-in-delay" style={{ padding: '24px 32px 32px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                    Nombre completo
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>👤</span>
                                    <input
                                        type="text" value={name} onChange={(e) => setName(e.target.value)}
                                        required className="portal-input" style={{ paddingLeft: 40 }}
                                        placeholder="Ej: Juan Pérez"
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                    Correo electrónico
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>✉</span>
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        required className="portal-input" style={{ paddingLeft: 40 }}
                                        placeholder="usuario@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                    Crea una contraseña
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>🔒</span>
                                    <input
                                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        required minLength={6} className="portal-input" style={{ paddingLeft: 40 }}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                </div>
                                {/* Password strength bar */}
                                {password.length > 0 && (
                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} style={{
                                                    flex: 1, height: 3, borderRadius: 2,
                                                    background: i <= strength.level ? strength.color : '#e5e7eb',
                                                    transition: 'background 0.3s ease',
                                                }} />
                                            ))}
                                        </div>
                                        <p style={{ fontSize: 11, color: strength.color, fontWeight: 600, margin: 0 }}>
                                            {strength.label}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1e40af', marginBottom: 6 }}>
                                    Código de acceso corporativo *
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#60a5fa', fontSize: 15 }}>🔑</span>
                                    <input
                                        type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)}
                                        required className="portal-input"
                                        style={{
                                            paddingLeft: 40, fontFamily: 'monospace', textTransform: 'uppercase',
                                            background: '#eff6ff', borderColor: '#bfdbfe', color: '#1e3a5f',
                                        }}
                                        placeholder="Ingresa tu código"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="portal-alert-error">
                                    <span style={{ flexShrink: 0, marginTop: 1 }}>⚠️</span>
                                    <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{error}</p>
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="portal-btn-primary" style={{ marginTop: 4 }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="portal-spinner" />
                                        Creando cuenta...
                                    </span>
                                ) : "Crear mi cuenta corporativa"}
                            </button>
                        </form>

                        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                            <p style={{ fontSize: 13, color: '#6b7280' }}>
                                ¿Ya tienes cuenta?{" "}
                                <Link href="/personal/login" style={{ color: '#0f4c8a', fontWeight: 700, textDecoration: 'none' }}>
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 24 }}>
                    © {new Date().getFullYear()} Bihospharma IPS S.A.S · Todos los derechos reservados
                </p>
            </div>
        </main>
    );
}
