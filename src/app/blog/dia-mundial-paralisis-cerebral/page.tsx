import Image from 'next/image';

export const metadata = {
  title: 'Día Mundial de la Parálisis Cerebral | Bihospharma',
  description:
    'Inclusión, esperanza y resiliencia: visibilizamos la parálisis cerebral, sus apoyos, terapias y el compromiso con la inclusión.',
};

export default function BlogPostParalisisCerebral() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(300px, 52vh, 520px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}
      >
        <Image src="/images/paralisis1.png" alt="Día Mundial de la Parálisis Cerebral" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.36)' }} />
        <h1 style={{ position: 'relative', color: '#fff', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, textAlign: 'left', padding: '0 1rem', zIndex: 2, textShadow: '0 6px 18px rgba(0,0,0,0.5)', maxWidth: 1100, width: '100%' }}>
          Día Mundial de la Parálisis Cerebral:
          <br />
          inclusión, esperanza y resiliencia
        </h1>
      </section>
      {/* INTRO */}
      <section style={{ background: '#fff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              lineHeight: 1.9,
              color: '#101214',
              margin: '0 0 0.9rem',
              maxWidth: 980,
            }}
          >
            Cada 7 de octubre se conmemora el <strong>Día Mundial de la Parálisis Cerebral</strong>, una fecha que busca visibilizar y <strong>apoyar a las personas que viven con esta condición</strong>, así como reconocer la labor de sus familias y cuidadores.
          </p>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              lineHeight: 1.9,
              color: '#101214',
              margin: 0,
              maxWidth: 980,
            }}
          >
            El color verde representa esta causa, simbolizando el crecimiento, la esperanza y la resiliencia de toda la comunidad con parálisis cerebral.
          </p>
        </div>
      </section>

      
      
      
      {/* ¿QUÉ ES? */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              color: '#1991eb',
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3.6vw, 2.4rem)',
              margin: '0 0 1rem'
            }}
          >
            ¿Qué es la Parálisis Cerebral?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
              La Parálisis Cerebral (PC), también conocida como Parálisis Cerebral Infantil, es un conjunto de trastornos neuromotores crónicos que se originan por una lesión o alteración en el desarrollo del cerebro inmaduro.
            </p>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
              Para que pueda hablarse de parálisis cerebral, la lesión debe ocurrir entre los primeros días de gestación y los 3 a 5 años de vida, una etapa clave en el desarrollo del sistema nervioso.
            </p>
          </div>
        </div>
      </section>

      {/* CAUSAS Y FACTORES DE RIESGO */}
      <section style={{ background: '#f9fafb', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.45rem)', lineHeight: 1.85, color: '#0f172a', margin: '0 0 0.9rem' }}>
            El término “Parálisis” se refiere a la debilidad o dificultad en el uso de los músculos, manifestada en alteraciones del movimiento, el tono muscular y la postura.
          </p>
          <p style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.45rem)', lineHeight: 1.85, color: '#0f172a', margin: '0 0 1.2rem' }}>
            Por su parte, el término “Cerebral” destaca que la causa radica en una lesión en las áreas motoras del cerebro, responsables del control del movimiento y la coordinación.
          </p>
          <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.4vw, 2.3rem)', margin: '0 0 1rem' }}>
            Causas y factores de riesgo
          </h2>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1rem' }}>
            La PC puede desarrollarse:
          </p>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
            <li><strong>Antes del nacimiento</strong>, debido a factores prenatales como infecciones maternas o alteraciones genéticas.</li>
            <li><strong>Durante el parto</strong>, por falta de oxígeno en el cerebro (anoxia), bajo peso al nacer o complicaciones obstétricas.</li>
            <li><strong>Después del nacimiento</strong>, por traumatismos, infecciones o episodios de anoxia en los primeros años de vida.</li>
          </ul>
        </div>
      </section>

      {/* SÍNTOMAS ASOCIADOS */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1rem' }}>
              Además de las limitaciones motoras, pueden presentarse otros síntomas asociados, como:
            </p>
            <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li>Dificultades en la comunicación y el lenguaje.</li>
              <li>Alteraciones cognitivas.</li>
              <li>Problemas sensoriales.</li>
              <li>Crisis convulsivas o epilepsia.</li>
            </ul>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 'auto', minHeight: 300 }}>
            <Image
              src="/images/paralisis2.png"
              alt="Persona en silla de ruedas sosteniendo un balón de baloncesto"
              width={550}
              height={370}
              style={{ objectFit: 'cover', borderRadius: 8, width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* AUTOCUIDADO Y BIENESTAR PERSONAL */}
      <section style={{ background: '#f9fafb', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.4vw, 2.3rem)', margin: '0 0 1.4rem' }}>
            Autocuidado y bienestar personal
          </h2>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
            <li><strong>Concienciar</strong></li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1rem' }}>
            Informar a la sociedad sobre la parálisis cerebral, una de las discapacidades infantiles más comunes en el mundo, y promover la empatía hacia quienes la viven.
          </p>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
            <li><strong>Promover la inclusión</strong></li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1rem' }}>
            Fomentar entornos accesibles y equitativos que permitan la participación activa de las personas con parálisis cerebral en la educación, el trabajo y la comunidad.
          </p>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
            <li><strong>Asegurar derechos</strong></li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1rem' }}>
            Garantizar el acceso a servicios médicos, educativos y sociales que aseguren el bienestar y la igualdad de oportunidades.
          </p>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
            <li><strong>Celebrar la fuerza</strong></li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
            Reconocer los logros, la determinación y el potencial de las personas con parálisis cerebral, así como el acompañamiento fundamental de sus familias, terapeutas y cuidadores.
          </p>
        </div>
      </section>

      {/* Compromiso (franja azul) */}
      <section style={{ background: '#1991eb', color: '#ffffff', padding: '2.25rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.4rem)', lineHeight: 1.8, margin: 0 }}>
            Desde <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la atención integral,
            la inclusión y la sensibilización social.
          </p>
          <p style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.4rem)', lineHeight: 1.8, margin: '0.35rem 0 0' }}>
            Creemos que cada persona merece un entorno accesible, lleno de oportunidades para crecer,
            aprender y vivir con dignidad.
          </p>
        </div>
      </section>

      {/* Centered CTA button (match other posts) */}
      <section className="ctaButton" style={{ background: '#ffffff', padding: '1.5rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(180deg, #2EA0DF 0%, #1c82c3 100%)',
              color: '#ffffff',
              padding: '0.95rem 1.8rem',
              borderRadius: 9999,
              fontWeight: 800,
              letterSpacing: '0.02em',
              fontSize: 'clamp(0.98rem, 1.9vw, 1.25rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              boxShadow: '0 8px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.4)',
              border: '3px solid #ffffff'
            }}
          >
            <span aria-hidden style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: 9999,
              border: '2px solid #ffffff',
              background: 'rgba(255,255,255,0.18)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36 .1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)' }}>AGENDA TU CITA</span>
          </a>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact" style={{ position: 'relative', background: '#ffffff', padding: '3rem 1rem' }}>
        <div style={{ position: 'absolute', right: 0, bottom: -30, width: 320, height: 320, opacity: 0.12, pointerEvents: 'none' }}>
          <Image src="/images/bihospharma-logo-banner.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          <div style={{ fontSize: '1.05rem', color: '#1d1d1f', lineHeight: '1.8rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '2rem', fontWeight: 800 }}>Contacto</h2>
            <p style={{ margin: '0 0 0.25rem' }}>info@bihospharma.com</p>
            <p style={{ margin: '0 0 1rem' }}>www.bihospharma.com</p>

            <p style={{ margin: '0 0 0.25rem', fontWeight: 700 }}>TELÉFONO</p>
            <p style={{ margin: '0 0 1rem' }}>320 316 5870 - 350 2151683</p>

            <p style={{ margin: '0 0 0.5rem', fontWeight: 700 }}>SÍGUENOS:</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer"><Image src="/logos/instagram.png" alt="Instagram" width={30} height={30} /></a>
              <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer"><Image src="/logos/facebook.png" alt="Facebook" width={30} height={30} /></a>
              <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer"><Image src="/logos/linkedin.png" alt="LinkedIn" width={30} height={30} /></a>
              <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer"><Image src="/logos/x.png" alt="X" width={30} height={30} /></a>
            </div>
          </div>

          <div style={{ fontSize: '1.05rem', color: '#1d1d1f', lineHeight: '1.8rem' }}>
            <p style={{ margin: '0.2rem 0' }}>
              <strong>YOPAL (CASANARE)</strong><br />
              Tranversal 18 #7-05 Piso 5<br />
              Edificio Mont Black
            </p>
            <p style={{ margin: '0.6rem 0 0' }}>
              <strong>BOGOTÁ D.C</strong><br />
              Cra 25 No 4A-14
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
