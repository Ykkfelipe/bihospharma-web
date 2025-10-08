import PdfIframe from "@/app/components/clients/PdfIframe";

export default function Page() {
  return (
    <main style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Estados Financieros 2022</h1>
      <PdfIframe file="/EEFF_DIC_2022.pdf" title="Estados Financieros 2022" />
    </main>
  );
}
