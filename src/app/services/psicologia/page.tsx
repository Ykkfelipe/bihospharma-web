import Image from 'next/image';

export const metadata = {
  title: 'Psicología | Bihospharma',
  description: 'Apoyo psicológico para el bienestar emocional y la salud mental.',
};

export default function PsicologiaPage() {
  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '55vh',
          backgroundImage: 'url("/images/psicologia-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* dark overlay for readability like the PDF */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55))',
          }}
        />

        {/* centered title */}
        <h1
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            margin: 0,
            color: '#fff',
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textAlign: 'center',
            textShadow: '0 4px 18px rgba(0,0,0,0.55)',
          }}
        >
          PSICOLOGÍA
        </h1>
      </div>

      {/* INTRO (white band with blue watermark behind text – tuned to match PDF) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          padding: '3.75rem 1rem 4rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: 1200,
            margin: '0 auto',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* watermark behind text */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
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
              priority
            />
          </div>

          {/* foreground paragraph */}
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              lineHeight: '2.25rem',
              fontWeight: 500,
              color: '#1a2233',
              maxWidth: '85ch',
              margin: '0 auto',
            }}
          >
            En Bihospharma IPS ofrecemos acompañamiento en Psicología Clínica, brindando un
            espacio seguro y confidencial para el cuidado de tu salud mental, ayudándote a
            comprender, manejar y superar situaciones que afectan tu vida diaria.
          </p>
        </div>
      </section>

      {/* ¿Qué es el servicio de Psicología? section */}
      <section
        style={{
          background: '#fff',
          padding: '2.5rem 1rem 2.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            alignItems: 'center',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {/* Left: Image */}
          <div style={{ flex: '1 1 320px', minWidth: 260, maxWidth: 420 }}>
            <Image
              src="/images/psicologia-que-es.png"
              alt="¿Qué es Psicología?"
              width={420}
              height={320}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1.1rem',
                boxShadow: '0 3px 18px rgba(30,60,90,0.08)',
                display: 'block',
              }}
              sizes="(max-width: 600px) 100vw, 420px"
            />
          </div>
          {/* Right: Text */}
          <div style={{ flex: '2 1 340px', minWidth: 260 }}>
            <h2
              style={{
                color: '#1a73e8',
                fontWeight: 700,
                fontSize: '1.6rem',
                margin: 0,
                marginBottom: '1.2rem',
                letterSpacing: '0.01em',
              }}
            >
              ¿Qué es el servicio de Psicología?
            </h2>
            <p
              style={{
                fontSize: '1.09rem',
                lineHeight: '1.85rem',
                color: '#1a2233',
                margin: 0,
                marginBottom: '1.1rem',
                fontWeight: 500,
              }}
            >
              La psicología clínica se centra en la evaluación, diagnóstico y tratamiento de las dificultades emocionales, conductuales y cognitivas que interfieren en tu bienestar.
            </p>
            <p
              style={{
                fontSize: '1.09rem',
                lineHeight: '1.85rem',
                color: '#1a2233',
                margin: 0,
                fontWeight: 500,
              }}
            >
              Nuestros psicólogos te ofrecen herramientas para afrontar el estrés, los conflictos, la ansiedad y otras situaciones, fortaleciendo tus habilidades personales y sociales.
            </p>
          </div>
        </div>
    </section>

      <section
        style={{
          backgroundColor: '#2F8FCD', // match PDF blue
          padding: '3.25rem 1.25rem',
          borderRadius: '20px',
          maxWidth: 1200,
          margin: '2.25rem auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3rem',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ flex: '1 1 460px', minWidth: 280 }}>
            <h3
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                margin: 0,
                marginBottom: '1.25rem',
                letterSpacing: '0.01em',
              }}
            >
              Te ayudaremos en:
            </h3>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 1.25rem',
                listStyleType: 'disc',
                lineHeight: '1.9rem',
              }}
            >
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Estrés, ansiedad y depresión.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Trastornos del sueño.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Manejo del duelo.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Terapia individual, de pareja y familiar.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Orientación en problemas de conducta y aprendizaje en niños y adolescentes.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Desarrollo de habilidades sociales y emocionales.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Promoción de la salud mental y prevención de recaídas.</li>
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: '1 1 460px', minWidth: 280 }}>
            <h3
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                margin: 0,
                marginBottom: '1.25rem',
                letterSpacing: '0.01em',
              }}
            >
              Beneficios de nuestro servicio de Psicología
            </h3>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 1.25rem',
                listStyleType: 'disc',
                lineHeight: '1.9rem',
              }}
            >
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Atención personalizada y confidencial.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Profesionales especializados en diferentes enfoques terapéuticos.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Acompañamiento integral junto a otras especialidades médicas.</li>
              <li style={{ color: '#0F1A2A', fontWeight: 600 }}>Estrategias prácticas para mejorar tu calidad de vida.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA TOP: image with large serif text (no button here) */}
      <section style={{ position: 'relative', width: '100%', minHeight: 360 }}>
        <Image
          src="/images/psicologia-last.png"
          alt="Agenda Psicología"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            padding: '2rem 1rem',
            textAlign: 'center',
            color: '#fff',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}
        >
          <p
            style={{
              maxWidth: 980,
              margin: 0,
              fontFamily: 'Georgia, Times, "Times New Roman", serif',
              fontSize: 'clamp(1.35rem, 3.2vw, 2rem)',
              lineHeight: 1.9,
              fontWeight: 700,
            }}
          >
            En Bihospharma IPS, creemos que la salud
            mental es tan importante como la física. Por
            eso, trabajamos contigo para construir un
            equilibrio emocional que te permita vivir con
            mayor tranquilidad y bienestar.
        </p>
      </div>
    </section>

      {/* CTA MIDDLE: white strip with big rounded blue button */}
      <section style={{ backgroundColor: '#ffffff', padding: '0.75rem 0 1.25rem' }}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Psicolog%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              background: 'linear-gradient(180deg, #1da1f2 0%, #0d86d9 100%)',
              color: '#ffffff',
              fontWeight: 800,
              padding: 'clamp(0.8rem, 2.4vw, 1.05rem) clamp(1.2rem, 3vw, 2.15rem)',
              borderRadius: 9999,
              border: '4px solid #0b6fb3',
              boxShadow: '0 8px 16px rgba(0,0,0,0.25)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
            </svg>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)' }}>AGENDA TU CITA</span>
          </a>
        </div>
      </section>

      {/* CTA BOTTOM: light gray strip with tagline */}
      <section style={{ backgroundColor: '#e9ecef', padding: '1.75rem 1rem' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            textAlign: 'center',
            color: '#1f1f1f',
            fontSize: 'clamp(1rem, 2.4vw, 1.12rem)',
            fontWeight: 500
          }}
        >
          Tu bienestar emocional también es salud
        </div>
      </section>

      {/* FOOTER block (blue card + contact) */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
          gap: '2rem',
          backgroundColor: '#ffffff'
        }}
      >
        <div
          style={{
            flex: '1 1 300px',
            backgroundColor: '#48a4dc',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            fontWeight: 500,
            lineHeight: '2rem'
          }}
        >
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Medicina General</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Programas de atención</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>SST</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Laboratorio Clínico</a></p>
          <br />
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Estados financieros</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Trabaja con nosotros</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Escríbenos PQRSF</a></p>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>Contacto</h2>
          <div style={{ height: '1rem' }} />
          <p>info@bihospharma.com<br />www.bihospharma.com</p>
          <div style={{ height: '1rem' }} />
          <p><strong>TELÉFONO</strong><br />320 316 5870 - 350 2151683</p>
          <div style={{ height: '1rem' }} />
          <p><strong>YOPAL (CASANARE)</strong><br />Transversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
          <div style={{ height: '1rem' }} />
          <p><strong>BOGOTÁ D.C</strong><br />Cra 25 No 4A-14</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/instagram.png" alt="Instagram" width={30} height={30} />
            </a>
            <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/facebook.png" alt="Facebook" width={30} height={30} />
            </a>
            <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/linkedin.png" alt="LinkedIn" width={30} height={30} />
            </a>
            <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/x.png" alt="X" width={30} height={30} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
