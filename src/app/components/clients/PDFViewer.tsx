"use client";

// Placeholder client component to avoid importing react-pdf in builds.
// Estados pages now use PdfIframe for robust rendering and zero bundling issues.
export default function PdfViewer(props: { file: string; title?: string }) {
  return (
    <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
      Visor PDF deshabilitado en esta versión. Usa PdfIframe en las páginas.
    </div>
  );
}
