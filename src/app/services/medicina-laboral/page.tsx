import Image from 'next/image';

export const metadata = {
  title: 'Medicina Laboral | Bihospharma',
  description:
    'Exámenes ocupacionales y evaluaciones médicas laborales con enfoque en prevención y cumplimiento normativo.',
};

export default function MedicinaLaboralPage() {
  return (
    <>
      {/* HERO */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          backgroundImage: 'url("/images/banner-laboral.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* dark overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
          }}
        />
        <h1
          style={{
            color: 'white',
            fontSize: 'clamp(2rem, 6vw, 4.25rem)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textAlign: 'center',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            zIndex: 1,
            margin: 0,
          }}
        >
          Medicina Laboral
          <br />
          Exámenes Ocupacionales
        </h1>
      </div>

      {/* INTRO PARAGRAPH WITH DIVIDERS + WATERMARK */}
      <section
        style={{
          padding: '2.5rem 1rem',
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            position: 'relative',
            textAlign: 'center',
          }}
        >

          {/* watermark */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Image
              src="/images/bihospharma-logo-banner.png"
              alt="Bihospharma Logo Background"
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                opacity: 0.18,
                transform: 'scale(0.9)',
              }}
            />
          </div>

          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              lineHeight: '2.15rem',
              fontWeight: 500,
              color: '#1a2233',
              maxWidth: '70ch',
              margin: '0 auto',
            }}
          >
            En Bihospharma S.A.S, ofrecemos un servicio integral de Medicina Laboral, enfocado en la prevención, diagnóstico y control de riesgos ocupacionales. Nuestro objetivo es garantizar el bienestar de los trabajadores y el cumplimiento de las normativas de salud laboral en las empresas.
          </p>

        </div>
      </section>

      {/* SERVICES WHITE SECTION */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '3rem 1rem',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ flex: '1 1 420px', maxWidth: 560 }}>
          <Image
            src="/images/laboral-2.png"
            alt="Medicina Laboral"
            width={560}
            height={380}
            style={{
              borderRadius: 18,
              width: '100%',
              height: 'auto',
              boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
            }}
            priority
          />
        </div>
        <div style={{ flex: '1 1 420px', maxWidth: 560 }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: '#2196f3',
              fontWeight: 800,
              margin: 0,
              marginBottom: '1rem',
            }}
          >
            ¿Qué es la Medicina Laboral?
          </h2>
          <p
            style={{
              fontSize: '1.07rem',
              lineHeight: 1.8,
              color: '#1f1f1f',
              marginBottom: '0.9rem',
            }}
          >
            La Medicina Laboral evalúa y protege la salud de los trabajadores, cumpliendo la normativa vigente y promoviendo ambientes laborales seguros.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginTop: '0.75rem' }}>
            {/* Item 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 96, height: 96, minWidth: 96, borderRadius: '50%', border: '8px solid #3bb0f3', display: 'grid', placeItems: 'center', overflow: 'hidden', background: '#eaf6fe' }}>
                <Image src="/images/laboral-bubble-1.png" alt="Exámenes ocupacionales" width={96} height={96} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ color: '#2196f3', fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>Exámenes ocupacionales</div>
              </div>
            </div>
            {/* Item 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 96, height: 96, minWidth: 96, borderRadius: '50%', border: '8px solid #3bb0f3', display: 'grid', placeItems: 'center', overflow: 'hidden', background: '#eaf6fe' }}>
                <Image src="/images/laboral-bubble-2.png" alt="Evaluaciones de ingreso, periódicas y de egreso" width={96} height={96} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ color: '#2196f3', fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>
                  Evaluaciones de<br />ingreso, periódicas y<br />de egreso
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 96, height: 96, minWidth: 96, borderRadius: '50%', border: '8px solid #3bb0f3', display: 'grid', placeItems: 'center', overflow: 'hidden', background: '#eaf6fe' }}>
                <Image src="/images/laboral-bubble-3.png" alt="Exámenes médico-ocupacionales con énfasis osteomuscular" width={96} height={96} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ color: '#2196f3', fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>
                  Exámenes médico<br />ocupacionales con<br />énfasis osteomuscular.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUE TWO-COLUMN LISTS */}
      <section style={{ backgroundColor: '#0e8ae6', padding: '2.25rem 1rem' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'white',
                fontWeight: 800,
                marginTop: 0,
                marginBottom: '0.75rem',
              }}
            >
              ¿Qué tratamos en Medicina Laboral?
            </h3>
            <ul
              style={{
                color: 'white',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                paddingLeft: '1rem',
                listStyle: 'disc',
                margin: 0,
              }}
            >
              <li>Riesgos osteomusculares y de fatiga laboral.</li>
              <li>Exposición a agentes físicos, químicos o biológicos.</li>
              <li>Trastornos respiratorios y de la voz por el trabajo.</li>
              <li>Reintegro y restricciones laborales.</li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'white',
                fontWeight: 800,
                marginTop: 0,
                marginBottom: '0.75rem',
              }}
            >
              Ventajas de atenderte con nosotros
            </h3>
            <ul
              style={{
                color: 'white',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                paddingLeft: '1rem',
                listStyle: 'disc',
                margin: 0,
              }}
            >
              <li>Evaluación médica integral.</li>
              <li>Diagnóstico preciso y personalizado.</li>
              <li>Coordinación con otras especialidades.</li>
              <li>Atención cálida, humana y sin demoras innecesarias.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA BANNER (only background + headline) */}
      <section style={{ position: 'relative', minHeight: 360, width: '100%' }}>
        <Image
          src="/images/laboral-3.png"
          alt="Agenda Medicina Laboral"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            width: 'min(900px, 92vw)',
            padding: '0 1rem',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(1.05rem, 2.4vw, 1.5rem)',
              lineHeight: 1.9,
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
              fontWeight: 700,
            }}
          >
            En Bihospharma, contamos con especialistas para la prevención, diagnóstico y control de riesgos ocupacionales en tu empresa.
          </p>
        </div>
      </section>

      {/* BUTTON STRIP (separate white band like the design) */}
      <div
        style={{
          background: '#ffffff',
          padding: '1.25rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-28px)',
        }}
      >
        <a
          href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20ex%C3%A1menes%20de%20Medicina%20Laboral"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '0.9rem 1.75rem',
            borderRadius: 999,
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            textDecoration: 'none',
            boxShadow: '0 10px 22px rgba(0,0,0,0.25)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
          </svg>
          <span>AGENDA TU CITA</span>
        </a>
      </div>

      {/* SUBTEXT STRIP (light gray) */}
      <div
        style={{
          background: '#f0f2f5',
          padding: '1.25rem 1rem 1.75rem',
          textAlign: 'center',
          color: '#222',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
        }}
      >
        Y garantiza un entorno laboral seguro y saludable.
      </div>

      {/* Bottom legal links line */}
      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', padding: '4rem 2rem', gap: '2rem' }}>
        <div style={{ flex: '1 1 300px', backgroundColor: '#48a4dc', borderRadius: '20px', padding: '2rem', color: 'white', fontWeight: 500, lineHeight: '2rem' }}>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Medicina General</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Programas de atención</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>SST</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Laboratorio Clínico</a></p>
          <br />
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Estados financieros</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Trabaja con nosotros</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Escríbenos PQRFS</a></p>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contacto</h2>
          <p>info@bihospharma.com<br />www.bihospharma.com</p>
          <br />
          <p><strong>TELÉFONO</strong><br />320 316 5870 - 350 2151683</p>
          <br />
          <p><strong>YOPAL (CASANARE)</strong><br />Tranversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
          <br />
          <p><strong>BOGOTÁ D.C</strong><br />Cra 25 No 4A-14</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/instagram.png" alt="Instagram" style={{ width: '30px' }} />
            </a>
            <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/facebook.png" alt="Facebook" style={{ width: '30px' }} />
            </a>
            <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/linkedin.png" alt="LinkedIn" style={{ width: '30px' }} />
            </a>
            <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
              <img src="/logos/x.png" alt="X" style={{ width: '30px' }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}