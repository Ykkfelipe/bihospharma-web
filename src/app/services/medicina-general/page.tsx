import Image from 'next/image';

export const metadata = {
  title: 'Medicina General | Bihospharma',
  description:
    'Atención integral para prevención, diagnóstico y tratamiento con enfoque humano.',
};

export default function MedicinaGeneralPage() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '56vh',
          minHeight: 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image src="/images/medicina-general-banner.png" alt="Medicina General" fill priority style={{ objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <h1
          style={{
            position: 'relative',
            color: '#fff',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            letterSpacing: '0.35rem',
            fontWeight: 900,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          MEDICINA GENERAL
        </h1>
      </section>

      {/* INTRO with watermark */}
      <section style={{ position: 'relative', backgroundColor: '#fff', padding: '2.75rem 1rem' }}>
        <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto', overflow: 'hidden', textAlign: 'center' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
            <Image
              src="/images/bihospharma-logo-banner.png"
              alt=""
              fill
              style={{ objectFit: 'contain', objectPosition: 'center center', opacity: 0.5 }}
              priority
            />
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              lineHeight: '1.9rem',
              fontWeight: 500,
              color: '#1f1f1f',
              margin: 0,
            }}
          >
            En Bihospharma, ofrecemos atención en Medicina General con un enfoque integral en la prevención, diagnóstico
            y tratamiento de enfermedades. Nuestro equipo de profesionales está comprometido con tu salud, brindándote un
            servicio cálido, confiable y personalizado.
          </p>
        </div>
      </section>

      {/* Split section */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 1rem' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(280px, 1fr)',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <Image
              src="/images/medicina-general.png"
              alt="Doctora Medicina General"
              width={560}
              height={360}
              style={{ borderRadius: 18, width: '100%', height: 'auto', boxShadow: '0 10px 24px rgba(0,0,0,0.12)', display: 'block' }}
              priority
            />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2196f3', fontWeight: 800, margin: 0, marginBottom: '1rem' }}>
              ¿Qué es la Medicina General?
            </h2>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#1f1f1f', margin: 0 }}>
              La Medicina General es la primera línea de atención, encargada de evaluar, diagnosticar y tratar
              enfermedades comunes, realizar seguimiento a condiciones crónicas y promover hábitos saludables, con
              remisión a especialidades cuando es necesario.
            </p>
          </div>
        </div>
      </section>

      {/* Lists */}
      <section style={{ backgroundColor: '#e3f2fd', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 400px', padding: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#1976d2', fontWeight: 800, marginBottom: '1rem' }}>
              ¿Cuándo Deberías Consultar a un Médico General?
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8rem', color: '#1f1f1f', marginBottom: '1rem' }}>
              Si presentas alguno de los siguientes síntomas o situaciones, es recomendable agendar una consulta:
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8rem', color: '#1f1f1f', paddingLeft: '1rem', listStyleType: 'disc' }}>
              <li>Fiebre persistente, tos o síntomas gripales prolongados.</li>
              <li>Dolor de cabeza frecuente, mareos o fatiga extrema.</li>
              <li>Malestar digestivo recurrente o alteraciones en la alimentación.</li>
              <li>Problemas en la piel como irritaciones, alergias o infecciones.</li>
              <li>Control y seguimiento de enfermedades crónicas.</li>
              <li>Revisión médica general para prevenir enfermedades.</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', padding: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#1976d2', fontWeight: 800, marginBottom: '1rem' }}>
              Beneficios de la Atención en Medicina General
            </h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8rem', color: '#1f1f1f', paddingLeft: '1rem', listStyleType: 'disc' }}>
              <li>Atención personalizada basada en tus necesidades de salud.</li>
              <li>Diagnóstico temprano para evitar complicaciones.</li>
              <li>Seguimiento continuo para mejorar tu calidad de vida.</li>
              <li>Educación en salud para tomar decisiones informadas.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', height: 'auto', minHeight: 400, width: '100%' }}>
        <Image src="/images/general-banner2.png" alt="Consulta Medicina General" fill style={{ objectFit: 'cover' }} quality={100} priority />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
            fontWeight: 500,
            textAlign: 'center',
            textShadow: '0 0 10px rgba(0,0,0,0.8)',
            padding: '0 1rem',
            zIndex: 2,
            width: '100%',
            maxWidth: 600,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ marginBottom: '1rem', lineHeight: '1.8rem', fontSize: '1.1rem' }}>
            Cuidar de tu salud es la mejor inversión. En Bihospharma, estamos listos para brindarte la mejor atención en
            Medicina General.
          </p>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Medicina%20General"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              padding: '0.7rem 1.2rem',
              borderRadius: 50,
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            AGENDA TU CITA
          </a>
        </div>
      </section>

      {/* Contact footer (matches Services page layout) */}
      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', padding: '4rem 2rem', gap: '2rem' }}>
        <div style={{ flex: '1 1 300px', backgroundColor: '#48a4dc', borderRadius: '20px', padding: '2rem', color: 'white', fontWeight: 500, lineHeight: '2rem' }}>
          <p><a href="/services/medicina-general" style={{ color: 'white', textDecoration: 'underline' }}>Medicina General</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Programas de atención</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>SST</a></p>
          <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Laboratorio Clínico</a></p>
          <br />
          <p><a href="/estados-financieros-2024" style={{ color: 'white', textDecoration: 'underline' }}>Estados financieros</a></p>
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
