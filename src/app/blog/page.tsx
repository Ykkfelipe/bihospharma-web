"use client"

import Image from 'next/image';
import Link from 'next/link';


export default function BlogIndexPage() {
  return (
    <div style={{
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '1rem',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          minHeight: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image src="/images/psicologia-banner.png" alt="Blog" fill priority style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        <h1 style={{ position: 'relative', color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '0.25rem', fontWeight: 900, textAlign: 'center', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>BLOG</h1>
      </section>

      {/* Cards grid */}
      <section style={{ padding: 'clamp(1rem, 2vw, 2rem) 1rem', backgroundColor: '#ffffff' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/sueno2.png" alt="Salud mental y el sueño" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Salud Mental y el Sueño: una relación vital para tu bienestar
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional. Descubre cómo mejorar tu descanso y proteger tu bienestar mental.
              </p>
              <Link href="/blog/salud-mental-sueno" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full font-semibold no-underline">
                Leer más
              </Link>
            </div>
          </article>

          {/* ¿Migraña o dolores de cabeza? */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/migrana1.png" alt="¿Migraña o dolores de cabeza?" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                ¿Migraña o dolores de cabeza?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Aprende a diferenciar migraña de otros tipos de cefalea, identifica señales de alerta y conoce cuándo consultar a un especialista para un manejo adecuado.
              </p>
              <Link href="/blog/migrana-dolores-cabeza" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full font-semibold no-underline">
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Mundial de la Fibrosis Quística */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/fibrosis.png" alt="Día Mundial de la Fibrosis Quística" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Día Mundial de la Fibrosis Quística
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística, una jornada para visibilizar esta enfermedad crónica, apoyar a las familias y promover la prevención y el diagnóstico temprano.
              </p>
              <Link href="/blog/dia-mundial-fibrosis-quistica" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full font-semibold no-underline">
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Internacional para la Prevención del Suicidio */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/suicidio-prevencion.jpg" alt="Día Internacional para la Prevención del Suicidio" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Día Internacional para la Prevención del Suicidio
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cada 10 de septiembre se busca crear conciencia y adoptar medidas para reducir los índices de suicidio, apoyando a quienes atraviesan momentos difíciles.
              </p>
              <Link href="/blog/dia-prevencion-suicidio" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full font-semibold no-underline">
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Mundial del Linfoma */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/linfoma.jpg" alt="Día Mundial del Linfoma" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Día Mundial del Linfoma
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Una fecha dedicada a generar conciencia sobre el linfoma, su detección temprana y la importancia del tratamiento oportuno para mejorar la calidad de vida de los pacientes.
              </p>
              <Link href="/blog/dia-mundial-linfoma" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full font-semibold no-underline">
                Leer más
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
