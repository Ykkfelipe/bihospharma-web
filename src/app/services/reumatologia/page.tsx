import Image from 'next/image';

export const metadata = {
  title: 'Reumatología | Bihospharma',
  description: 'Diagnóstico y manejo de enfermedades reumáticas con un enfoque integral y humano.',
};

export default function ReumatologiaPage() {
  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          backgroundImage: 'url("/images/reumatologia.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.35) 100%)',
            zIndex: 0,
          }}
        />
        <h1
          style={{
            color: 'white',
            fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textShadow: '0 4px 18px rgba(0,0,0,0.55)',
            zIndex: 1,
            textAlign: 'center'
          }}
        >
          REUMATOLOGÍA
        </h1>
      </div>

      <section style={{ padding: '3rem 1rem', textAlign: 'center', position: 'relative', backgroundColor: 'white' }}>
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          <Image
            src="/images/bihospharma-logo-banner.png"
            alt="Bihospharma Logo Background"
            fill
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.16,
              zIndex: 0,
              pointerEvents: 'none',
              objectFit: 'contain',
            }}
          />
          <p style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            fontSize: 'clamp(1.2rem, 2.25vw, 1.5rem)',
            lineHeight: '2.35rem',
            fontWeight: 600,
            color: '#0f2038',
            letterSpacing: '0.01em',
            maxWidth: '72ch',
            margin: '0.5rem auto',
            textAlign: 'center'
          }}>
            En Bihospharma IPS, contamos con especialistas en Reumatología dedicados a la prevención, diagnóstico y tratamiento de enfermedades que afectan el sistema musculoesquelético y el tejido conectivo, mejorando tu calidad de vida y movilidad.
          </p>
        </div>
      </section>

      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem 1rem', backgroundColor: '#fff' }}>
        <div style={{ flex: '1 1 400px', maxWidth: '500px', padding: '1rem' }}>
          <h2 style={{ fontWeight: 'bold', color: 'black', fontSize: '2rem', marginBottom: '1rem' }}>Servicios</h2>
          <Image
            src="/images/radiografia.png"
            alt="Servicios"
            width={500}
            height={350}
            style={{ borderRadius: '1rem', width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
        <div style={{ flex: '1 1 400px', maxWidth: '500px', padding: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#2196f3', fontWeight: 'bold', marginBottom: '1rem' }}>¿Qué es la Reumatología?</h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
              lineHeight: '1.95rem',
              color: '#1a1a1a',
              margin: '0 0 1rem 0',
              maxWidth: '46ch',
              fontWeight: 500
            }}
          >
            La reumatología es la especialidad médica que se enfoca en las enfermedades que afectan las articulaciones,
            músculos, huesos y tejidos blandos, muchas de ellas de origen autoinmune o inflamatorio.
          </p>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
              lineHeight: '1.95rem',
              color: '#1a1a1a',
              margin: 0,
              maxWidth: '46ch',
              fontWeight: 500
            }}
          >
            Nuestros reumatólogos ofrecen una atención integral para diagnosticar tempranamente y controlar estas
            patologías, evitando su progresión y reduciendo el dolor.
          </p>
        </div>
      </section>

      <section
        style={{
          backgroundColor: '#3C9AD9',           // closer to PDF blue
          borderRadius: '20px',
          padding: 'clamp(2.5rem,3.8vw,3.5rem) clamp(1.5rem,3.2vw,3rem)',
          maxWidth: 1200,
          margin: '3rem auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(1.2rem,2.5vw,2rem)',
        }}
      >
        {/* Left column */}
        <div style={{ flex: '1 1 520px', minWidth: 320 }}>
          <h2
            style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem,3.2vw,2.4rem)',
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
            }}
          >
            Enfermedades que tratamos
          </h2>
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '1.4rem',
              margin: 0,
              color: '#0F2038',                 // very dark text over blue like the PDF
              fontSize: 'clamp(1.05rem,1.9vw,1.28rem)',
              lineHeight: '2.05rem',
              fontWeight: 500,
            }}
          >
            <li>Artritis reumatoide.</li>
            <li>Artrosis.</li>
            <li>Lupus eritematoso sistémico.</li>
            <li>Espondiloartritis.</li>
            <li>Gota.</li>
            <li>Osteoporosis.</li>
            <li>Síndrome de Sjögren.</li>
            <li>Fibromialgia.</li>
          </ul>
        </div>

        {/* Right column */}
        <div style={{ flex: '1 1 520px', minWidth: 320 }}>
          <h2
            style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem,3.2vw,2.4rem)',
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
            }}
          >
            Ventajas de atenderte con nuestro equipo de
            <br />
            Reumatología
          </h2>
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '1.4rem',
              margin: 0,
              color: '#0F2038',
              fontSize: 'clamp(1.05rem,1.9vw,1.28rem)',
              lineHeight: '2.05rem',
              fontWeight: 500,
            }}
          >
            <li>Diagnóstico temprano con apoyo de exámenes especializados.</li>
            <li>Plan de tratamiento personalizado.</li>
            <li>Coordinación con otras especialidades para un manejo integral.</li>
            <li>Educación al paciente para el autocuidado y prevención de complicaciones.</li>
          </ul>
        </div>
      </section>

      {/* CTA TOP: image with large serif text (no button here) */}
      <section style={{ position: 'relative', width: '100%', minHeight: 360 }}>
        <Image
          src="/images/hand-pain.png"
          alt="Agenda Medicina Interna"
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
            En Bihospharma IPS trabajamos para que
            nuestros pacientes con enfermedades
            reumatológicas puedan mantener su movilidad,
            autonomía y bienestar a largo plazo.
          </p>
        </div>
      </section>

      {/* CTA MIDDLE: white strip with big rounded blue button */}
      <section style={{ backgroundColor: '#ffffff', padding: '0.75rem 0 1.25rem' }}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Medicina%20Interna"
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
          Cuidamos la salud de tus huesos, músculos y articulaciones
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
          <p><a href="/contact" style={{ color: 'white', textDecoration: 'underline' }}>Trabaja con nosotros</a></p>
          <p><a href="/pqrs" style={{ color: 'white', textDecoration: 'underline' }}>Escríbenos PQRSF</a></p>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>Contacto</h2>
          <div style={{ height: '1rem' }} />
          <p>info@bihospharma.com<br />www.bihospharma.com</p>
          <div style={{ height: '1rem' }} />
          <p><strong>TELÉFONO</strong><br />PBX 3103158806 Opc1 - 3232347791</p>
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
      {/* end of page content */}
    </>
  );
}
