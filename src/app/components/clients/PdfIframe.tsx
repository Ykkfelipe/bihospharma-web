"use client";
import React from "react";

type Props = {
  file: string;
  title?: string;
};

export default function PdfIframe({ file, title }: Props) {
  const [page, setPage] = React.useState(1);
  const [zoom, setZoom] = React.useState(100); // percent

  const src = `${file}#page=${page}&zoom=${zoom}`;

  const zoomIn = () => setZoom(z => Math.min(z + 25, 300));
  const zoomOut = () => setZoom(z => Math.max(z - 25, 50));
  const next = () => setPage(p => p + 1);
  const prev = () => setPage(p => Math.max(1, p - 1));

  return (
    <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ width: '100%', maxWidth: 960, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={prev} aria-label="Previous page" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}>Prev</button>
            <div style={{ minWidth: 90, textAlign: 'center', color: '#374151' }}>Page {page}</div>
            <button onClick={next} aria-label="Next page" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}>Next</button>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={zoomOut} aria-label="Zoom out" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}>−</button>
            <div style={{ width: 56, textAlign: 'center', color: '#374151' }}>{zoom}%</div>
            <button onClick={zoomIn} aria-label="Zoom in" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}>+</button>
            <a href={file} download style={{ marginLeft: 8, color: '#1f78c0', textDecoration: 'none', fontWeight: 700 }}>Descargar</a>
            <a href={file} target="_blank" rel="noopener noreferrer" style={{ color: '#1f78c0', textDecoration: 'none' }}>Abrir</a>
          </div>
        </div>
        <iframe src={src} title={title || 'PDF Document'} style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }} />
      </div>
    </div>
  );
}
