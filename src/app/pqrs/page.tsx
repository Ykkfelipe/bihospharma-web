import PQRSFormCard from './PQRSFormCard';

export const metadata = {
  title: 'PQRS | Bihospharma',
  description: 'Peticiones, Quejas, Reclamos, Sugerencias o Felicitación',
};

export default function PQRSPage() {
  return (
    <main className="flex min-h-[60vh] justify-center bg-[#e8f4fc] px-4 py-10 sm:px-6 sm:py-14">
      <PQRSFormCard />
    </main>
  );
}
