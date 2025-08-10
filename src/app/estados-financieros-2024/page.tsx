'use client';

import dynamic from 'next/dynamic';
const PDFViewer = dynamic(() => import('@/app/components/clients/PDFViewer'), { ssr: false });

export default function Page() {
  return <PDFViewer file="/pdfs/estados-financieros-2024.pdf" />;
}