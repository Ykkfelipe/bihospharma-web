"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type Post = {
    id: string;
    title: string;
    body: string | null;
    fileUrl: string | null;
    type: string;
    createdAt: string;
};

export default function PersonalPage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const role = (session?.user as { role?: string })?.role;

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

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const isImage = (url: string | null) => {
        if (!url) return false;
        const ext = url.split('.').pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "");
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Top bar */}
            <header className="bg-[#0a2540] shadow-lg sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Image src="/logos/bihos-logo.png" alt="Bihospharma" width={36} height={36} className="rounded-full bg-white p-0.5 sm:w-[40px] sm:h-[40px]" />
                        <div>
                            <p className="text-white font-bold text-xs sm:text-sm leading-none">Acceso Corporativo</p>
                            <p className="text-[#94a3b8] text-[10px] sm:text-xs">Bihospharma IPS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-[#b6d9f7] text-xs sm:text-sm hidden sm:block">
                            {session?.user?.name ?? session?.user?.email}
                        </span>
                        {role === "admin" && (
                            <Link
                                href="/personal/admin"
                                className="bg-[#0f4c8a] hover:bg-[#1d6fbf] text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition"
                            >
                                Administrar
                            </Link>
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/personal/login" })}
                            className="text-[#94a3b8] hover:text-white text-[10px] sm:text-xs transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {loading ? (
                    <div className="text-center py-20 text-gray-400 text-sm">Cargando contenido...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-3xl sm:text-4xl mb-4">📋</p>
                        <p className="font-medium text-sm sm:text-base">No hay publicaciones aún.</p>
                    </div>
                ) : (
                    <div className="space-y-10 sm:space-y-12">
                        {/* Announcements */}
                        {announcements.length > 0 && (
                            <section>
                                <h2 className="text-base sm:text-lg font-bold text-[#0a2540] mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="text-xl sm:text-2xl">📢</span> Comunicados
                                </h2>
                                <div className="space-y-4">
                                    {announcements.map((post) => (
                                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 break-words">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                                                <div className="flex-1 min-w-0 w-full">
                                                    <h3 className="font-bold text-[#0a2540] text-sm sm:text-base mb-2">{post.title}</h3>
                                                    {post.body && (
                                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
                                                    )}
                                                    {post.fileUrl && isImage(post.fileUrl) && (
                                                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex justify-center w-full">
                                                            <Image
                                                                src={post.fileUrl}
                                                                alt="Imagen adjunta"
                                                                width={800}
                                                                height={600}
                                                                className="object-contain max-h-[400px] sm:max-h-[600px] w-full h-auto rounded-lg"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    )}
                                                    {post.fileUrl && !isImage(post.fileUrl) && (
                                                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full">
                                                            <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                                <span className="text-[10px] sm:text-xs font-semibold text-gray-500">📄 Documento adjunto</span>
                                                                <a
                                                                    href={post.fileUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[10px] sm:text-xs text-[#0f4c8a] font-semibold hover:underline inline-flex items-center gap-1 bg-white border border-[#0f4c8a]/20 px-3 py-1 rounded-md sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 w-max"
                                                                >
                                                                    Abrir / Descargar ↗
                                                                </a>
                                                            </div>
                                                            <iframe
                                                                src={post.fileUrl}
                                                                className="w-full hidden sm:block border-0"
                                                                style={{ height: "500px" }}
                                                                title="Documento adjunto"
                                                            />
                                                            <div className="sm:hidden p-4 text-center bg-gray-50 text-xs text-gray-500">
                                                                Presiona &quot;Abrir / Descargar&quot; para ver el documento en tu dispositivo.
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{formatDate(post.createdAt)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Documents */}
                        {documents.length > 0 && (
                            <section>
                                <h2 className="text-base sm:text-lg font-bold text-[#0a2540] mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="text-xl sm:text-2xl">📁</span> Documentos y Reglamentación
                                </h2>
                                <div className="space-y-4">
                                    {documents.map((post) => (
                                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 break-words">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 mb-3">
                                                <div className="flex-1 min-w-0 w-full">
                                                    <h3 className="font-bold text-[#0a2540] text-sm sm:text-base">{post.title}</h3>
                                                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{formatDate(post.createdAt)}</p>
                                                </div>
                                            </div>
                                            {post.fileUrl && isImage(post.fileUrl) && (
                                                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex justify-center w-full">
                                                    <Image
                                                        src={post.fileUrl}
                                                        alt="Imagen adjunta"
                                                        width={800}
                                                        height={600}
                                                        className="object-contain max-h-[400px] sm:max-h-[600px] w-full h-auto rounded-lg"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                            {post.fileUrl && !isImage(post.fileUrl) && (
                                                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full">
                                                    <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <span className="text-[10px] sm:text-xs font-semibold text-gray-500">📄 Documento adjunto</span>
                                                        <a
                                                            href={post.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] sm:text-xs text-[#0f4c8a] font-semibold hover:underline inline-flex items-center gap-1 bg-white border border-[#0f4c8a]/20 px-3 py-1 rounded-md sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 w-max"
                                                        >
                                                            Abrir / Descargar ↗
                                                        </a>
                                                    </div>
                                                    <iframe
                                                        src={post.fileUrl}
                                                        className="w-full hidden sm:block border-0"
                                                        style={{ height: "500px" }}
                                                        title={post.title}
                                                    />
                                                    <div className="sm:hidden p-4 text-center bg-gray-50 text-xs text-gray-500">
                                                        Presiona &quot;Abrir / Descargar&quot; para ver el documento en tu dispositivo.
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
