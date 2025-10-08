'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import type { DocumentProps, PageProps } from 'react-pdf';

type PdfViewerProps = {
  file: string;
  width?: number;
};

export default function PdfViewer({ file, width = 900 }: PdfViewerProps) {
  const [DocumentComp, setDocumentComp] = useState<ComponentType<DocumentProps> | null>(null);
  const [PageComp, setPageComp] = useState<ComponentType<PageProps> | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // dynamically import the CSS and react-pdf on client only
      try {
        await import('react-pdf/dist/Page/AnnotationLayer.css');
        await import('react-pdf/dist/Page/TextLayer.css');
      } catch (_e) {
        // ignore if css can't be loaded
      }

      const mod = await import('react-pdf');
      // configure worker dynamically (use the version bundled)
      try {
        const v = mod?.pdfjs?.version || '4.10.38';
        if (mod?.pdfjs?.GlobalWorkerOptions) {
          mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${v}/build/pdf.worker.min.mjs`;
        }
      } catch (_e) {
        // ignore
      }

      if (!mounted) return;
      setDocumentComp(() => mod.Document as ComponentType<DocumentProps>);
      setPageComp(() => mod.Page as ComponentType<PageProps>);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!DocumentComp || !PageComp) {
    return <div style={{ width: Math.min(width, 900), height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando visor de PDF...</div>;
  }

  return (
    <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
      <DocumentComp file={file} onLoadSuccess={handleLoadSuccess}>
        {Array.from({ length: numPages }, (_, i) => (
          <PageComp key={i} pageNumber={i + 1} width={width} />
        ))}
      </DocumentComp>
    </div>
  );
}