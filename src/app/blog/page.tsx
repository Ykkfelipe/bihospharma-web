import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Bihospharma',
  description: 'Artículos y consejos de bienestar y salud.',
};

export default function BlogIndexPage() {
  return (
    <>
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
      <section style={{ padding: '2rem 1rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/sueno2.png" alt="Salud mental y el sueño" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                Salud Mental y el Sueño: una relación vital para tu bienestar
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional. Descubre cómo mejorar tu descanso y proteger tu bienestar mental.
              </p>
              <Link href="/blog/salud-mental-sueno" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>

          {/* ¿Migraña o dolores de cabeza? */}
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/migrana1.png" alt="¿Migraña o dolores de cabeza?" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                ¿Migraña o dolores de cabeza?
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Aprende a diferenciar migraña de otros tipos de cefalea, identifica señales de alerta y conoce cuándo consultar a un especialista para un manejo adecuado.
              </p>
              <Link href="/blog/migrana-dolores-cabeza" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Mundial de la Fibrosis Quística */}
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/fibrosis.png" alt="Día Mundial de la Fibrosis Quística" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                Día Mundial de la Fibrosis Quística
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística, una jornada para visibilizar esta enfermedad crónica, apoyar a las familias y promover la prevención y el diagnóstico temprano.
              </p>
              <Link href="/blog/dia-mundial-fibrosis-quistica" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Internacional para la Prevención del Suicidio */}
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/prev1.png" alt="Día Internacional para la Prevención del Suicidio" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                Día Internacional para la Prevención del Suicidio
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Cada 10 de septiembre se busca crear conciencia y adoptar medidas para reducir los índices de suicidio, apoyando a quienes atraviesan momentos difíciles.
              </p>
              <Link href="/blog/dia-prevencion-suicidio" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Mundial del Linfoma */}
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/linfoma-banner.png" alt="Día Mundial del Linfoma" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                Día Mundial del Linfoma
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Una fecha dedicada a generar conciencia sobre el linfoma, su detección temprana y la importancia del tratamiento oportuno para mejorar la calidad de vida de los pacientes.
              </p>
              <Link href="/blog/dia-mundial-linfoma" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>

          {/* Día Mundial del Corazón */}
          <article style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', width: '100%', height: 180 }}>
              <Image src="/images/corazon1.png" alt="Día Mundial del Corazón" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem 1rem 1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: '0 0 0.5rem' }}>
                Día Mundial del Corazón
              </h2>
              <p style={{ color: '#374151', lineHeight: 1.7, margin: '0 0 0.9rem' }}>
                Desde el año 2000, la Federación Mundial del Corazón, con el apoyo de la OMS, conmemora cada 29 de septiembre el Día Mundial del Corazón. Esta fecha busca crear conciencia sobre las enfermedades cardiovasculares, su prevención, control y tratamiento.
              </p>
              <Link href="/blog/dia-mundial-corazon" style={{ display: 'inline-block', background: '#1e88e5', color: '#fff', padding: '0.55rem 1rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Leer más
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
