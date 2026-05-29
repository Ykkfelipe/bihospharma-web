import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos para más información sobre nuestros servicios de salud. Formulario de contacto, sedes en Yopal y Bogotá.',
  openGraph: {
    title: 'Contacto | Bihospharma',
    description: 'Escríbenos y nuestro equipo se comunicará contigo lo antes posible.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
