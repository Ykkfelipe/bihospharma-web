import Image from 'next/image';

export const metadata = {
  title: 'Salud Mental y el Sueño | Bihospharma',
  description: 'Cómo el descanso impacta tu bienestar emocional y físico.',
};

export default function BlogPostSaludMentalSueno() {
  return (
    <>
      {/* HERO */}
      <section className="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '56vh',
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image src="/images/salud-mental-1.png" alt="Salud mental y el sueño" fill priority style={{ objectFit: 'cover' }} />
        {/* very light darkener so the navy text pops, like the PDF */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} />

        {/* Title directly over the image, centered, with layered drop-shadow to mimic the PDF outline */}
        <div style={{ position: 'relative', top: '18%' }}>
          <h1 className="heroTitle"
            style={{
              margin: 0,
              color: '#13294B',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              lineHeight: 1.15,
              fontWeight: 900,
              letterSpacing: '0.01em',
              textAlign: 'center',
              padding: '0 1rem',
              textShadow:
                '0 2px 0 rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.25), 0 10px 22px rgba(0,0,0,0.20)',
            }}
          >
            Salud Mental y el Sueño:
            <br />
            una relación vital para tu bienestar
          </h1>
        </div>
      </section>

      {/* Intro band with watermark (matches services style) */}
      <section className="intro" style={{ position: 'relative', backgroundColor: '#fff', padding: '2.5rem 1rem' }}>
        <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto' }}>
          <div style={{ maxWidth: 860 }}>
            <p style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif', fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', lineHeight: '1.95rem', color: '#1f1f1f', margin: 0, marginBottom: '1rem' }}>
              El sueño es mucho más que un período de descanso para el cerebro y el cuerpo; es un <strong>estado esencial</strong> que influye profundamente en nuestra <strong>salud mental y física</strong>. Durante el sueño, ocurren procesos críticos que ayudan al cerebro a consolidar la memoria y las emociones, a regular el estrés y el estado de ánimo, y a recuperarse de las actividades diarias.
            </p>
            <p style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif', fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', lineHeight: '1.95rem', color: '#1f1f1f', margin: 0 }}>
              La falta de sueño o un sueño de mala calidad puede desencadenar y agravar diferentes trastornos psicológicos.
            </p>
          </div>

          {/* rounded image under the paragraph like the PDF */}
          <div className="introImg" style={{ position: 'relative', marginTop: '1.25rem', width: 'min(720px, 100%)', height: 360, borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 26px rgba(0,0,0,0.12)' }}>
            <Image src="/images/salud-mental-2.png" alt="Bienestar y descanso" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* PAGE 3: Efectos del sueño en la salud mental (match PDF) */}
      <section className="effects" style={{ backgroundColor: '#ededf0', padding: '2.25rem 1rem 2.75rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 min(4vw, 54px)' }}>
          <div className="effectsGrid" style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 1.15fr) minmax(340px, 1fr)', gap: '2rem', alignItems: 'start' }}>
            {/* Left column: blue title + bullets */}
            <div>
              <h2 style={{
                margin: 0,
                marginBottom: '1rem',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.35rem)',
                fontWeight: 800,
                color: '#2EA0DF'
              }}>
                Efectos del sueño en la salud mental
              </h2>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '1.2rem',
                margin: 0,
                color: '#1d1d1f',
                fontSize: 'clamp(1.02rem, 1.8vw, 1.24rem)',
                lineHeight: '2.05rem'
              }}>
                <li>
                  <strong>Regulación emocional y del estado de ánimo:</strong> dormir bien ayuda a manejar las <strong>emociones</strong>, mejora el estado de ánimo y reduce la irritabilidad. La falta de sueño está directamente relacionada con mayor reactividad emocional y menor resiliencia.
                </li>
                <li>
                  <strong>Función cognitiva y toma de decisiones:</strong> la privación del sueño <strong>afecta la atención</strong>, la memoria y la capacidad de juicio, aumentando errores y accidentes.
                </li>
                <li>
                  <strong>Salud psicológica a largo plazo:</strong> dormir poco o mal se asocia con <strong>ansiedad y depresión</strong>. La relación es bidireccional: el mal sueño puede ser causa y síntoma de estos trastornos.
                </li>
              </ul>
            </div>

            {/* Right column: image with soft drop shadow */}
            <div className="effectsImg" style={{ position: 'relative', width: '100%', height: 380, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 36px rgba(0,0,0,0.18)' }}>
              <Image src="/images/salud-mental-3.png" alt="Ilustración salud mental" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: Hábitos para mejorar la calidad del sueño (match PDF) */}
      <section className="habits" style={{ backgroundColor: '#ffffff', padding: '2.25rem 1rem 2.75rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 min(4vw, 54px)' }}>
          <h2 style={{
            margin: 0,
            marginBottom: '1rem',
            fontSize: 'clamp(1.7rem, 3.2vw, 2.35rem)',
            fontWeight: 800,
            color: '#2EA0DF'
          }}>
            Hábitos para mejorar la calidad del sueño
          </h2>
          <ul style={{
            listStyle: 'disc',
            paddingLeft: '1.2rem',
            margin: 0,
            color: '#1d1d1f',
            fontSize: 'clamp(1.02rem, 1.8vw, 1.24rem)',
            lineHeight: '2.05rem'
          }}>
            <li><strong>Mantener horarios regulares:</strong> establecer rutinas de sueño ayuda a sincronizar el reloj biológico.</li>
            <li><strong>Optimizar el ambiente del dormitorio:</strong> evita ruidos y exceso de luz. Cortinas opacas o sonido blanco pueden ayudar.</li>
            <li><strong>Preparación antes de dormir:</strong> leer, meditar o tomar un baño caliente favorecen el descanso.</li>
            <li><strong>Cuidar el consumo de sustancias:</strong> reducir cafeína y alcohol en la noche mejora la calidad del sueño.</li>
            <li><strong>Actividad física:</strong> el ejercicio regular ayuda a dormir mejor, pero evita hacerlo justo antes de dormir.</li>
            <li><strong>Manejo del estrés y la ansiedad:</strong> técnicas como la respiración profunda o la relajación muscular favorecen la calma.</li>
            <li><strong>Uso adecuado de la cama:</strong> reservar la cama solo para dormir ayuda al cerebro a asociarla con descanso.</li>
            <li><strong>Consultar al profesional de la salud:</strong> ante problemas persistentes (insomnio, apnea, piernas inquietas), busca atención médica.</li>
          </ul>
        </div>
      </section>

      {/* PAGE 5: CTA section (match PDF) */}
      <section className="ctaGrid" style={{ backgroundColor: '#ededf0', padding: '2.5rem 1rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          {/* Left: image */}
          <div style={{ position: 'relative', width: '100%', height: 280, borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}>
            <Image src="/images/services.png" alt="Consulta médica" fill style={{ objectFit: 'cover' }} />
          </div>
          {/* Right: paragraph */}
          <div style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: '1.9rem', color: '#1d1d1f', fontFamily: 'Georgia, Cambria, Times New Roman, serif' }}>
            Dormir bien es un pilar de la salud mental. Cuidar la calidad del sueño no solo mejora el estado de ánimo y la concentración, sino que también previene problemas a largo plazo como la ansiedad y la depresión. Implementar hábitos saludables es clave para lograr un descanso reparador.
          </div>
        </div>
      </section>

      {/* Blue tagline band */}
      <section className="tagline" style={{ backgroundColor: '#1e9ee6', padding: '1.8rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', color: '#fff', lineHeight: '1.9rem' }}>
          En Bihospharma te acompañamos en el cuidado de tu bienestar integral. <strong>Agenda tu cita</strong> con nuestros profesionales de salud.
        </div>
      </section>

      {/* Centered CTA button (match services style) */}
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

    </>
  );
}
