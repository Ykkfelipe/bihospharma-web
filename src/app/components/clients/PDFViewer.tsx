'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// match your installed pdfjs-dist version
pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;
type PdfViewerProps = {
  file: string;
  width?: number;
};

export default function PdfViewer({ file, width = 900 }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        {Array.from({ length: numPages }, (_, i) => (
          <Page key={i} pageNumber={i + 1} width={width} />
        ))}
      </Document>
    </div>
  );
}