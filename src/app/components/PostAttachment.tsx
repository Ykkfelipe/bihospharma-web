"use client";

import Image from "next/image";

type PostAttachmentProps = {
    fileUrl: string;
    title?: string;
    isImage: (url: string) => boolean;
};

export function PostAttachment({ fileUrl, title, isImage }: PostAttachmentProps) {
    const isImg = isImage(fileUrl);

    if (isImg) {
        return (
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-black/5 flex justify-center w-full group">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full">
                    <Image
                        src={fileUrl}
                        alt="Imagen adjunta"
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover rounded-lg transition group-hover:opacity-95"
                        unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/10">
                        <span className="bg-white/90 text-[#0f4c8a] px-4 py-2 rounded-full text-xs font-bold shadow-lg">Ver pantalla completa ↗</span>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-md w-full bg-white">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    <div>
                        <p className="text-xs font-bold text-gray-700 leading-none">Vista previa del documento</p>
                        <p className="text-[10px] text-gray-500 mt-1">Haga clic en el botón para abrir en pantalla completa</p>
                    </div>
                </div>
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white bg-[#0f4c8a] px-4 py-2 rounded-lg font-bold hover:bg-[#0a2540] transition shadow-sm inline-flex items-center gap-2 text-center justify-center"
                >
                    📎 Ver documento adjunto ↗
                </a>
            </div>
            <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-[600px]">
                <iframe
                    src={`${fileUrl}#toolbar=0`}
                    className="w-full h-full border-0"
                    title={title || "Documento adjunto"}
                />
            </div>
        </div>
    );
}
