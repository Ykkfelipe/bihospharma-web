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
        <main className="min-h-screen bg-gray-50">
            {/* Top bar */}
            <header className="bg-[#0a2540] shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/logos/bihos-logo.png" alt="Bihospharma" width={40} height={40} className="rounded-full bg-white p-0.5" />
                        <div>
                            <p className="text-white font-bold text-sm leading-none">Acceso Corporativo</p>
                            <p className="text-[#94a3b8] text-xs">Bihospharma IPS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#b6d9f7] text-sm hidden md:block">
                            {session?.user?.name ?? session?.user?.email}
                        </span>
                        {role === "admin" && (
                            <Link
                                href="/personal/admin"
                                className="bg-[#0f4c8a] hover:bg-[#1d6fbf] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                            >
                                Administrar
                            </Link>
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/personal/login" })}
                            className="text-[#94a3b8] hover:text-white text-xs transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Cargando contenido...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-4xl mb-4">📋</p>
                        <p className="font-medium">No hay publicaciones aún.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Announcements */}
                        {announcements.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-[#0a2540] mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📢</span> Comunicados
                                </h2>
                                <div className="space-y-4">
                                    {announcements.map((post) => (
                                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#0a2540] text-base mb-2">{post.title}</h3>
                                                    {post.body && (
                                                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
                                                    )}
                                                    {post.fileUrl && isImage(post.fileUrl) && (
                                                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex justify-center">
                                                            <Image
                                                                src={post.fileUrl}
                                                                alt="Imagen adjunta"
                                                                width={800}
                                                                height={600}
                                                                className="object-contain max-h-[600px] w-auto h-auto rounded-lg"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    )}
                                                    {post.fileUrl && !isImage(post.fileUrl) && (
                                                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                                                                <span className="text-xs font-semibold text-gray-500">📄 Documento adjunto</span>
                                                                <a
                                                                    href={post.fileUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-[#0f4c8a] font-semibold hover:underline"
                                                                >
                                                                    Abrir en nueva pestaña ↗
                                                                </a>
                                                            </div>
                                                            <iframe
                                                                src={post.fileUrl}
                                                                className="w-full"
                                                                style={{ height: "500px" }}
                                                                title="Documento adjunto"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(post.createdAt)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Documents */}
                        {documents.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-[#0a2540] mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📁</span> Documentos y Reglamentación
                                </h2>
                                <div className="space-y-4">
                                    {documents.map((post) => (
                                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#0a2540] text-base">{post.title}</h3>
                                                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(post.createdAt)}</p>
                                                </div>
                                            </div>
                                            {post.fileUrl && isImage(post.fileUrl) && (
                                                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex justify-center">
                                                    <Image
                                                        src={post.fileUrl}
                                                        alt="Imagen adjunta"
                                                        width={800}
                                                        height={600}
                                                        className="object-contain max-h-[600px] w-auto h-auto rounded-lg"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                            {post.fileUrl && !isImage(post.fileUrl) && (
                                                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-gray-500">📄 Documento adjunto</span>
                                                        <a
                                                            href={post.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-[#0f4c8a] font-semibold hover:underline"
                                                        >
                                                            Abrir en nueva pestaña ↗
                                                        </a>
                                                    </div>
                                                    <iframe
                                                        src={post.fileUrl}
                                                        className="w-full"
                                                        style={{ height: "500px" }}
                                                        title={post.title}
                                                    />
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
