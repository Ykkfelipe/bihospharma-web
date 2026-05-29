import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/app/components/PageHero';
import SiteContactSection from '@/app/components/SiteContactSection';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce la misión, visión y valores de Bihospharma IPS. Compañía colombiana orientada al manejo clínico ambulatorio y soluciones integrales en salud.',
  openGraph: {
    title: 'Nosotros | Bihospharma',
    description: 'Misión, visión y valores corporativos de Bihospharma IPS.',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        src="/images/medic-hd.png"
        alt="Atención médica global Bihospharma"
        title="NOSOTROS"
        heightClass="h-[300px] min-h-[240px] md:h-[400px] lg:h-[480px]"
      />

      <section className="section-container py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <Image
            src="/images/thumbs-up.png"
            alt="Equipo médico"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
            className="h-auto w-full rounded-2xl object-cover shadow-md"
          />
          <div>
            <h2 className="mb-6 text-3xl font-bold text-[#1C2B4E] md:text-4xl">QUIENES SOMOS</h2>
            <p className="prose-content text-lg">
              Somos una compañía Colombiana orientada al manejo clínico ambulatorio de servicios de baja, mediana y
              alta complejidad; especializada en enfermedades de Alto Costo y en el suministro de productos
              farmacéuticos y hospitalarios.
            </p>
            <Link href="/services" className="btn-primary mt-8">
              VER SERVICIOS
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container pb-12 sm:pb-16">
        <div className="flex flex-col overflow-hidden rounded-2xl shadow-md md:flex-row">
          <div className="flex w-full flex-col justify-center bg-white p-6 sm:p-8 md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-[#1C2B4E] md:text-4xl">¿A qué contribuimos?</h2>
            <p className="prose-content mb-6 text-lg">
              Formación de Redes Integrales con modelos de gestión del riesgo como eje transversal en la prestación de
              servicios de salud. Somos una organización funcional que:
            </p>
            <Image
              src="/images/hospitality.png"
              alt="Gestión en salud"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center bg-[#48a4dc] p-8 text-white md:w-1/2 md:p-10">
            <ul className="list-disc space-y-4 pl-5 text-lg">
              <li>Fomenta la calidad del servicio</li>
              <li>Reduce los costos y gastos médicos</li>
              <li>Asegura resultados concretos y evaluables</li>
              <li>Visualiza el Bienestar como calidad de vida para el paciente</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-container py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-[#1C2B4E] md:text-4xl">Misión</h2>
            <p className="prose-content text-lg">
              Nuestra compañía tiene el firme compromiso de brindar a nuestros clientes y pacientes Soluciones
              Integrales en el sector salud. Con la calidez y eficacia necesaria: contamos con una gama amplia de
              profesionales capacitados para brindar una atención personalizada con los más altos estándares de calidad
              y entregando los mejores indicadores de servicio y economía.
            </p>
          </div>
          <Image
            src="/images/team-hands.png"
            alt="Equipo unido"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
            className="h-auto w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="section-container pb-12 sm:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="md:order-2">
            <h2 className="mb-6 text-3xl font-bold text-[#1C2B4E] md:text-4xl">Visión</h2>
            <p className="prose-content text-lg">
              Nos proyectamos para el 2027 como una compañía de servicios médicos y farmacéuticos importantes en la
              administración del riesgo y su intervención oportuna, reconocida por las empresas administradoras de planes
              de beneficios y aseguradoras para Colombia, trabajamos como una compañía que brinda solución en la
              optimización de recursos, con resultados positivos acordes con las necesidades actuales del Sistema de
              Salud.
            </p>
          </div>
          <div className="md:order-1">
            <Image
              src="/images/team-hands.png"
              alt="Equipo colaborativo"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="h-auto w-full rounded-2xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#3CA5DA] px-4 py-12 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">Valores Corporativos</h2>
          <div className="grid grid-cols-2 justify-items-center gap-8 md:grid-cols-4">
            {[
              { label: 'LEALTAD', img: '/images/lealtad.png' },
              { label: 'OPORTUNIDAD', img: '/images/oportunidad.png' },
              { label: 'DIFERENCIA', img: '/images/diferencia.png' },
              { label: 'EXCELENCIA', img: '/images/excelencia.png' },
              { label: 'RESPONSABILIDAD', img: '/images/responsabilidad.png' },
              { label: 'PUNTUALIDAD', img: '/images/puntualidad.png' },
              { label: 'TRANSPARENCIA', img: '/images/transparencia.png' },
            ].map((valor) => (
              <div key={valor.label} className="flex flex-col items-center">
                <div className="rounded-full bg-[#1C2B4E] p-[6px]">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-[6px] border-[#79C3EA] md:h-32 md:w-32">
                    <Image
                      src={valor.img}
                      alt={valor.label}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <span
                  className={`mt-4 rounded-full px-3 py-1 text-sm font-semibold ${
                    ['LEALTAD', 'DIFERENCIA', 'EXCELENCIA', 'PUNTUALIDAD'].includes(valor.label)
                      ? 'bg-[#1C2B4E] text-white'
                      : 'bg-[#79C3EA] text-[#1C2B4E]'
                  }`}
                >
                  {valor.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteContactSection />
    </>
  );
}
