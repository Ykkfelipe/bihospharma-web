import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Día Mundial del Lavado de Manos | Bihospharma',
  description: 'Recursos y recomendaciones para el Día Mundial del Lavado de Manos.',
};

export default function DiaLavadoManos() {
  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* HERO */}
      <section
        className="heroSection"
        aria-label="Hero Día Mundial del Lavado de Manos"
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          backgroundImage: "url('/images/lavado-manos3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '1.5rem'
        }}
      >
        {/* subtle overlay to improve contrast over the background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.35) 70%)'
          }}
        />
        {/* Right-aligned content block to mirror the PDF */}
        <div
          className="heroWrapper"
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 2rem'
          }}
        >
          <div className="heroText" style={{ width: 'min(680px, 60%)' }}>
            <h1
              className="heroTitle"
              style={{ margin: 0, color: '#0B1B2B' }}
            >
              Día Mundial del
              <br />
              Lavado de Manos:
              <br />
              <span style={{ fontWeight: 800 }}>Un gesto simple que salva vidas</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.9, color: '#111827' }}>
        <p>
          <strong>El 15 de octubre</strong> se celebra el <strong>Día Mundial del Lavado de Manos</strong>, una fecha proclamada en 2008 por la Asociación Mundial para el Lavado de Manos con el propósito de promover esta práctica como una de las formas más efectivas y accesibles de prevenir enfermedades.
        </p>
        <p>
          <strong>Lavarse las manos</strong> con agua y jabón es un hábito sencillo, pero capaz de salvar millones de vidas, especialmente entre los niños. Este día busca recordar que la higiene de manos es una herramienta clave para detener la propagación de gérmenes y proteger la salud de todos.
        </p>

        <h2 style={{ color: '#1E73BE', fontWeight: 800, fontSize: '1.5rem', marginTop: '2.5rem' }}>
          La salud mental desde la infancia y la adolescencia.
        </h2>

        <p>
          La Organización Mundial de la Salud (OMS) define cinco momentos esenciales para mantener una correcta higiene de manos. Estos momentos, adaptados a la vida cotidiana, ayudan a reducir el riesgo de infecciones:
        </p>
      </section>

      {/* Five Moments Section */}
      <section
        className="fiveMoments"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          marginTop: '2rem',
          background: '#f9fafb',
          borderRadius: 12,
          padding: '2rem'
        }}
      >
        <div style={{ flex: '1 1 550px', fontSize: '1.05rem', lineHeight: 1.9, color: '#111827' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              <strong>Antes de preparar o comer alimentos:</strong><br />
              Evita que los gérmenes lleguen a la comida y, posteriormente, a tu cuerpo.
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Después de ir al baño:</strong><br />
              Impide la propagación de microorganismos que pueden causar enfermedades intestinales.
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Después de tocar mascotas o superficies sucias:</strong><br />
              Los animales y los objetos de uso frecuente, como picaportes o carritos de supermercado, pueden ser portadores de gérmenes.
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Después de toser, estornudar o sonarte la nariz:</strong><br />
              Las manos pueden contaminarse con secreciones respiratorias que transmiten virus.
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Antes de tocarse los ojos, la nariz o la boca:</strong><br />
              Evita que los gérmenes ingresen directamente al organismo por las mucosas faciales.
            </li>
          </ul>
        </div>

        <div style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center' }}>
          <img
            className="fiveImage"
            src="/images/lavado-manos.png"
            alt="Lavado de manos con jabón"
            style={{
              width: '100%',
              maxWidth: 380,
              borderRadius: 12,
              objectFit: 'cover'
            }}
          />
        </div>
      </section>
      {/* Final Awareness Section */}
      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2
          style={{
            color: '#1E73BE',
            fontWeight: 800,
            fontSize: '1.9rem',
            lineHeight: 1.4,
            maxWidth: 900,
            margin: '0 auto 2rem auto'
          }}
        >
          Adoptar este hábito previene la propagación de enfermedades y protege tu salud y la de los demás.
        </h2>

        <img
          src="/images/lavado-manos2.png"
          alt="Niño lavándose las manos con ayuda de un adulto"
          style={{
            width: '100%',
            maxWidth: 700,
            borderRadius: 12,
            margin: '0 auto 2.5rem auto',
            display: 'block'
          }}
        />

        <div
          style={{
            background: '#1E73BE',
            borderRadius: 12,
            padding: '1.5rem',
            color: '#fff',
            fontSize: '1.15rem',
            fontWeight: 500,
            lineHeight: 1.8,
            maxWidth: 1000,
            margin: '0 auto'
          }}
        >
          En <strong>Bihospharma</strong> reafirmamos nuestro <strong>compromiso</strong> con la salud y el <strong>bienestar</strong>, fomentando <strong>hábitos de higiene</strong> que salvan vidas.
        </div>
      </section>

      {/* Centered CTA button */}
      <section className="ctaButton" style={{ background: '#ffffff', padding: '1.5rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            className="ctaBtn"
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

      {/* Contact block (like services pages) */}
      <section className="contact" style={{ position: 'relative', background: '#ffffff', padding: '3rem 1rem' }}>
        <div style={{ position: 'absolute', right: 0, bottom: -30, width: 320, height: 320, opacity: 0.12, pointerEvents: 'none' }}>
          <Image src="/images/bihospharma-logo-banner.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Left: Contact info */}
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

          {/* Right: addresses */}
          <div style={{ fontSize: '1.05rem', color: '#1d1d1f', lineHeight: '1.8rem' }}>
            <p style={{ margin: '0.2rem 0' }}><strong>YOPAL (CASANARE)</strong><br />Tranversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
            <p style={{ margin: '0.6rem 0 0' }}><strong>BOGOTÁ D.C</strong><br />Cra 25 No 4A-14</p>
          </div>
        </div>
      </section>
      <style>{`
        /* Base sizes moved out of inline so media queries can adapt */
        .heroSection { height: clamp(360px, 52vh, 620px); }
        .heroText { text-align: right; }
        .heroTitle {
          font-weight: 900;
          line-height: 1.05;
          font-size: clamp(2.2rem, 5.5vw, 4.2rem);
          text-shadow: 0 2px 0 rgba(255,255,255,0.35), 0 6px 22px rgba(0,0,0,0.18);
        }
        .fiveMoments { padding: 2rem; gap: 2rem; }
        .fiveMoments ul { font-size: 1.05rem; }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .heroSection { height: 320px; }
          .heroWrapper { justify-content: center; padding: 0 1rem; }
          .heroText { width: 100% !important; text-align: center; }
          .heroTitle { font-size: clamp(1.6rem, 8vw, 2.6rem); line-height: 1.15; text-shadow: 0 1px 0 rgba(255,255,255,0.3), 0 3px 12px rgba(0,0,0,0.16); }
          .fiveMoments { padding: 1rem; }
          .fiveMoments ul { font-size: 1rem; padding-left: 1.1rem; }
          .fiveImage { max-width: 100% !important; }
          .ctaBtn { width: 100%; justify-content: center; text-align: center; }
        }

        /* Very small screens */
        @media (max-width: 420px) {
          .heroSection { height: 280px; }
          .heroTitle { font-size: clamp(1.4rem, 9vw, 2.2rem); }
        }
      `}</style>
    </main>
  );
}
