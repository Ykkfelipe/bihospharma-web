import Image from 'next/image';

export default function TrabajoSocialPage() {
  return (
    <>
      {/* HERO: big banner with title */}
      <section style={{ position: 'relative', width: '100%', minHeight: 360 }}>
        <Image
          src="/images/hands.png"
          alt="Trabajo Social"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            padding: '2rem 1rem',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h1 style={{
            margin: 0,
            color: '#fff',
            fontSize: 'clamp(2.6rem, 6.6vw, 4.8rem)',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textAlign: 'center',
            textShadow: '0 6px 22px rgba(0,0,0,0.6)'
          }}>
            TRABAJO SOCIAL
          </h1>
        </div>
      </section>

      {/* INTRO: centered serif paragraph */}
      <section style={{ backgroundColor: '#fff', padding: '4.25rem 1rem 4.75rem' }}>
        <div
          style={{
            position: 'relative',
            maxWidth: 1200,
            margin: '0 auto',
            textAlign: 'center',
            overflow: 'hidden',
            zIndex: 1,
            minHeight: '220px'
          }}
        >
          <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none', zIndex: 0 }}>
            <Image
              src="/images/bihospharma-logo-banner.png"
              alt="Bihospharma Logo Banner"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center', opacity: 0.15, transform: 'scale(1.05)' }}
              priority
            />
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 2,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
              lineHeight: '2.6rem',
              fontWeight: 700,
              color: '#12203a',
              maxWidth: '85ch',
              margin: '0 auto',
              textShadow: '0 1px 0 rgba(255,255,255,0.35)'
            }}
          >
            En Bihospharma IPS, el área de Trabajo Social acompaña a los usuarios y sus familias en la resolución de situaciones sociales, familiares y comunitarias que afectan su salud y calidad de vida.
          </p>
        </div>
      </section>

      {/* CONTENT: two-column section matching the mock */}
      <section style={{ padding: '3rem 1rem', backgroundColor: '#fff' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left: image with rounded corners */}
          <div>
            <Image
              src="/images/trabajo-social.png"
              alt="Trabajo Social"
              width={680}
              height={430}
              style={{
                borderRadius: '18px',
                width: '100%',
                height: 'auto',
                display: 'block',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}
            />
          </div>

          {/* Right: title + two paragraphs */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                color: '#2196f3',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 1rem 0'
              }}
            >
              ¿Qué es el servicio de Trabajo Social?
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.9rem',
                color: '#1f1f1f',
                margin: '0 0 1rem 0'
              }}
            >
              El Trabajo Social en salud se centra en brindar orientación, apoyo y acompañamiento a las personas y sus familias para enfrentar dificultades sociales, económicas o familiares que influyen en su bienestar físico y emocional.
            </p>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.9rem',
                color: '#1f1f1f',
                margin: 0
              }}
            >
              Nuestro equipo trabaja de manera integral con las demás áreas médicas para garantizar una atención completa y humana.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: '#2196f3',
          borderRadius: '16px',
          padding: '3rem 2rem',
          maxWidth: 1100,
          margin: '2rem auto 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          color: '#000'
        }}
      >
        <div>
          <h3
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1.25rem'
            }}
          >
            Áreas de intervención
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.25rem',
              listStyleType: 'disc',
              fontWeight: 400,
              fontSize: '1.12rem',
              lineHeight: '1.85rem',
              color: '#000',
              gap: '0.65rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <li>Orientación familiar y comunitaria.</li>
            <li>Acompañamiento en situaciones de vulnerabilidad social.</li>
            <li>Asesoría en acceso a programas y servicios de salud.</li>
            <li>Prevención de problemáticas sociales que afectan la salud.</li>
            <li>Promoción de hábitos saludables y redes de apoyo.</li>
            <li>Fortalecimiento de la comunicación y relaciones familiares.</li>
          </ul>
        </div>
        <div>
          <h3
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1.25rem'
            }}
          >
            Beneficios de nuestro servicio de Trabajo Social
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.25rem',
              listStyleType: 'disc',
              fontWeight: 400,
              fontSize: '1.12rem',
              lineHeight: '1.85rem',
              color: '#000',
              gap: '0.65rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <li>Atención cercana, humana y empática.</li>
            <li>Orientación integral frente a situaciones sociales y de salud.</li>
            <li>Acompañamiento en procesos administrativos y de acceso a servicios.</li>
            <li>Apoyo en la construcción de redes de cuidado y protección.</li>
          </ul>
        </div>
      </section>

      {/* CTA TOP: image with large serif text (no button here) */}
      <section style={{ position: 'relative', width: '100%', minHeight: 360 }}>
        <Image
          src="/images/trabajo-social-2.png"
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
            En Bihospharma entendemos que la salud no solo depende
            del cuerpo, sino también del entorno en el que vivimos. Por
            eso, desde Trabajo Social ofrecemos acompañamiento para
            que cada persona y su familia puedan superar barreras y
            acceder a una vida más plena y saludable.
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
    </>
  );
}