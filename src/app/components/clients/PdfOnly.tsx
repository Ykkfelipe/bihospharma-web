 'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import type { DocumentProps, PageProps } from 'react-pdf';

export default function PdfOnly() {
  const [DocumentComp, setDocumentComp] = useState<ComponentType<DocumentProps> | null>(null);
  const [PageComp, setPageComp] = useState<ComponentType<PageProps> | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await import('react-pdf/dist/Page/AnnotationLayer.css');
        await import('react-pdf/dist/Page/TextLayer.css');
      } catch (_e) {}
      const mod = await import('react-pdf');
      try {
        const v = mod?.pdfjs?.version || '4.10.38';
        if (mod?.pdfjs?.GlobalWorkerOptions) {
          mod.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${v}/pdf.worker.min.js`;
        }
      } catch (_e) {}
      if (!mounted) return;
      setDocumentComp(() => mod.Document);
      setPageComp(() => mod.Page);
    })();

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  if (!DocumentComp || !PageComp) {
    return <div style={{ width: Math.min(windowWidth - 32, 600), height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando visor de PDF...</div>;
  }

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <DocumentComp file="/EEFF_DIC_2024.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <PageComp pageNumber={pageNumber} width={Math.min(windowWidth - 32, 600)} />
      </DocumentComp>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {pageNumber} of {numPages}</span>
        <button onClick={() => setPageNumber(p => Math.min(p + 1, numPages || 1))} disabled={pageNumber >= (numPages || 1)}>Next</button>
      </div>
    </div>
  );
}