import PQRSFormCard from './PQRSFormCard';

export const metadata = {
  title: 'PQRS | Bihospharma',
  description: 'Peticiones, Quejas, Reclamos, Sugerencias o Felicitación',
};

export default function PQRSPage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', padding: '3rem 1rem', background: '#eef3f9' }}>
      <PQRSFormCard />
    </main>
  );
}
