'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Use the browser ESM entry to avoid node-canvas
const Document = dynamic(
  () => import('react-pdf/dist/esm/entry.webpack').then(m => m.Document),
  { ssr: false, loading: () => null }
);
const Page = dynamic(
  () => import('react-pdf/dist/esm/entry.webpack').then(m => m.Page),
  { ssr: false, loading: () => null }
);

export default function PdfViewer({ file, width = 900 }: { file: string; width?: number }) {
  const [numPages, setNumPages] = useState<number>(0);

  // Set the worker at runtime from the same browser entry
  useEffect(() => {
    (async () => {
      const { pdfjs } = await import('react-pdf/dist/esm/entry.webpack');
      pdfjs.GlobalWorkerOptions.workerSrc =
        `//unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;
    })();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
      <Document
        file={file}
        onLoadSuccess={(doc: { numPages: number }) => setNumPages(doc.numPages)}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page key={i} pageNumber={i + 1} width={width} />
        ))}
      </Document>
    </div>
  );
}
