import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import SiteContactSection from '@/app/components/SiteContactSection';
import { SERVICE_CARDS } from './servicesData';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Consulta externa, medicina general, laboral, psicología, nutrición, fisioterapia y más. Conoce los servicios de Bihospharma IPS.',
  openGraph: {
    title: 'Servicios | Bihospharma',
    description:
      'Consulta externa y programas de atención en salud en Yopal y Bogotá.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        src="/images/servicios-banner.png"
        alt="Servicios de salud Bihospharma"
        title="SERVICIOS"
        heightClass="h-[45vh] min-h-[240px] sm:min-h-[300px] md:min-h-[360px]"
      />

      <section className="bg-[#48a4dc] px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Consulta Externa
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ title, lines, image, slug }) => (
            <Link
              key={slug}
              href={slug}
              className="group relative block h-44 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-48"
            >
              <Image
                src={`/images/${image}`}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-3 text-center text-white">
                <span className="text-sm font-bold leading-tight drop-shadow sm:text-base">
                  {title}
                  {lines?.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                <span className="rounded-full bg-[#48a4dc] px-4 py-1.5 text-xs font-semibold shadow sm:text-sm">
                  VER MÁS
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteContactSection />
    </>
  );
}
