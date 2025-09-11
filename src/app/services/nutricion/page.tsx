import Image from 'next/image';

export const metadata = {
  title: 'Nutrición | Bihospharma',
  description: 'Asesoría nutricional para promover hábitos saludables y mejorar tu bienestar.',
};

export default function NutricionPage() {
  return (
    <>
      {/* HERO (match PDF style) */}
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
        <Image src="/images/nutricion-comida-sana.png" alt="Nutrición" fill priority style={{ objectFit: 'cover' }} />
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
          NUTRICIÓN
        </h1>
      </section>

      {/* INTRO with centered watermark (match PDF) */}
      <section style={{ position: 'relative', backgroundColor: '#fff', padding: '2.75rem 1rem' }}>
        <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto', overflow: 'hidden', textAlign: 'center' }}>
          {/* watermark */}
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
              fontSize: 'clamp(1.18rem, 2.4vw, 1.45rem)',
              lineHeight: '2.2rem',
              fontWeight: 600,
              color: '#1a2233',
              maxWidth: '72ch',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            En Bihospharma IPS, nuestro servicio de nutrición está enfocado en mejorar tu calidad de vida a través de
            planes alimenticios personalizados, adaptados a tus necesidades, condición de salud y estilo de vida.
          </p>
        </div>
      </section>

      {/* Info + image split (match PDF) */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 1rem' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(280px, 1fr)',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Heading + paragraphs */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: '#2196f3',
                fontWeight: 800,
                marginTop: 0,
                marginRight: 0,
                marginLeft: 0,
                marginBottom: '1rem',
              }}
            >
              ¿En qué consiste nuestro servicio de Nutrición?
            </h2>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#1f1f1f', margin: 0, marginBottom: '1rem' }}>
              La consulta de nutrición te brinda orientación profesional sobre cómo alimentarte de forma equilibrada para
              prevenir enfermedades, controlar tu peso y optimizar tu bienestar físico y mental.
            </p>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#1f1f1f', margin: 0 }}>
              Nuestros nutricionistas realizan una valoración completa y diseñan un plan único para ti, teniendo en cuenta
              tu estado de salud, objetivos y preferencias.
            </p>
          </div>

          {/* Right: title + rounded image */}
          <div>
            <h3
              style={{
                marginTop: 0,
                marginRight: 0,
                marginLeft: 0,
                marginBottom: '0.75rem',
                fontSize: '1.5rem',
                color: '#111',
                fontWeight: 700,
              }}
            >
              Servicios
            </h3>
            <Image
              src="/images/nutricion-servicios.png"
              alt="Servicios de nutrición"
              width={560}
              height={340}
              style={{
                borderRadius: 18,
                width: '100%',
                height: 'auto',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                display: 'block',
              }}
              priority
            />
          </div>
        </div>
      </section>

      {/* New Blue Section with Areas and Advantages */}
      <section
        style={{
          backgroundColor: '#48a4dc',
          borderRadius: '20px',
          maxWidth: '1140px',
          margin: '2rem auto',
          padding: '2rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          color: '#000',
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginTop: 0,
              marginBottom: '1rem',
              color: 'white',
            }}
          >
            Áreas en las que te podemos ayudar
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.25rem',
              lineHeight: 1.7,
              fontSize: '1.05rem',
              listStyleType: 'disc',
              color: 'black',
            }}
          >
            <li>Control y manejo de peso.</li>
            <li>Alimentación en enfermedades crónicas (diabetes, hipertensión, colesterol alto).</li>
            <li>Nutrición deportiva.</li>
            <li>Planes para embarazo y lactancia.</li>
            <li>Alimentación en la infancia y adolescencia.</li>
            <li>Educación nutricional para hábitos saludables.</li>
          </ul>
        </div>
        <div>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginTop: 0,
              marginBottom: '1rem',
              color: 'white',
            }}
          >
            Ventajas de nuestro servicio
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.25rem',
              lineHeight: 1.7,
              fontSize: '1.05rem',
              listStyleType: 'disc',
              color: 'black',
            }}
          >
            <li>Valoración integral y personalizada.</li>
            <li>Planes alimenticios prácticos y adaptados a tu rutina.</li>
            <li>Acompañamiento y seguimiento para mantener los resultados.</li>
            <li>Orientación basada en evidencia científica.</li>
          </ul>
        </div>
      </section>

      {/* CTA PANEL WITH BIG SERIF COPY + WHATSAPP BUTTON (match PDF) */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 420,
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/nutricion-weights.png"
          alt="Agenda Nutrición"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />

        {/* darken image for legible white text like PDF */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%)',
            zIndex: 0,
          }}
        />

        {/* centered content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 1000,
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* large serif paragraph (breaks like the PDF) */}
          <p
            style={{
              marginTop: 0,
              marginRight: 0,
              marginLeft: 0,
              marginBottom: '1.2rem',
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontWeight: 500,
              lineHeight: '1.55',
              fontSize: 'clamp(1.25rem, 3.2vw, 2.05rem)',
              maxWidth: 900,
            }}
          >
            En Bihospharma IPS, la nutrición no es solo un plan de alimentación, es un
            acompañamiento constante para que adoptes hábitos que mejoren tu salud a
            largo plazo.
          </p>

          {/* Big rounded CTA like the PDF with WhatsApp glyph */}
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Nutrici%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              color: '#fff',
              backgroundColor: '#2196F3',
              padding: '0.85rem 1.4rem',
              borderRadius: 9999,
              boxShadow:
                '0 12px 20px rgba(0,0,0,0.25), inset 0 -3px 0 rgba(0,0,0,0.15), inset 0 3px 0 rgba(255,255,255,0.15)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.22)',
                boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)', fontWeight: 800, letterSpacing: 0.6 }}>
              AGENDA TU CITA
            </span>
          </a>
        </div>
      </section>

      {/* Bottom tagline strip (light gray) */}
      <section style={{ backgroundColor: '#e9ecef', padding: '1.9rem 1rem' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            textAlign: 'center',
            color: '#1f1f1f',
            fontSize: 'clamp(1rem, 2.4vw, 1.18rem)',
            fontWeight: 600,
          }}
        >
          Alimentarte bien es cuidarte mejor
        </div>
      </section>

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