"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
    ATTENDANCE_CHANGED_EVENT,
} from "./lib/attendance-client";
import { PostAttachment } from "../components/PostAttachment";
import { PortalToast } from "./components/PortalToast";
import { PortalShell } from "./components/PortalShell";
import { PortalQuickLinks } from "./components/PortalQuickLinks";

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
}: {
    postId: string;
    comments: PostComment[];
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
    const h = Number(
        new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Bogota",
            hour: "numeric",
            hour12: false,
        }).format(new Date())
    );
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
};

/* ── Attendance Widget ─────────────────────────────────── */

const formatLunchRange = (scheduleLabel: string | null): string | null => {
    if (!scheduleLabel) return null;
    const match = scheduleLabel.match(/Almuerzo\s+(\d{1,2}:\d{2})[–-](\d{1,2}:\d{2})/);
    if (!match) return null;
    const toDisplay = (hhmm: string) => {
        const [h, min] = hhmm.split(":").map(Number);
        const d = new Date(2000, 0, 1, h, min);
        return d.toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit", hour12: true });
    };
    return `${toDisplay(match[1])} – ${toDisplay(match[2])}`;
};

function AttendanceWidget({ status }: { status: "loading" | "authenticated" | "unauthenticated" }) {
    const [shift, setShift] = useState<{
        checkIn: string;
        checkOut: string | null;
        status?: string;
    } | null>(null);
    const [scheduleLabel, setScheduleLabel] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [elapsed, setElapsed] = useState("");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

    const fetchShift = async () => {
        try {
            const res = await fetch("/api/attendance", { cache: "no-store" });
            const data = await res.json();
            setShift(data.shift ?? null);
            setScheduleLabel(data.scheduleLabel ?? null);
            if (!res.ok && data.error) {
                setToast({ msg: data.error, type: "error" });
            }
        } catch (e) {
            console.error(e);
            setToast({ msg: "No se pudo cargar su asistencia. Recargue la página.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status !== "authenticated") return;
        fetchShift();

        const onAttendanceChange = () => fetchShift();
        window.addEventListener(ATTENDANCE_CHANGED_EVENT, onAttendanceChange);
        const poll = setInterval(fetchShift, 60_000);
        return () => {
            window.removeEventListener(ATTENDANCE_CHANGED_EVENT, onAttendanceChange);
            clearInterval(poll);
        };
    }, [status]);

    useEffect(() => {
        if (!shift || !shift.checkIn || shift.checkOut || shift.status === "lunch_break") return;
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

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour: "2-digit",
            minute: "2-digit",
        });
    const lunchRange = formatLunchRange(scheduleLabel);

    if (loading) return null;

    return (
        <div className="portal-attendance-card">
            <div>
                <div className="portal-attendance-head">
                    <div className="portal-section-icon" style={{ background: "#e0e7ff", color: "#4f46e5" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <h2 className="portal-attendance-title">Mi Asistencia</h2>
                    {shift && !shift.checkOut && <div className="portal-attendance-pulse" title="Turno activo" />}
                </div>

                {scheduleLabel && (
                    <p className="portal-attendance-schedule">Horario: {scheduleLabel}</p>
                )}
                {shift?.status === "lunch_break" && (
                    <p className="portal-attendance-lunch">
                        En almuerzo{lunchRange ? ` (${lunchRange})` : ""} — seguimiento en pausa
                    </p>
                )}
                {!shift ? (
                    <p className="portal-attendance-hint">
                        Use el reloj para registrar entrada y salida del turno.
                    </p>
                ) : (
                    <div className="portal-attendance-metrics">
                        <div>
                            <p className="portal-attendance-metric-label">Entrada</p>
                            <p className="portal-attendance-metric-value portal-attendance-metric-value--in">
                                {formatTime(shift.checkIn)}
                            </p>
                        </div>
                        {shift.checkOut ? (
                            <div>
                                <p className="portal-attendance-metric-label">Salida</p>
                                <p className="portal-attendance-metric-value portal-attendance-metric-value--out">
                                    {formatTime(shift.checkOut)}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="portal-attendance-metric-label">Tiempo Activo</p>
                                <p className="portal-attendance-metric-value portal-attendance-metric-value--active">
                                    {elapsed || "0h 0m"}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/personal/reloj" className="portal-btn-checkin" style={{ textDecoration: "none" }}>
                    Ir al reloj
                </Link>
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
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Bogota",
    });

    return (
        <PortalShell title="Inicio">
            <div className="portal-page portal-page--home">
                <header className="portal-home-header portal-animate-in">
                    <h1 className="portal-home-title">
                        {getGreeting()}, {(session?.user?.name || "").split(" ")[0]}
                    </h1>
                    <p className="portal-home-date">{todayStr}</p>
                </header>

                <PortalQuickLinks />

                <AttendanceWidget status={status} />

                {loading ? (
                    <div className="portal-animate-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : (
                    <div className="portal-home-feed">
                        {/* ── Pinned Institutional Documents ─────── */}
                        {pinned.length > 0 && (
                            <section>
                                <div className="portal-feed-section-head">
                                    <div className="portal-section-icon pinned">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L12 22M12 2L8 6M12 2L16 6" />
                                        </svg>
                                    </div>
                                    <h2 className="portal-feed-section-title">Documentos Institucionales</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {pinned.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div className="portal-section-header">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2">
                                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                <h3 className="portal-post-card-title">{post.title}</h3>
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
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {posts.length === 0 && (
                            <div className="portal-home-empty">
                                Aún no hay publicaciones en el tablero. Los administradores pueden publicar
                                comunicados desde el panel de administración.
                            </div>
                        )}

                        {/* ── Announcements ─────────────────────── */}
                        {announcements.length > 0 && (
                            <section>
                                <div className="portal-feed-section-head">
                                    <div className="portal-section-icon announcement">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                                        </svg>
                                    </div>
                                    <h2 className="portal-feed-section-title">Tablero de Comunicaciones</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {announcements.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div className="portal-post-card-banner">
                                                <h3 className="portal-post-card-title">{post.title}</h3>
                                                <span className="portal-post-date">{formatDate(post.createdAt)}</span>
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
                                <div className="portal-feed-section-head">
                                    <div className="portal-section-icon document">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="portal-feed-section-title">Documentos y Reglamentación</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {documents.map((post) => (
                                        <div key={post.id} className="portal-post-card">
                                            <div className="portal-post-card-banner">
                                                <h3 className="portal-post-card-title">{post.title}</h3>
                                                <span className="portal-post-date">{formatDate(post.createdAt)}</span>
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
        </PortalShell>
    );
}
