"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{
        fontSize: "2.25rem",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "2.5rem",
        color: "#1a1a1a",
        letterSpacing: "-0.5px",
        position: "relative",
        paddingBottom: "1.5rem"
      }}>
        <span style={{ display: "block" }}>Estados</span>
        <span style={{ display: "block" }}>Financieros 2023</span>
        <span style={{
          position: "absolute",
          left: "50%",
          bottom: "0.5rem",
          transform: "translateX(-50%)",
          width: "120px",
          height: "4px",
          backgroundColor: "#1a1a1a",
          borderRadius: "2px"
        }} />
        <span style={{
          position: "absolute",
          left: "50%",
          bottom: "0rem",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          backgroundColor: "#1f78c0",
          borderRadius: "2px"
        }} />
      </h1>
      <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Document file="/EEFF_DIC_2024.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={Math.min(windowWidth - 32, 600)} />
        </Document>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
            Previous
          </button>
          <span style={{ margin: "0 1rem" }}>Page {pageNumber} of {numPages}</span>
          <button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))} disabled={pageNumber >= (numPages || 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}