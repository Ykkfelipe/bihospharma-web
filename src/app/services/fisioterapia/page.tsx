import Image from 'next/image';

export const metadata = {
  title: 'Fisioterapia | Bihospharma',
  description: 'Recupera tu movilidad y reduce el dolor con terapias personalizadas.',
};

export default function FisioterapiaPage() {
  return (
    <>
      {/* HERO (match PDF style) */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'min(56vh, 480px)',
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image src="/images/fisio2.png" alt="Fisioterapia" fill priority style={{ objectFit: 'cover' }} />
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
            letterSpacing: 'clamp(0.08rem, 1vw, 0.35rem)',
            fontWeight: 900,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          FISIOTERAPIA
        </h1>
      </section>

      {/* INTRO (white band with centered watermark) */}
      <section style={{ position: 'relative', backgroundColor: '#fff', padding: 'clamp(2rem, 4vw, 2.75rem) 1rem' }}>
        <div style={{ position: 'relative', maxWidth: 980, margin: '0 auto', overflow: 'hidden', textAlign: 'center' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
            <Image
              src="/images/bihospharma-logo-banner.png"
              alt=""
              fill
              style={{ objectFit: 'contain', objectPosition: 'center center', opacity: 0.18, transform: 'scale(0.9)' }}
              priority
            />
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: '1.85rem',
              fontWeight: 500,
              color: '#1f1f1f',
              margin: 0,
            }}
          >
            En Bihospharma IPS ofrecemos Fisioterapia para prevenir, tratar y rehabilitar lesiones y disfunciones musculoesqueléticas. Nuestro objetivo es aliviar el dolor, recuperar tu movilidad y ayudarte a retomar tus actividades con seguridad.
          </p>
        </div>
      </section>

      {/* Split: Servicios image left + ¿Qué es...? right */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 1rem' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ margin: 0, marginBottom: '0.75rem', fontSize: 'clamp(1.25rem, 2.6vw, 1.5rem)', color: '#111', fontWeight: 700 }}>Servicios</h3>
            <Image
              src="/images/fisio3.png"
              alt="Servicios de Fisioterapia"
              width={560}
              height={340}
              style={{ borderRadius: 18, width: '100%', height: 'auto', boxShadow: '0 10px 24px rgba(0,0,0,0.12)', display: 'block' }}
              priority
            />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)', color: '#2196f3', fontWeight: 800, margin: 0, marginBottom: '1rem' }}>
              ¿Qué es el servicio de Fisioterapia?
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.3vw, 1.12rem)', lineHeight: 1.85, color: '#1f1f1f', margin: 0 }}>
              La Fisioterapia es una disciplina de la salud que evalúa, diagnostica y trata alteraciones del movimiento y del sistema musculoesquelético. Con técnicas manuales, ejercicio terapéutico y equipos especializados, diseñamos planes personalizados para recuperar funciones, corregir patrones de movimiento y prevenir recaídas.
            </p>
          </div>
        </div>
      </section>

      {/* BLUE TWO-COLUMN LISTS */}
      <section style={{ backgroundColor: '#2EA0DF', padding: 'clamp(1.75rem, 4vw, 2.5rem) 1rem' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)', color: '#ffffff', fontWeight: 800, marginTop: 0, marginBottom: '0.75rem' }}>
              Áreas de intervención
            </h3>
            <ul style={{ color: '#1f1f1f', fontSize: 'clamp(0.98rem, 2.4vw, 1.05rem)', lineHeight: 1.85, paddingLeft: '1.1rem', listStyle: 'disc', margin: 0 }}>
              <li>Terapia manual y movilización articular.</li>
              <li>Ejercicio terapéutico y fortalecimiento.</li>
              <li>Rehabilitación postoperatoria y postlesión.</li>
              <li>Manejo del dolor agudo y crónico.</li>
              <li>Fisioterapia respiratoria.</li>
              <li>Prevención de lesiones y educación postural.</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)', color: '#ffffff', fontWeight: 800, marginTop: 0, marginBottom: '0.75rem' }}>
              Beneficios de nuestro servicio
            </h3>
            <ul style={{ color: '#1f1f1f', fontSize: 'clamp(0.98rem, 2.4vw, 1.05rem)', lineHeight: 1.85, paddingLeft: '1.1rem', listStyle: 'disc', margin: 0 }}>
              <li>Mejora de la movilidad y la fuerza.</li>
              <li>Disminución del dolor y la inflamación.</li>
              <li>Aceleración de la recuperación funcional.</li>
              <li>Prevención de recaídas y nuevas lesiones.</li>
              <li>Mayor independencia y calidad de vida.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA with overlay text + white band button + gray tagline */}
      <section style={{ position: 'relative', minHeight: 360, width: '100%' }}>
        <Image src="/images/fisio1.png" alt="Agenda Fisioterapia" fill style={{ objectFit: 'cover' }} quality={100} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            textAlign: 'center',
            width: 'min(720px, 92vw)',
            padding: '0 1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          <p style={{ margin: 0, fontSize: 'clamp(1rem, 2.4vw, 1.4rem)', lineHeight: 1.85, fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}>
            En Bihospharma trabajamos contigo para recuperar tu movilidad, reducir el dolor y lograr una rehabilitación segura y efectiva.
          </p>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '1.25rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Fisioterapia"
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

      <section style={{ background: '#eeeeee', padding: '1.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', fontSize: 'clamp(0.98rem, 2.2vw, 1.22rem)', color: '#1f1f1f' }}>
          Recupera tu movilidad, mejora tu calidad de vida.
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
