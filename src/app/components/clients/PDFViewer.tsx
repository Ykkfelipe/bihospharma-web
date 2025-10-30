"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Avoid importing react-pdf types server-side; define minimal local types
type DocumentProps = { file: string | File | Uint8Array; onLoadSuccess?: (info: { numPages: number }) => void; children?: React.ReactNode };
type PageProps = { pageNumber: number; width?: number; renderTextLayer?: boolean; renderAnnotationLayer?: boolean };
// Avoid importing react-pdf default CSS that may affect layout.
// We'll keep rendering clean without text/annotation layers to prevent overlays
// that can look like duplicated pages.

// Dynamically import react-pdf components client-side only
// Use loose any typing for the dynamically-loaded components so JSX children
// are accepted without conflicting with the minimal local types above.
const Document = dynamic(() => import("react-pdf").then(m => m.Document), { ssr: false, loading: () => null }) as unknown as React.ComponentType<any>;
const Page = dynamic(() => import("react-pdf").then(m => m.Page), { ssr: false, loading: () => null }) as unknown as React.ComponentType<any>;

type Props = {
  file: string;
  title?: string;
  mode?: 'single' | 'book';
};

export default function PdfViewer({ file, title }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    // configure pdfjs worker to use local copy in /public
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod: any = await import('react-pdf');
        if (mod?.pdfjs?.GlobalWorkerOptions) {
          // Prefer local worker shipped in public/
          mod.pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
        }
      } catch (e) {
        // ignore and continue
        console.warn('Could not configure pdfjs worker', e);
      } finally {
        setPdfReady(true);
      }
    })();

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const pageCount = numPages || 1;

  // Single-page layout only
  const pagesToShow = [pageNumber];

  // Responsive page width: keep margins on small screens and limit max width
  const horizontalPadding = 48; // keep consistent frame to avoid nested card illusion
  const availableWidth = Math.max(320, windowWidth - horizontalPadding);
  // Match card maxWidth below to avoid visual double frame
  const maxCardWidth = 900;
  const pageWidth = Math.min(availableWidth, maxCardWidth);

  const next = () => setPageNumber(prev => Math.min(prev + 1, pageCount));
  const prev = () => setPageNumber(prev => Math.max(prev - 1, 1));

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', width: '100%', maxWidth: maxCardWidth }}>
          {pdfReady ? (
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, paddingTop: 8 }}>
                {pagesToShow.map(p => (
                  <div key={p} style={{ background: '#fff', display: 'flex', justifyContent: 'center' }}>
                    <Page pageNumber={p} width={pageWidth} renderTextLayer={false} renderAnnotationLayer={false} />
                  </div>
                ))}
              </div>
            </Document>
          ) : (
            <div style={{ width: Math.min(windowWidth - 32, 600), height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Cargando visor de PDF...
            </div>
          )}

              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0.5rem 0' }}>
            <div style={{ flex: '0 0 120px', textAlign: 'left' }}>
              <button onClick={prev} disabled={pageNumber <= 1} aria-label="Previous page" style={{ background: 'transparent', border: 'none', color: pageNumber <= 1 ? '#9ca3af' : '#2563eb', cursor: pageNumber <= 1 ? 'default' : 'pointer', fontSize: 14 }}>Previous</button>
            </div>

            <div style={{ flex: '1 1 auto', textAlign: 'center', fontSize: 14, color: '#374151' }}>
              <span>Page {pageNumber} of {numPages || '...'}</span>
            </div>

            <div style={{ flex: '0 0 120px', textAlign: 'right' }}>
              <button onClick={next} disabled={pageNumber >= (numPages || 1)} aria-label="Next page" style={{ background: 'transparent', border: 'none', color: pageNumber >= (numPages || 1) ? '#9ca3af' : '#2563eb', cursor: pageNumber >= (numPages || 1) ? 'default' : 'pointer', fontSize: 14 }}>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
