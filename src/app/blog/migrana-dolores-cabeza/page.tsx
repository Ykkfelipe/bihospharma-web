import Image from 'next/image';

export const metadata = {
  title: '¿Migraña o dolores de cabeza? | Bihospharma',
  description:
    'Conoce las diferencias entre una migraña y otros tipos de cefalea, sus síntomas, el aura y cuándo consultar.',
};

export default function BlogPostMigranaODolores() {
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
          src="/images/migrana1.png"
          alt="¿Migraña o dolores de cabeza?"
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
          ¿Migraña o dolores de<br />cabeza?
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
              margin: '0 0 1.5rem',
              maxWidth: 980,
            }}
          >
            El <strong>dolor de cabeza</strong> es una de las molestias más comunes en la población. Sin
            embargo, no todos los dolores son iguales: mientras algunas cefaleas son pasajeras
            y se alivian con descanso, otras como la <strong>migraña</strong> pueden llegar a ser incapacitantes.
            Conocer las diferencias entre una <strong>migraña</strong> y otros tipos de dolor de cabeza es clave
            para recibir el tratamiento adecuado.
          </p>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 'min(980px, 100%)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
              }}
            >
              <Image
                src="/images/migrana2.png"
                alt="Dolor de cabeza"
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ¿QUÉ ES LA MIGRAÑA? (gris) */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              color: '#1e88e5',
              fontWeight: 900,
              fontSize: 'clamp(1.35rem, 3vw, 2rem)',
              margin: '0 0 1rem',
            }}
          >
            ¿Qué es la migraña?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                background: '#fff',
              }}
            >
              <Image
                src="/images/migrana3.png"
                alt="Persona con migraña"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                La <strong>migraña</strong> es un tipo de dolor de cabeza recurrente y crónico que suele tener
                estas características:
              </p>
              <ul
                style={{
                  fontSize: '1.12rem',
                  lineHeight: 1.9,
                  color: '#0f172a',
                  paddingLeft: '1rem',
                  listStyleType: 'disc',
                  marginTop: '0.5rem',
                }}
              >
                <li>Dolor unilateral (afecta un solo lado de la cabeza).</li>
                <li>Dolor pulsátil, de intensidad moderada a severa.</li>
                <li>Intolerancia a las actividades cotidianas.</li>
                <li>Puede estar acompañada de náuseas, vómitos o sensibilidad a la luz y al ruido.</li>
              </ul>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Para el diagnóstico clínico, no es necesario presentar todos los síntomas: basta con
                cumplir al menos dos de los cuatro principales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MIGRAÑA CON AURA VS SIN AURA */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              color: '#1e88e5',
              fontWeight: 900,
              fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
              margin: '0 0 1rem',
            }}
          >
            Migraña con aura vs. migraña sin aura
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: '1.25rem',
              alignItems: 'center',
            }}
          >
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                En algunos casos, la migraña se presenta con <strong>aura</strong>, un conjunto de alteraciones
                visuales que preceden o acompañan al dolor de cabeza.
              </p>
              <ul
                style={{
                  fontSize: '1.12rem',
                  lineHeight: 1.9,
                  color: '#0f172a',
                  paddingLeft: '1rem',
                  listStyleType: 'disc',
                  marginTop: '0.5rem',
                }}
              >
                <li>
                  El aura puede manifestarse como destellos de luz, zonas brillantes en forma de “C”
                  o incluso una pérdida temporal de la visión.
                </li>
                <li>
                  Estos síntomas visuales suelen aparecer de manera progresiva y durar entre 5 minutos
                  y 1 hora.
                </li>
              </ul>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Cuando no aparecen estas alteraciones, se considera <strong>migraña sin aura</strong>.
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
                src="/images/migrana4.png"
                alt="Migraña con aura"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* OTROS TIPOS (gris) */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              color: '#1e88e5',
              fontWeight: 900,
              fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
              margin: '0 0 1rem',
            }}
          >
            Otros tipos de dolores de cabeza
          </h2>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
            Además de la migraña, existen otros tipos de cefaleas, siendo la más frecuente la
            <strong> cefalea tensional</strong>. Características de la cefalea tensional:
          </p>
          <ul
            style={{
              fontSize: '1.12rem',
              lineHeight: 1.9,
              color: '#0f172a',
              paddingLeft: '1rem',
              listStyleType: 'disc',
              marginTop: '0.5rem',
            }}
          >
            <li>Dolor o presión constante en ambos lados de la cabeza.</li>
            <li>Sensación de “cabeza en un torno”, como si algo la comprimiera.</li>
            <li>Dolor leve a moderado, no incapacitante.</li>
            <li>Puede acompañarse de tensión muscular en cuello y hombros.</li>
            <li>
              En ocasiones presenta sensibilidad a la luz o al sonido, pero sin náuseas, vómitos ni aura
              visual.
            </li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
            Las cefaleas tensionales abarcan casi todos los dolores de cabeza que no cumplen criterios
            de migraña.
          </p>
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
            En <strong>Bihospharma</strong> contamos con profesionales dispuestos a acompañarte
            en el cuidado de tu salud. Si sufres de migrañas o dolores de cabeza frecuentes,
            agenda tu cita y recibe la atención que necesitas.
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
            <p style={{ margin: '0 0 1rem' }}>PBX 3103158806 Opc1 - 3232347791</p>

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
