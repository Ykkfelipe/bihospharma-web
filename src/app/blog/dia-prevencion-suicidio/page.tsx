import Image from 'next/image';

export const metadata = {
  title: 'Día Internacional para la Prevención del Suicidio | Bihospharma',
  description:
    'Conciencia, señales de alerta, factores de riesgo y la importancia del apoyo en la prevención del suicidio.',
};

export default function BlogPostPrevencionSuicidio() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '56vh',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/prev1.png"
          alt="Día Internacional para la Prevención del Suicidio"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <h1
          style={{
            position: 'relative',
            color: '#fff',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '0.02em',
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.1,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            margin: 0,
            padding: '0 1rem',
          }}
        >
          Día Internacional para la<br />Prevención del Suicidio
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
              margin: '0 0 1.2rem',
              maxWidth: 980,
            }}
          >
            Cada 10 de septiembre, la Asociación Internacional para la Prevención del Suicidio (IASP)
            junto con la Organización Mundial de la Salud (OMS) conmemoran el Día Internacional para
            la Prevención del Suicidio, con el propósito de generar conciencia en todo el mundo sobre un
            hecho fundamental: el suicidio puede prevenirse.
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
            Según la OMS, casi un millón de personas mueren por suicidio cada año, lo que equivale a una
            vida perdida cada 40 segundos. Por cada muerte, se estima que ocurren al menos 20 intentos.
            Es además la segunda causa de muerte en jóvenes de 15 a 29 años, lo que lo convierte en un
            problema de salud pública de gran magnitud.
          </p>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <div
              style={{
                width: 'min(980px, 100%)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
              }}
            >
              <Image
                src="/images/prev2.png"
                alt="Conciencia y prevención del suicidio"
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FACTORES DE RIESGO (gris) */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            Factores de riesgo
          </h2>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
            El suicidio es un fenómeno complejo influenciado por múltiples factores: psicológicos, sociales,
            ambientales y biológicos. Algunos de los más comunes son:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.9rem', marginTop: '0.9rem' }}>
            <div>
              <p style={{ fontWeight: 700, margin: '0 0 0.3rem' }}>En niños y adolescentes:</p>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', margin: 0 }}>
                <li>Antecedentes psiquiátricos familiares, depresión, pérdida de un ser querido, aislamiento social, consumo de alcohol o drogas.</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: '0.6rem 0 0.3rem' }}>En adultos:</p>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', margin: 0 }}>
                <li>Problemas en las relaciones interpersonales, violencia doméstica, entornos familiares problemáticos, enfermedades mentales, abuso de sustancias.</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: '0.6rem 0 0.3rem' }}>En personas mayores:</p>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', margin: 0 }}>
                <li>Depresión, dolor físico crónico, enfermedades incapacitantes, aislamiento social y familiar.</li>
              </ul>
            </div>
          </div>

          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.9rem 0 0' }}>
            Cada persona vive una realidad distinta, por lo que la comprensión y el acompañamiento son
            esenciales para prevenir conductas suicidas.
          </p>
        </div>
      </section>

      {/* SEÑALES DE ALERTA */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            Señales de alerta
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                No siempre es fácil identificar si alguien piensa en el suicidio, pero existen comportamientos que
                pueden ser señales de advertencia:
              </p>
              <ul
                style={{
                  fontSize: '1.12rem',
                  lineHeight: 1.9,
                  color: '#0f172a',
                  paddingLeft: '1rem',
                  listStyleType: 'disc',
                  marginTop: '0.6rem',
                }}
              >
                <li>Hablar de querer morir o expresar frases como “quisiera no haber nacido”.</li>
                <li>Intentar conseguir medios para hacerse daño.</li>
                <li>Retraimiento y aislamiento extremo.</li>
                <li>Cambios repentinos de humor.</li>
                <li>Preocupación constante por la muerte.</li>
                <li>Sentimientos de desesperanza e impotencia.</li>
                <li>Consumo excesivo de alcohol o drogas.</li>
                <li>Conductas autodestructivas o imprudentes.</li>
                <li>Despedirse de familiares o amigos como si fuera definitivo.</li>
              </ul>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.6rem 0 0' }}>
                Reconocer estas señales puede marcar la diferencia y salvar una vida.
              </p>
            </div>
            <div
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
              }}
            >
              <Image
                src="/images/prev3.png"
                alt="Señales de alerta"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANCIA */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            La importancia de la prevención y el apoyo
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Cada vida perdida representa a un hijo, padre, madre, amigo o compañero que deja una huella
                imborrable en quienes lo rodean. La prevención del suicidio implica:
              </p>
              <ul
                style={{
                  fontSize: '1.12rem',
                  lineHeight: 1.9,
                  color: '#0f172a',
                  paddingLeft: '1rem',
                  listStyleType: 'disc',
                  marginTop: '0.6rem',
                }}
              >
                <li>Escuchar sin juzgar a quienes expresan dolor emocional.</li>
                <li>Buscar ayuda profesional en caso de sospecha o riesgo.</li>
                <li>Promover la salud mental desde la infancia y la adolescencia.</li>
                <li>Romper el estigma que rodea a las enfermedades mentales.</li>
              </ul>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.6rem 0 0' }}>
                En <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la promoción de la salud mental.
                Si tú o alguien cercano atraviesa una situación difícil, no dudes en buscar apoyo profesional.
                Estamos aquí para ayudarte.
              </p>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.6rem 0 0' }}>
                La prevención del suicidio es una responsabilidad compartida: de la familia, la comunidad, los
                profesionales de salud y la sociedad en general. Hablar abiertamente sobre la salud mental, brindar
                apoyo y acompañar a quienes lo necesitan es el primer paso hacia un mundo con menos pérdidas
                evitables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA AZUL */}
      <section style={{ background: '#1991eb', padding: '1.25rem 1rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p
            style={{
              margin: 0,
              color: '#ffffff',
              fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Agenda tu cita con nuestros especialistas y recibe acompañamiento integral para ti y tu familia.
          </p>
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
