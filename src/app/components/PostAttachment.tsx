"use client";

type PostAttachmentProps = {
    fileUrl: string;
    title?: string;
    isImage: (url: string) => boolean;
};

export function PostAttachment({ fileUrl, title, isImage }: PostAttachmentProps) {
    const isImg = isImage(fileUrl);
    const fileName = decodeURIComponent(fileUrl.split('/').pop()?.split('?')[0] || title || "Documento adjunto");
    const isVideo = (url: string) => {
        const ext = url.split('.').pop()?.toLowerCase();
        return ["mp4", "webm", "ogg", "mov"].includes(ext || "");
    };

    if (isImg) {
        return (
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-black/5 flex justify-center w-full max-w-[300px] mx-auto group">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={fileUrl}
                        alt="Imagen adjunta"
                        className="w-full h-auto max-h-[350px] object-contain rounded-lg transition group-hover:opacity-95 mx-auto"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/10">
                        <span className="bg-white/90 text-[#0f4c8a] px-4 py-2 rounded-full text-[10px] font-bold shadow-lg">Ver pantalla completa ↗</span>
                    </div>
                </a>
            </div>
        );
    }

    if (isVideo(fileUrl)) {
        return (
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-black flex justify-center w-full max-w-[500px] mx-auto group">
                <video
                    src={fileUrl}
                    controls
                    className="w-full h-auto max-h-[400px] rounded-lg"
                >
                    Su navegador no soporta el elemento de video.
                </video>
            </div>
        );
    }

    return (
        <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-document-link"
        >
            <span className="portal-document-link-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h5" />
                </svg>
            </span>
            <span className="portal-document-link-copy">
                <span className="portal-document-link-title">{title || "Documento adjunto"}</span>
                <span className="portal-document-link-meta">{fileName} - Abrir documento</span>
            </span>
            <span className="portal-document-link-action">Ver</span>
        </a>
    );
}
