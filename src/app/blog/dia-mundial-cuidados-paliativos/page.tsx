import Image from 'next/image';

export default function BlogPostCuidadosPaliativos() {
  return (
    <>
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 52vh, 560px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image src="/images/cuidados1.png" alt="Día Mundial de los Cuidados Paliativos" fill priority style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, padding: '0 1rem' }}>
          <h1
            style={{
              color: '#ffffff',
              fontWeight: 900,
              textAlign: 'center',
              fontSize: 'clamp(2.2rem, 5.4vw, 3.6rem)',
              lineHeight: 1.1,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Día Mundial de los
            <br />
            Cuidados Paliativos:
            <br />
            <span style={{ color: '#ffffff' }}>cumplir la promesa</span>
            <br />
            del acceso universal
          </h1>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            Cada año, en el mes de octubre, se conmemora el <strong>Día Mundial de los Cuidados Paliativos</strong>, una fecha para reconocer la importancia de ofrecer <strong>atención integral</strong>, compasiva y digna a las personas que enfrentan enfermedades potencialmente mortales.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            Los <strong>cuidados paliativos</strong> son un enfoque destinado a <strong>mejorar la calidad de vida</strong> de los pacientes y sus familias. Buscan <strong>prevenir y aliviar el sufrimiento</strong> mediante la identificación temprana, evaluación y tratamiento del dolor, así como de otros problemas físicos, emocionales, sociales y espirituales.
          </p>
          <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.6rem,3.2vw,2.1rem)', margin: '2rem 0 1rem' }}>
            ¿Por qué son importantes los cuidados paliativos?
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            Se estima que más de 40 millones de personas en el mundo necesitan cuidados paliativos cada año. Esta cifra aumenta debido al envejecimiento de la población y al incremento de enfermedades crónicas y no transmisibles como el cáncer, la insuficiencia cardíaca o la enfermedad pulmonar avanzada.
          </p>
        </div>
      </section>

      {/* THEME 2025 SECTION */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            Brindar acceso oportuno a los cuidados paliativos no solo reduce el sufrimiento físico y emocional, sino que también fortalece el acompañamiento familiar y mejora la calidad de vida en todas las etapas de la enfermedad.
          </p>

          <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.6rem,3.2vw,2.1rem)', margin: '2rem 0 1rem' }}>
            Tema 2025: “Cumplir la Promesa: Acceso Universal a los Cuidados Paliativos”
          </h2>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            El lema de este año, “Cumplir la Promesa: Acceso Universal a los Cuidados Paliativos”, se inspira en la resolución aprobada por la Asamblea Mundial de la Salud hace una década, que instó a todos los países a fortalecer los cuidados paliativos como parte de la atención integral a lo largo de la vida.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
            Este llamado busca que todos los sistemas de salud garanticen:
          </p>
          <ul
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.85,
              color: '#111827',
              paddingLeft: '1.25rem',
              margin: '0.5rem 0 0',
              listStyleType: 'disc',
              listStylePosition: 'outside',
            }}
          >
            <li style={{ marginBottom: '0.4rem' }}>Capacitación continua a los profesionales en cuidados paliativos.</li>
            <li style={{ marginBottom: '0.4rem' }}>Disponibilidad de medicamentos para el manejo del dolor.</li>
            <li style={{ marginBottom: '0.4rem' }}>Integración de los cuidados paliativos en todos los niveles del sistema de salud.</li>
            <li style={{ marginBottom: '0.4rem' }}>Sensibilización comunitaria y apoyo familiar.</li>
          </ul>
        </div>
      </section>
      {/* HUMAN APPROACH SECTION */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#1991eb', fontWeight: 900, fontSize: 'clamp(1.6rem,3.2vw,2.1rem)', marginBottom: '0.8rem' }}>
              Más allá de la atención médica: una mirada humana
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
              Los <strong>cuidados paliativos</strong> <strong>no</strong> solo tratan los síntomas físicos; también acompañan al paciente y su entorno en los aspectos emocionales, sociales y espirituales, fomentando la empatía, el respeto y la dignidad.
            </p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
              El objetivo es que cada persona reciba atención centrada en sus valores y necesidades, reconociendo la vida en todas sus etapas.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 36vw, 320px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}>
            <Image src="/images/cuidados2.png" alt="Acompañamiento humano" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* BIHOSPHARMA IPS SECTION */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 36vw, 300px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 26px rgba(0,0,0,0.1)' }}>
            <Image src="/images/cuidados3.png" alt="Atención integral" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h2
              style={{
                color: '#1991eb',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem,3.2vw,2.1rem)',
                marginBottom: '1rem',
              }}
            >
              Bihospharma IPS promueve una atención humana e integral
            </h2>

            <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#111827' }}>
              Trabajamos para fortalecer la formación del talento humano en salud, garantizar un acompañamiento integral al paciente y su familia, y promover la dignidad y el bienestar en cada etapa de la vida.
            </p>
          </div>
        </div>
      </section>

      {/* BLUE QUOTE SECTION */}
      <section style={{ background: '#1991eb', padding: '2.2rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            color: '#ffffff',
            fontSize: '1.3rem',
            lineHeight: 1.7,
            fontWeight: 500,
            margin: 0,
          }}>
            Creemos que brindar <strong>cuidados paliativos de calidad</strong> es una forma de honrar la vida y acompañar con respeto y compasión.
          </p>
        </div>
      </section>

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

      {/* CONTACTO (igual a otras entradas) */}
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
