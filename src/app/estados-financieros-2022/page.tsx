"use client";
import PdfIframe from "@/app/components/clients/PdfIframe";

export default function Estados2022() {
  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', color: '#1a1a1a' }}>
        <span style={{ display: 'block' }}>Estados</span>
        <span style={{ display: 'block' }}>Financieros 2022</span>
      </h1>
      <PdfIframe file="/EEFF_DIC_2022.pdf" title="Estados Financieros 2022" />
    </div>
  );
}
