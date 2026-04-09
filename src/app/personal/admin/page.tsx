"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const ACCEPTED = "application/pdf,image/jpeg,image/png,image/gif,image/webp";

type Post = {
    id: string;
    title: string;
    body: string | null;
    fileUrl: string | null;
    type: string;
    createdAt: string;
};

function isImage(url: string | null) {
    if (!url) return false;
    const ext = url.split(".").pop()?.toLowerCase() ?? "";
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
}

export default function AdminPage() {
    const [stats, setStats] = useState({ users: 0, uploads: 0, announcements: 0 });
    const [posts, setPosts] = useState<Post[]>([]);
    const [postsLoaded, setPostsLoaded] = useState(false);

    // ── Create form ──────────────────────────────────────────────
    const [type, setType] = useState<"announcement" | "document">("announcement");
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    // ── Edit state ───────────────────────────────────────────────
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [editType, setEditType] = useState<"announcement" | "document">("announcement");
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editFileUrl, setEditFileUrl] = useState<string | null>(null);
    const [editSaving, setEditSaving] = useState(false);
    const editFileRef = useRef<HTMLInputElement>(null);

    const loadPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
        setPostsLoaded(true);
    };

    useEffect(() => {
        if (!postsLoaded) loadPosts();
    }, [postsLoaded]);

    const uploadFile = async (f: File): Promise<string> => {
        const fd = new FormData();
        fd.append("file", f);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        if (!up.ok) {
            let errorMsg = "Error al subir el archivo (quizás es demasiado pesado).";
            try {
                const err = await up.json();
                if (err.error) errorMsg = err.error;
            } catch {
                // Ignore json parse error for HTML 413 responses
            }
            throw new Error(errorMsg);
        }
        const { fileUrl } = await up.json();
        return fileUrl;
    };

    // ── Create ───────────────────────────────────────────────────
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFeedback(null);

        try {
            let fileUrl: string | null = null;
            if (file) fileUrl = await uploadFile(file);

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, bodyText, fileUrl, type }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Error al publicar.");
            }

            setFeedback({ ok: true, msg: "¡Publicación creada!" });
            setTitle(""); setBodyText(""); setFile(null);
            setType("announcement");
            if (fileRef.current) fileRef.current.value = "";
            loadPosts();
        } catch (err) {
            setFeedback({ ok: false, msg: err instanceof Error ? err.message : "Error desconocido." });
        } finally {
            setSubmitting(false);
        }
    };

    // ── Edit open ────────────────────────────────────────────────
    const openEdit = (p: Post) => {
        setEditId(p.id);
        setEditTitle(p.title);
        setEditBody(p.body ?? "");
        setEditType(p.type as "announcement" | "document");
        setEditFileUrl(p.fileUrl);
        setEditFile(null);
        if (editFileRef.current) editFileRef.current.value = "";
    };

    // ── Edit save ────────────────────────────────────────────────
    const handleEditSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!editId) return;
        setEditSaving(true);

        try {
            let fileUrl = editFileUrl;
            if (editFile) fileUrl = await uploadFile(editFile);

            const res = await fetch(`/api/posts/${editId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, bodyText: editBody, fileUrl, type: editType }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Error al guardar.");
            }

            setEditId(null);
            loadPosts();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error al guardar.");
        } finally {
            setEditSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar esta publicación?")) return;
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" });

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Top bar */}
            <header className="bg-[#0a2540] shadow-lg sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Image src="/logos/bihos-logo.png" alt="Bihospharma" width={36} height={36} className="rounded-full bg-white p-0.5 sm:w-[40px] sm:h-[40px]" />
                        <div>
                            <p className="text-white font-bold text-xs sm:text-sm leading-none">Panel de Administración</p>
                            <p className="text-[#94a3b8] text-[10px] sm:text-xs">Bihospharma IPS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/personal" className="text-[#b6d9f7] hover:text-white text-[10px] sm:text-xs transition">← Ver portal</Link>
                        <button onClick={() => signOut({ callbackUrl: "/personal/login" })} className="text-[#94a3b8] hover:text-white text-[10px] sm:text-xs transition">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid lg:grid-cols-2 gap-6 sm:gap-10 items-start">

                {/* ── CREATE FORM ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-bold text-[#0a2540] mb-5">Nueva publicación</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {(["announcement", "document"] as const).map((t) => (
                                <button key={t} type="button" onClick={() => setType(t)}
                                    className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition ${type === t ? "bg-[#0f4c8a] text-white border-[#0f4c8a]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0f4c8a]"}`}>
                                    {t === "announcement" ? "📢 Comunicado" : "📄 Documento"}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-[13px] sm:text-sm font-semibold text-gray-700 mb-1">Título *</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                                placeholder="Ej: Reglamento Interno 2025"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]" />
                        </div>

                        {type === "announcement" && (
                            <div>
                                <label className="block text-[13px] sm:text-sm font-semibold text-gray-700 mb-1">Contenido</label>
                                <textarea rows={4} value={bodyText} onChange={(e) => setBodyText(e.target.value)}
                                    placeholder="Escribe el comunicado aquí..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c8a] resize-none" />
                            </div>
                        )}

                        <div>
                            <label className="block text-[13px] sm:text-sm font-semibold text-gray-700 mb-1" htmlFor="fileUpload">
                                Adjuntar PDF o Imagen {type === "document" ? "*" : "(opcional)"}
                            </label>
                            <input id="fileUpload" ref={fileRef} type="file" accept={ACCEPTED}
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                required={type === "document"}
                                className="w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-3 file:py-1.5 file:px-2 sm:file:px-3 file:rounded-lg file:border-0 file:text-[10px] sm:file:text-xs file:font-semibold file:bg-[#0f4c8a] file:text-white hover:file:bg-[#0a2540] cursor-pointer" />
                            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Formatos aceptados: PDF, JPG, PNG, GIF, WEBP</p>
                        </div>

                        {feedback && (
                            <p className={`text-sm font-medium px-4 py-2 rounded-lg border ${feedback.ok ? "text-green-700 bg-green-50 border-green-200" : "text-red-700 bg-red-50 border-red-200"}`}>
                                {feedback.msg}
                            </p>
                        )}

                        <button type="submit" disabled={submitting}
                            className="w-full bg-[#0f4c8a] hover:bg-[#0a2540] text-white font-semibold py-2.5 rounded-lg transition text-sm shadow-md disabled:opacity-70">
                            {submitting ? "Publicando..." : "Publicar"}
                        </button>
                    </form>
                </div>

                {/* ── POSTS LIST ── */}
                <div>
                    <h2 className="text-base font-bold text-[#0a2540] mb-5">Publicaciones actuales</h2>
                    {posts.length === 0 ? (
                        <p className="text-gray-400 text-sm">No hay publicaciones aún.</p>
                    ) : (
                        <div className="space-y-3">
                            {posts.map((p) => (
                                <div key={p.id}>
                                    {editId === p.id ? (
                                        /* ── INLINE EDIT FORM ── */
                                        <div className="bg-white rounded-xl border border-[#0f4c8a] shadow-md p-4">
                                            <p className="text-xs font-bold text-[#0f4c8a] mb-3 uppercase tracking-wide">Editando publicación</p>
                                            <form onSubmit={handleEditSave} className="flex flex-col gap-3">
                                                <div className="flex gap-2">
                                                    {(["announcement", "document"] as const).map((t) => (
                                                        <button key={t} type="button" onClick={() => setEditType(t)}
                                                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${editType === t ? "bg-[#0f4c8a] text-white border-[#0f4c8a]" : "bg-white text-gray-500 border-gray-200"}`}>
                                                            {t === "announcement" ? "📢 Comunicado" : "📄 Documento"}
                                                        </button>
                                                    ))}
                                                </div>
                                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required
                                                    placeholder="Título" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]" />
                                                {editType === "announcement" && (
                                                    <textarea rows={3} value={editBody} onChange={(e) => setEditBody(e.target.value)}
                                                        placeholder="Contenido..."
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c8a] resize-none" />
                                                )}
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                                                        {editFileUrl ? "Reemplazar archivo (opcional)" : "Adjuntar PDF o Imagen"}
                                                    </label>
                                                    {editFileUrl && (
                                                        <div className="flex items-center gap-2 mb-2">
                                                            {isImage(editFileUrl)
                                                                ? <Image src={editFileUrl} alt="preview" width={60} height={60} className="rounded object-cover" unoptimized />
                                                                : <span className="text-xs text-[#0f4c8a]">📄 Archivo adjunto actual</span>
                                                            }
                                                            <button type="button" onClick={() => setEditFileUrl(null)}
                                                                className="text-red-400 text-xs hover:text-red-600">✕ Quitar</button>
                                                        </div>
                                                    )}
                                                    <input ref={editFileRef} type="file" accept={ACCEPTED}
                                                        onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                                                        className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-600 cursor-pointer" />
                                                    <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG, GIF, WEBP</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button type="submit" disabled={editSaving}
                                                        className="flex-1 bg-[#0f4c8a] hover:bg-[#0a2540] text-white text-xs font-semibold py-2 rounded-lg transition disabled:opacity-70">
                                                        {editSaving ? "Guardando..." : "Guardar cambios"}
                                                    </button>
                                                    <button type="button" onClick={() => setEditId(null)}
                                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition">
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        /* ── POST CARD ── */
                                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <span className="inline-block text-xs font-bold uppercase tracking-wide text-[#0f4c8a] mb-1">
                                                    {p.type === "document" ? "📄 Documento" : "📢 Comunicado"}
                                                </span>
                                                <p className="font-semibold text-[#0a2540] text-sm truncate">{p.title}</p>
                                                <p className="text-xs text-gray-400">{formatDate(p.createdAt)}</p>
                                                {p.fileUrl && (
                                                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                                                        📎 {isImage(p.fileUrl) ? "Imagen adjunta" : "PDF adjunto"}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                                                <button onClick={() => openEdit(p)}
                                                    className="text-[#0f4c8a] hover:text-[#0a2540] text-xs font-medium transition">
                                                    Editar
                                                </button>
                                                <button onClick={() => handleDelete(p.id)}
                                                    className="text-red-400 hover:text-red-600 text-xs font-medium transition">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
