import Image from 'next/image';

export const metadata = {
  title: 'Día Mundial de la Salud Mental | Bihospharma',
  description: 'Día Mundial de la Salud Mental: cuidar la mente también es cuidar la vida. Recursos, datos y consejos para proteger el bienestar emocional.',
};

export default function DiaMundialSaludMental() {
  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      <section style={{ marginBottom: '2rem' }}>
        {/* HERO with image + overlayed title box */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '520px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#f3f4f6',
          boxShadow: '0 2px 24px rgba(0,0,0,0.08)'
        }}>
          <Image
            src="/images/mental.png"
            alt="Día Mundial de la Salud Mental"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: '0% center',
              filter: 'brightness(0.96)'
            }}
            priority
          />

          {/* Overlay Title (inside the image) */}
          <div style={{
            position: 'absolute',
            right: '4%',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '560px',
            padding: '0',
            textAlign: 'left',
            background: 'rgba(255,255,255,0.0)'
          }}>
            <h1 className="hero-title" style={{
              margin: 0,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#0f1d36',
              fontSize: 'clamp(1.6rem, 4.6vw, 3.2rem)',
              textShadow: `
                0.5px 0.5px 0 rgba(17,24,39,0.85),
                2px 2px 0 rgba(17,24,39,0.55),
                4px 4px 0 rgba(17,24,39,0.25)
              `
            }}>
              <span style={{ display: 'block' }}>Día Mundial de la Salud Mental:</span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}>cuidar la mente también es</span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}>cuidar la vida</span>
            </h1>
          </div>
          {/* Mobile safe padding to avoid overlapping with left arm */}
          <style>{`
            @media (max-width: 1024px) {
              .hero-title { font-size: 2rem !important; max-width: 520px; }
            }
            @media (max-width: 820px) {
              .hero-title { font-size: 1.5rem !important; line-height: 1.12 !important; }
            }
            @media (min-width: 1280px) {
              /* give more right margin on very wide screens */
              .hero-title { max-width: 640px; }
            }
          `}</style>
        </div>
      </section>

      {/* First Content Section */}
      <section style={{ color: '#111827', lineHeight: 1.75, fontSize: '1.08rem', marginTop: '1rem' }}>
        <p style={{ margin: 0 }}>
          Cada 10 de octubre se celebra el <strong>Día Mundial de la Salud Mental</strong>,
          una fecha que busca crear conciencia sobre la importancia del <strong>bienestar emocional</strong> y
          movilizar esfuerzos para <strong>apoyar la salud mental a nivel global</strong>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          El lema de este año es <strong>“Es tiempo de priorizar la salud mental en el lugar de trabajo”</strong>,
          un recordatorio de que la estabilidad emocional es clave en todos los ámbitos de la vida.
        </p>
      </section>

      {/* Second Content Section */}
      <section style={{ marginTop: '2.25rem', color: '#111827', lineHeight: 1.8, fontSize: '1.15rem' }}>
        <h2 style={{
          color: '#1991eb',
          fontSize: 'clamp(1.6rem,3.2vw,2.1rem)',
          fontWeight: 900,
          margin: 0,
          marginBottom: '0.9rem',
          letterSpacing: '-0.01em'
        }}>
          La salud mental desde la infancia y la adolescencia.
        </h2>
        <p style={{ margin: 0 }}>
          La infancia y la adolescencia son etapas críticas para el desarrollo del cerebro y la salud mental.
          Según la <strong>Organización Panamericana de la Salud (OPS, 2023)</strong>, las experiencias tempranas
          influyen profundamente en la vida adulta, pudiendo determinar la trayectoria emocional y social de una persona.
        </p>
      </section>

      {/* Data + Tips Intro with image right */}
      <section style={{
        marginTop: '2rem',
        padding: '1.25rem',
        background: '#e5e7eb40',
        borderRadius: 12,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            <p style={{ marginTop: 0 }}>
              Actualmente, <strong>la depresión y la ansiedad</strong> se encuentran entre las <strong>cinco principales causas de discapacidad</strong> en este grupo de edad, mientras que <strong>el suicidio es la tercera causa de muerte</strong> entre los jóvenes de 15 a 29 años.
            </p>
            <p>
              Estos datos reflejan la urgencia de fortalecer la prevención, el acompañamiento emocional y la búsqueda de ayuda profesional.
            </p>

            <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.6rem,3.2vw,2.1rem)', margin: '1rem 0 0.75rem' }}>
              Cómo puedes cuidar tu salud mental
            </h2>
            <p style={{ margin: 0 }}>
              El bienestar emocional se cultiva día a día a través de hábitos saludables, relaciones sanas y atención consciente a nuestras emociones. Aquí te compartimos algunas estrategias para fortalecer tu salud mental:
            </p>
          </div>

          <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 36vw, 360px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 26px rgba(0,0,0,0.08)' }}>
            <Image src="/images/mental2.png" alt="Hábitos para la salud mental" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* Back to Blog removed per request */}
      
      {/* Tips list with watermark logo and image on right */}
      <section style={{ position: 'relative', marginTop: '2rem' }}>
        {/* Watermark logo using Next Image for consistency - larger and centered like PDF */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06 }}>
          <div style={{ position: 'relative', width: '60%', maxWidth: 760, height: '70%' }}>
            <Image src="/images/bihospharma-logo-banner.png" alt="Bihospharma logo" fill style={{ objectFit: 'contain', filter: 'grayscale(100%)' }} />
          </div>
        </div>

        {/* Two-column layout: flexible text + fixed right column for the image (desktop). On mobile it stacks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2rem', alignItems: 'start' }}>
          <div style={{ fontSize: '1.18rem', lineHeight: 2.05, color: '#111827' }}>
            <p style={{ marginTop: 0 }}>
              Hablar de lo que sentimos es el primer paso para cuidar la salud mental. Normalizar el diálogo sobre las emociones reduce estigmas y alivia el peso emocional.
            </p>
            <ul style={{ margin: '0.6rem 0 0 1.25rem', paddingLeft: 0, listStyle: 'disc' }}>
              <li style={{ marginBottom: '0.55rem' }}>Busca una red de apoyo, comparte lo que sientes y, si lo necesitas, acude a un profesional.</li>
              <li style={{ marginBottom: '0.55rem' }}>La flexibilidad mental ayuda a enfrentar los cambios con serenidad.</li>
              <li style={{ marginBottom: '0.55rem' }}>Aprende a ver los problemas desde nuevas perspectivas y acepta que la vida está en constante movimiento.</li>
              <li style={{ marginBottom: '0.55rem' }}>Vivir el presente mejora el bienestar emocional.</li>
              <li style={{ marginBottom: '0.55rem' }}>Practica la atención plena (mindfulness), desconéctate de la tecnología y realiza tus actividades con conciencia.</li>
              <li style={{ marginBottom: '0.55rem' }}>La escritura también puede sanar.</li>
              <li style={{ marginBottom: '0.55rem' }}>Expresar lo que sientes en un diario te ayuda a liberar emociones y entenderte mejor.</li>
            </ul>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: 12, overflow: 'hidden', boxShadow: '0 18px 40px rgba(0,0,0,0.12)', justifySelf: 'end' }}>
            <Image src="/images/mental3.png" alt="Consejos salud mental" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
        {/* responsive tweak: when viewport narrow, stack and make image full width */}
        <style>{`
          @media (max-width: 980px) {
            section[style*="position: relative"][style*="marginTop: '2rem'"] > div:nth-of-type(2) {
              grid-template-columns: 1fr !important;
            }
            section[style*="position: relative"][style*="marginTop: '2rem'"] img { object-position: center !important; }
          }
        `}</style>
      </section>
      {/* CTA Grid */}

      {/* Habits card (PDF page 5 style, no image) */}
      <section className="habitsCard" style={{ background: '#ffffff', padding: '0 1rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: '#ebedef', borderRadius: 16, padding: '2rem 1.75rem 1.5rem 1.75rem' }}>
            <h2
              style={{
                color: '#1991eb',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                fontSize: 'clamp(1.7rem,3.4vw,2.4rem)',
                margin: 0,
                marginBottom: '1rem',
              }}
            >
              Hábitos para fortalecer tu bienestar
            </h2>

            <ul className="habitos-list" style={{ margin: 0, paddingLeft: '1.75rem', listStyle: 'disc' }}>
              <li>
                <strong>El humor es una gran medicina.</strong>
                <div>Reír, rodearte de personas alegres y ver el lado positivo de las cosas reduce tensiones.</div>
              </li>
              <li>
                <strong>Dormir bien es esencial.</strong>
                <div>Mantén una rutina de descanso, evita pantallas antes de dormir y crea un ambiente tranquilo.</div>
              </li>
              <li>
                <strong>La incertidumbre forma parte de la vida.</strong>
                <div>Aceptar lo que no puedes controlar te permite crecer y mantener la calma.</div>
              </li>
              <li>
                <strong>Cultiva pasiones que te inspiren.</strong>
                <div>Dedica tiempo a lo que amas y compártelo con los demás.</div>
              </li>
              <li>
                <strong>Y, sobre todo, vive con propósito.</strong>
                <div>Define tus valores, establece metas y busca generar bienestar a tu alrededor.</div>
              </li>
            </ul>
          </div>
        </div>

        {/* PDF-like list spacing and big markers */}
        <style>{`
          .habitos-list { font-size: clamp(1.12rem, 1.9vw, 1.36rem); line-height: 2.05; color: #111827; }
          .habitos-list li { margin: 0.55rem 0; }
          .habitos-list li::marker { font-size: 1.55em; }
          @media (max-width: 820px) {
            .habitos-list { line-height: 1.9; font-size: 1.15rem; }
          }
        `}</style>
      </section>

      {/* Blue tagline band */}
      <section className="tagline" style={{ backgroundColor: '#1e9ee6', padding: '1.8rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', color: '#fff', lineHeight: '1.9rem' }}>
          <span className="tagline-line">En <strong>Bihospharma</strong>, reafirmamos nuestro compromiso con la <strong>salud mental</strong></span>
          <span className="tagline-line">y el bienestar emocional de nuestros usuarios.</span>
        </div>
      </section>
      <style>{`
        .tagline .tagline-line { display: inline; }
        @media (min-width: 900px) { .tagline .tagline-line { display: block; } }
      `}</style>

      {/* Centered CTA button */}
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
                <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)' }}>AGENDA TU CITA</span>
          </a>
        </div>
      </section>

      {/* Contact block (like services pages) */}
      <section className="contact" style={{ position: 'relative', background: '#ffffff', padding: '3rem 1rem' }}>
        <div style={{ position: 'absolute', right: 0, bottom: -30, width: 320, height: 320, opacity: 0.12, pointerEvents: 'none' }}>
          <Image src="/images/bihospharma-logo-banner.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Left: Contact info */}
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

          {/* Right: addresses */}
          <div style={{ fontSize: '1.05rem', color: '#1d1d1f', lineHeight: '1.8rem' }}>
            <p style={{ margin: '0.2rem 0' }}><strong>YOPAL (CASANARE)</strong><br />Tranversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
            <p style={{ margin: '0.6rem 0 0' }}><strong>BOGOTÁ D.C</strong><br />Cra 25 No 4A-14</p>
          </div>
        </div>
      </section>
    </main>
  );
}
