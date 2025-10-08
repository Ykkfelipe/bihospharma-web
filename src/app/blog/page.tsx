"use client"

import Image from 'next/image';
import Link from 'next/link';


export default function BlogIndexPage() {
  const btn = "inline-flex items-center justify-center bg-gradient-to-b from-[#2EA0DF] to-[#1c82c3] text-white px-5 py-2.5 rounded-full font-extrabold tracking-wide shadow-md hover:shadow-lg transition border-2 border-white no-underline";
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
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/sueno2.png" alt="Salud mental y el sueño" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">
                Salud Mental y el Sueño: una relación vital para tu bienestar
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional. Descubre cómo mejorar tu descanso y proteger tu bienestar mental.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/salud-mental-sueno" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Síndrome de Burnout */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/burnout-card.png" alt="Síndrome de Burnout" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">
                Síndrome de Burnout: cuando el trabajo se vuelve agotador
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                El agotamiento laboral crónico que afecta la energía, la motivación y el desempeño. Conoce causas, síntomas y estrategias para prevenir y manejar el burnout.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* ¿Migraña o dolores de cabeza? */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/migrana1.png" alt="¿Migraña o dolores de cabeza?" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">
                ¿Migraña o dolores de cabeza?
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Aprende a diferenciar migraña de otros tipos de cefalea, identifica señales de alerta y conoce cuándo consultar a un especialista para un manejo adecuado.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/migrana-dolores-cabeza" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Mundial de la Fibrosis Quística */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/fibrosis.png" alt="Día Mundial de la Fibrosis Quística" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">
                Día Mundial de la Fibrosis Quística
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística, una jornada para visibilizar esta enfermedad crónica, apoyar a las familias y promover la prevención y el diagnóstico temprano.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-mundial-fibrosis-quistica" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Internacional para la Prevención del Suicidio */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/prev1.png" alt="Día Internacional para la Prevención del Suicidio" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">
                Día Internacional para la Prevención del Suicidio
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Cada 10 de septiembre se busca crear conciencia y adoptar medidas para reducir los índices de suicidio, apoyando a quienes atraviesan momentos difíciles.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-prevencion-suicidio" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Mundial del Linfoma */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/linfoma-banner.png" alt="Día Mundial del Linfoma" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">Día Mundial del Linfoma</h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Una fecha dedicada a generar conciencia sobre el linfoma, su detección temprana y la importancia del tratamiento oportuno para mejorar la calidad de vida de los pacientes.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-mundial-linfoma" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Mundial del Corazón */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/corazon1.png" alt="Día Mundial del Corazón" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">Día Mundial del Corazón</h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Desde el año 2000, la Federación Mundial del Corazón, con el apoyo de la OMS, conmemora cada 29 de septiembre el Día Mundial del Corazón. Esta fecha busca crear conciencia sobre las enfermedades cardiovasculares, su prevención, control y tratamiento.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-mundial-corazon" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Mundial de la Parálisis Cerebral */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/general-banner2.png" alt="Día Mundial de la Parálisis Cerebral" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">Día Mundial de la Parálisis Cerebral</h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Inclusión, esperanza y resiliencia: visibilizamos la parálisis cerebral, sus apoyos, terapias y el compromiso con la inclusión.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-mundial-paralisis-cerebral" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>

          {/* Día Mundial de los Cuidados Paliativos */}
          <article className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src="/images/cuidados-card.png" alt="Día Mundial de los Cuidados Paliativos" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-bold text-gray-800">Día Mundial de los Cuidados Paliativos: cumplir la promesa del acceso universal</h2>
              <p className="text-gray-700 leading-relaxed mt-2 mb-4">
                Los cuidados paliativos son un derecho. Conoce por qué es crucial garantizar su acceso universal y cómo podemos contribuir desde la comunidad y las políticas públicas.
              </p>
              <div className="mt-auto pt-2">
                <Link href="/blog/dia-mundial-cuidados-paliativos" className={btn}>Leer más</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
