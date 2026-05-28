"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { PostAttachment } from "../components/PostAttachment";
import PdfIframe from "../components/clients/PdfIframe";
import { PortalToast } from "./components/PortalToast";

/* ── Types ─────────────────────────────────────────────── */

type PostComment = {
    id: string;
    body: string;
    createdAt: string;
    user: { id: string; name: string };
};

type Post = {
    id: string;
    title: string;
    body: string | null;
    fileUrl: string | null;
    type: string;
    createdAt: string;
    reactionCounts: Record<string, number>;
    userReactions: string[];
    commentCount: number;
    comments: PostComment[];
};

/* ── Reaction config ───────────────────────────────────── */

const REACTIONS = [
    { type: "like", emoji: "👍", label: "Me gusta" },
    { type: "love", emoji: "❤️", label: "Me encanta" },
    { type: "clap", emoji: "👏", label: "Aplausos" },
    { type: "idea", emoji: "💡", label: "Buena idea" },
    { type: "check", emoji: "✅", label: "De acuerdo" },
];

/* ── Skeleton Loader ───────────────────────────────────── */

function SkeletonCard() {
    return (
        <div className="portal-section-card" style={{ padding: 24 }}>
            <div className="portal-skeleton" style={{ width: '40%', height: 14, marginBottom: 12 }} />
            <div className="portal-skeleton" style={{ width: '100%', height: 10, marginBottom: 8 }} />
            <div className="portal-skeleton" style={{ width: '75%', height: 10, marginBottom: 8 }} />
            <div className="portal-skeleton" style={{ width: '60%', height: 10 }} />
        </div>
    );
}

/* ── Reactions Bar Component ───────────────────────────── */

function ReactionsBar({
    postId,
    reactionCounts: initialCounts,
    userReactions: initialUserReactions,
}: {
    postId: string;
    reactionCounts: Record<string, number>;
    userReactions: string[];
}) {
    const [counts, setCounts] = useState(initialCounts);
    const [userReactions, setUserReactions] = useState(initialUserReactions);
    const [toggling, setToggling] = useState<string | null>(null);

    const toggle = async (type: string) => {
        if (toggling) return;
        setToggling(type);

        // Optimistic update
        const wasActive = userReactions.includes(type);
        setUserReactions((prev) =>
            wasActive ? prev.filter((r) => r !== type) : [...prev, type]
        );
        setCounts((prev) => ({
            ...prev,
            [type]: (prev[type] || 0) + (wasActive ? -1 : 1),
        }));

        try {
            const res = await fetch("/api/reactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, type }),
            });
            if (res.ok) {
                const data = await res.json();
                setCounts(data.counts);
                setUserReactions(data.userReactions);
            }
        } catch {
            // revert on error
            setUserReactions(initialUserReactions);
            setCounts(initialCounts);
        } finally {
            setToggling(null);
        }
    };

    const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            {REACTIONS.map((r) => {
                const active = userReactions.includes(r.type);
                const count = counts[r.type] || 0;
                return (
                    <button
                        key={r.type}
                        onClick={() => toggle(r.type)}
                        disabled={toggling !== null}
                        title={r.label}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '5px 10px',
                            borderRadius: 20,
                            border: active ? '1.5px solid #0f4c8a' : '1.5px solid #e5e7eb',
                            background: active ? '#eff6ff' : '#fff',
                            cursor: 'pointer',
                            fontSize: 13,
                            transition: 'all 0.2s ease',
                            color: active ? '#0f4c8a' : '#6b7280',
                            fontWeight: active ? 600 : 400,
                        }}
                    >
                        <span style={{ fontSize: 14 }}>{r.emoji}</span>
                        {count > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 600 }}>{count}</span>
                        )}
                    </button>
                );
            })}
            {totalReactions > 0 && (
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4 }}>
                    {totalReactions} {totalReactions === 1 ? 'reacción' : 'reacciones'}
                </span>
            )}
        </div>
    );
}

/* ── Comments Section ──────────────────────────────────── */

function CommentsSection({
    postId,
    comments: initialComments,
    commentCount: initialCount,
}: {
    postId: string;
    comments: PostComment[];
    commentCount: number;
}) {
    const [comments, setComments] = useState(initialComments);
    const [expanded, setExpanded] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();
    const userId = (session?.user as { id?: string })?.id;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || submitting) return;
        setSubmitting(true);

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, body: newComment.trim() }),
            });
            if (res.ok) {
                const comment = await res.json();
                setComments((prev) => [...prev, comment]);
                setNewComment("");
                setExpanded(true);
            }
        } catch {
            // silent fail
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            const res = await fetch("/api/comments", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentId }),
            });
            if (res.ok) {
                setComments((prev) => prev.filter((c) => c.id !== commentId));
            }
        } catch {
            // silent fail
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleDateString("es-CO", {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        });

    return (
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, marginTop: 12 }}>
            {/* Toggle */}
            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6,
                    fontWeight: 500,
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                {comments.length > 0
                    ? `${comments.length} comentario${comments.length !== 1 ? 's' : ''}`
                    : 'Comentar'}
                <span style={{ fontSize: 10, transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
            </button>

            {expanded && (
                <div className="portal-fade-in" style={{ marginTop: 12 }}>
                    {/* Comments list */}
                    {comments.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                            {comments.map((c) => (
                                <div key={c.id} style={{
                                    display: 'flex', gap: 10, padding: '8px 12px',
                                    background: '#f8fafc', borderRadius: 10,
                                    alignItems: 'flex-start',
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #1d6fbf, #4fc3f7)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: 10, fontWeight: 700,
                                    }}>
                                        {getInitials(c.user.name)}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{c.user.name}</span>
                                            <span style={{ fontSize: 10, color: '#94a3b8' }}>{formatTime(c.createdAt)}</span>
                                        </div>
                                        <p style={{ fontSize: 12, color: '#475569', margin: 0, lineHeight: 1.5, wordBreak: 'break-word' }}>
                                            {c.body}
                                        </p>
                                    </div>
                                    {(userId === c.user.id || (session?.user as { role?: string })?.role === 'admin') && (
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                color: '#cbd5e1', fontSize: 12, padding: 2, flexShrink: 0,
                                                transition: 'color 0.2s',
                                            }}
                                            title="Eliminar comentario"
                                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* New comment form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario profesional..."
                            maxLength={500}
                            style={{
                                flex: 1, border: '1.5px solid #e5e7eb', borderRadius: 10,
                                padding: '8px 12px', fontSize: 12, background: '#fff',
                                outline: 'none', transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#0f4c8a')}
                            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim() || submitting}
                            style={{
                                background: '#0f4c8a', color: '#fff', border: 'none',
                                borderRadius: 10, padding: '8px 16px', fontSize: 12,
                                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                opacity: !newComment.trim() || submitting ? 0.5 : 1,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {submitting ? '...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

/* ── Helpers ───────────────────────────────────────────── */

const isImage = (url: string | null) => {
    if (!url) return false;
    const ext = url.split('.').pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "");
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-CO", {
        year: "numeric", month: "long", day: "numeric",
    });

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
};

const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

/* ── Attendance Widget ─────────────────────────────────── */

function AttendanceWidget({ status }: { status: "loading" | "authenticated" | "unauthenticated" }) {
    const [shift, setShift] = useState<{ checkIn: string; checkOut: string | null } | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkingOut, setCheckingOut] = useState(false);
    const [checkingIn, setCheckingIn] = useState(false);
    const [elapsed, setElapsed] = useState("");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

    const fetchShift = async () => {
        try {
            const res = await fetch("/api/attendance", { cache: "no-store" });
            const data = await res.json();
            setShift(data.shift ?? null);
            if (!res.ok && data.error) {
                setToast({ msg: data.error, type: "error" });
            }
        } catch (e) {
            console.error(e);
            setToast({ msg: "No se pudo cargar tu asistencia. Recarga la página.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const manualCheckIn = async () => {
        setCheckingIn(true);
        setToast(null);
        try {
            const res = await fetch("/api/attendance", { method: "POST" });
            const data = await res.json();
            if (data.shift) {
                setShift(data.shift);
                const t = new Date(data.shift.checkIn).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                setToast({
                    msg: data.alreadyCheckedIn
                        ? `Ya tenías entrada registrada hoy (${t}).`
                        : `Entrada registrada correctamente a las ${t}.`,
                    type: "success",
                });
            } else if (!res.ok) {
                setToast({ msg: data.error || "No se pudo registrar la entrada.", type: "error" });
            }
        } catch (e) {
            console.error(e);
            setToast({ msg: "Error de red al registrar entrada.", type: "error" });
        } finally {
            setCheckingIn(false);
        }
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        fetchShift();
    }, [status]);

    useEffect(() => {
        if (!shift || !shift.checkIn || shift.checkOut) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const start = new Date(shift.checkIn).getTime();
            const diff = Math.max(0, now - start);
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setElapsed(`${hours}h ${mins}m`);
        }, 1000);
        return () => clearInterval(interval);
    }, [shift]);

    const handleCheckOut = async () => {
        if (!confirm("¿Seguro que quieres registrar tu salida?")) return;
        setCheckingOut(true);
        setToast(null);
        try {
            const res = await fetch("/api/attendance/check-out", { method: "POST" });
            const data = await res.json();
            const updated = data.shift ?? data;
            if (res.ok && updated?.checkIn) {
                setShift(updated);
                const t = updated.checkOut
                    ? new Date(updated.checkOut).toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "";
                setToast({
                    msg: t ? `Salida registrada correctamente a las ${t}.` : "Salida registrada.",
                    type: "success",
                });
            } else {
                setToast({ msg: data.error || "No se pudo registrar la salida.", type: "error" });
            }
        } catch (e) {
            console.error(e);
            setToast({ msg: "Error de red al registrar salida.", type: "error" });
        } finally {
            setCheckingOut(false);
        }
    };

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    if (loading) return null;

    return (
        <div className="portal-attendance-card" style={{ marginBottom: 32 }}>
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div className="portal-section-icon" style={{ background: "#e0e7ff", color: "#4f46e5" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a2540", margin: 0 }}>Mi Asistencia</h2>
                    {shift && !shift.checkOut && <div className="portal-attendance-pulse" title="Turno activo" />}
                </div>
                
                {!shift ? (
                    <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
                        Registra manualmente tu entrada al iniciar el turno y tu salida al terminar.
                        Los registros quedan guardados para administración.
                    </p>
                ) : (
                    <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                        <div>
                            <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", fontWeight: 600, margin: "0 0 4px" }}>Entrada</p>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "#0f4c8a", margin: 0 }}>{formatTime(shift.checkIn)}</p>
                        </div>
                        {shift.checkOut ? (
                            <div>
                                <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", fontWeight: 600, margin: "0 0 4px" }}>Salida</p>
                                <p style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", margin: 0 }}>{formatTime(shift.checkOut)}</p>
                            </div>
                        ) : (
                            <div>
                                <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", fontWeight: 600, margin: "0 0 4px" }}>Tiempo Activo</p>
                                <p style={{ fontSize: 15, fontWeight: 700, color: "#10b981", margin: 0 }}>{elapsed || "0h 0m"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {!shift && (
                    <button className="portal-btn-checkin" onClick={manualCheckIn} disabled={checkingIn}>
                        {checkingIn ? "Registrando..." : "Registrar Entrada"}
                    </button>
                )}
                {shift && !shift.checkOut && (
                    <button className="portal-btn-checkout" onClick={handleCheckOut} disabled={checkingOut}>
                        {checkingOut ? "Registrando..." : "Registrar Salida"}
                    </button>
                )}
            </div>
            {toast && <PortalToast message={toast.msg} type={toast.type} />}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════ */

export default function PersonalPage() {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const role = (session?.user as { role?: string })?.role;
    const userName = session?.user?.name ?? session?.user?.email ?? "";

    useEffect(() => {
        fetch("/api/posts")
            .then((r) => r.json())
            .then((data) => {
                setPosts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const announcements = posts.filter((p) => p.type === "announcement");
    const documents = posts.filter((p) => p.type === "document");
    const pinned = posts.filter((p) => p.type === "pinned");

    const todayStr = new Date().toLocaleDateString("es-CO", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <main style={{ minHeight: '100vh', background: '#f5f7fa', paddingBottom: 40 }}>
            {/* ── Premium Header ───────────────────────────────── */}
            <header className="portal-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: 960, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={32}
                            height={32}
                            style={{ borderRadius: '50%', background: '#fff', padding: 3 }}
                        />
                        <div>
                            <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1, margin: 0 }}>Acceso Corporativo</p>
                            <p style={{ color: '#64748b', fontSize: 10, margin: 0 }}>Bihospharma IPS</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="portal-avatar" style={{ display: 'none' }}>
                            {getInitials(session?.user?.name)}
                        </div>
                        <span className="hidden sm:block" style={{ color: '#94a3b8', fontSize: 12 }}>
                            {userName}
                        </span>
                        <Link
                            href="/personal/shifts"
                            style={{
                                color: '#94a3b8', fontSize: 10, fontWeight: 600,
                                textDecoration: 'none', padding: '6px 10px',
                            }}
                        >
                            Mis turnos
                        </Link>
                        {role === "admin" && (
                            <Link
                                href="/personal/admin"
                                style={{
                                    background: 'rgba(15, 76, 138, 0.5)', color: '#fff', fontSize: 10,
                                    fontWeight: 600, padding: '6px 14px', borderRadius: 8,
                                    textDecoration: 'none', transition: 'all 0.2s',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                Administrar
                            </Link>
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/personal/login" })}
                            style={{
                                background: 'none', border: 'none', color: '#64748b',
                                fontSize: 11, cursor: 'pointer', transition: 'color 0.2s',
                                padding: '4px 8px',
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px' }}>
                {/* ── Welcome Banner ───────────────────────────── */}
                <div className="portal-welcome portal-animate-in" style={{ marginBottom: 32 }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: 11, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 4, margin: 0 }}>
                            {todayStr}
                        </p>
                        <h1 style={{ fontSize: 24, fontWeight: 800, margin: '8px 0 4px', color: '#fff' }}>
                            {getGreeting()}, {(session?.user?.name || "").split(' ')[0]} 👋
                        </h1>
                        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>
                            Bienvenido al portal corporativo de Bihospharma IPS
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="portal-animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : (
                    <div className="portal-animate-in-delay" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                        {/* ── Mi Asistencia Widget ───────────────── */}
                        <AttendanceWidget status={status} />

                        {/* ── Pinned Institutional Documents ─────── */}
                        {pinned.length > 0 && (
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                    <div className="portal-section-icon pinned">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L12 22M12 2L8 6M12 2L16 6" />
                                        </svg>
                                    </div>
                                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0a2540', margin: 0 }}>
                                        Documentos Institucionales
                                    </h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {pinned.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div className="portal-section-header">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2">
                                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0a2540', margin: 0 }}>{post.title}</h3>
                                            </div>
                                            <div style={{ padding: '0 20px 16px' }}>
                                                {post.fileUrl && post.fileUrl.endsWith('.pdf') ? (
                                                    /* PDF: show body as a clickable link instead of embedding the viewer */
                                                    <a
                                                        href={post.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            color: '#1a73e8',
                                                            fontSize: 13,
                                                            lineHeight: 1.7,
                                                            margin: '12px 0',
                                                            textDecoration: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.color = '#0d47a1')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.color = '#1a73e8')}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                        </svg>
                                                        <span style={{ textDecoration: 'underline' }}>
                                                            {post.body || 'Ver documento'}
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <>
                                                        {post.body && (
                                                            <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: '12px 0' }}>
                                                                {post.body}
                                                            </p>
                                                        )}
                                                        {post.fileUrl ? (
                                                            <PostAttachment fileUrl={post.fileUrl} title={post.title} isImage={isImage} />
                                                        ) : null}
                                                    </>
                                                )}

                                                {/* Reactions */}
                                                <div style={{ marginTop: 16 }}>
                                                    <ReactionsBar
                                                        postId={post.id}
                                                        reactionCounts={post.reactionCounts}
                                                        userReactions={post.userReactions}
                                                    />
                                                </div>

                                                {/* Comments */}
                                                <CommentsSection
                                                    postId={post.id}
                                                    comments={post.comments}
                                                    commentCount={post.commentCount}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {posts.length === 0 && (
                            <div className="portal-section-card" style={{ padding: 32, textAlign: 'center' }}>
                                <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                                    Aún no hay publicaciones en el tablero. Los administradores pueden publicar comunicados desde el panel de administración.
                                </p>
                            </div>
                        )}

                        {/* ── Announcements ─────────────────────── */}
                        {announcements.length > 0 && (
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                    <div className="portal-section-icon announcement">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                                        </svg>
                                    </div>
                                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0a2540', margin: 0 }}>Tablero de Comunicaciones</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {announcements.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div style={{
                                                padding: '14px 20px', borderBottom: '1px solid #f5f5f5',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                background: 'linear-gradient(to right, #fafbfc, #fff)',
                                                flexWrap: 'wrap', gap: 8,
                                            }}>
                                                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0a2540', margin: 0 }}>{post.title}</h3>
                                                <span style={{ fontSize: 11, color: '#94a3b8' }}>{formatDate(post.createdAt)}</span>
                                            </div>
                                            <div style={{ padding: '16px 20px' }}>
                                                {post.body && (
                                                    <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0, marginBottom: post.fileUrl ? 14 : 0 }}>
                                                        {post.body}
                                                    </p>
                                                )}
                                                {post.fileUrl && (
                                                    <PostAttachment fileUrl={post.fileUrl} title={post.title} isImage={isImage} />
                                                )}

                                                {/* Reactions */}
                                                <div style={{ marginTop: 16 }}>
                                                    <ReactionsBar
                                                        postId={post.id}
                                                        reactionCounts={post.reactionCounts}
                                                        userReactions={post.userReactions}
                                                    />
                                                </div>

                                                {/* Comments */}
                                                <CommentsSection
                                                    postId={post.id}
                                                    comments={post.comments}
                                                    commentCount={post.commentCount}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Documents ─────────────────────────── */}
                        {documents.length > 0 && (
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                    <div className="portal-section-icon document">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                                        </svg>
                                    </div>
                                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0a2540', margin: 0 }}>Documentos y Reglamentación</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {documents.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div style={{
                                                padding: '14px 20px', borderBottom: '1px solid #f5f5f5',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                background: 'linear-gradient(to right, #fafbfc, #fff)',
                                                flexWrap: 'wrap', gap: 8,
                                            }}>
                                                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0a2540', margin: 0 }}>{post.title}</h3>
                                                <span style={{ fontSize: 11, color: '#94a3b8' }}>{formatDate(post.createdAt)}</span>
                                            </div>
                                            <div style={{ padding: '16px 20px' }}>
                                                {post.fileUrl && (
                                                    <PostAttachment fileUrl={post.fileUrl} title={post.title} isImage={isImage} />
                                                )}

                                                {/* Reactions */}
                                                <div style={{ marginTop: 16 }}>
                                                    <ReactionsBar
                                                        postId={post.id}
                                                        reactionCounts={post.reactionCounts}
                                                        userReactions={post.userReactions}
                                                    />
                                                </div>

                                                {/* Comments */}
                                                <CommentsSection
                                                    postId={post.id}
                                                    comments={post.comments}
                                                    commentCount={post.commentCount}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>

            {/* ── Footer ───────────────────────────────────── */}
            <div className="portal-footer">
                © {new Date().getFullYear()} Bihospharma IPS S.A.S · Portal Corporativo · Todos los derechos reservados
            </div>
        </main>
    );
}
