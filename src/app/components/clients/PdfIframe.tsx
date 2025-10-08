"use client";

import Image from 'next/image';

type Props = {
  file: string;
  title?: string;
};

export default function PdfIframe({ file, title }: Props) {
  return (
    <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 960, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        <iframe
          src={file}
          title={title || 'PDF Document'}
          style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }}
        />
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href={file} download style={{ background: '#1f78c0', color: '#fff', padding: '0.6rem 1rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Descargar PDF</a>
        <a href={file} target="_blank" rel="noopener noreferrer" style={{ color: '#1f78c0' }}>Abrir en nueva pestaña</a>
      </div>
    </div>
  );
}
