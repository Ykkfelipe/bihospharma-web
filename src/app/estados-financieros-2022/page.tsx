import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/app/components/clients/PDFViewer'), { ssr: false });

export default function Page() {
  return (
    <main style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Estados Financieros 2022</h1>
      <PdfViewer file="/EEFF_DIC_2022.pdf" />
    </main>
  );
}