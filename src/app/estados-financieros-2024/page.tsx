"use client";
import PdfIframe from "@/app/components/clients/PdfIframe";

export default function Estados2024() {
  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '1.25rem', color: '#1a1a1a' }}>
        Estados
        <br />
        Financieros 2024
      </h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: 64, height: 4, background: '#0F1A2A', borderRadius: 2 }} />
        <div style={{ width: 32, height: 4, background: '#1f78c0', borderRadius: 2 }} />
      </div>
      <PdfIframe file="/EEFF_DIC_2024.pdf" title="Estados Financieros 2024" />
    </div>
  );
}
