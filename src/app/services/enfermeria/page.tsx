// src/app/services/enfermeria/page.tsx
import Image from 'next/image';

export const metadata = {
  title: 'Enfermería | Bihospharma',
  description:
    'Atención profesional, humana y oportuna en cada procedimiento de enfermería.',
};

export default function EnfermeriaPage() {
  return (
    <>
      {/* HERO (banner + big centered title like PDF) */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '50vh',
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Use your real hero image here */}
        <Image
          src="/images/hand-heart.png" // <- change if your file is named differently
          alt="Enfermería"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* subtle dark overlay so white title pops like the PDF */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.38) 100%)',
          }}
        />

        <h1
          style={{
            position: 'relative',
            color: '#fff',
            fontSize: 'clamp(2.2rem, 6vw, 3.6rem)',
            letterSpacing: '0.35rem',
            fontWeight: 900,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            margin: 0,
          }}
        >
          ENFERMERÍA
        </h1>
      </section>

      

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
              fontSize: 'clamp(1.08rem, 2.15vw, 1.35rem)',
              lineHeight: '2.15rem',
              fontWeight: 500,
              color: '#1a2233',
              maxWidth: '70ch',
              margin: '0 auto',
            }}
          >
            En Bihospharma IPS, nuestro equipo de enfermería está comprometido con tu
            bienestar, ofreciendo atención profesional, humana y oportuna en cada
            procedimiento y acompañamiento que necesites.
          </p>
        </div>
      </section>

      {/* New two-column section */}
      <section
        style={{
          maxWidth: 980,
          margin: '2rem auto 4rem',
          padding: '0 1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            flex: '1 1 300px',
            minWidth: 280,
            color: '#0072CE',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              fontWeight: 'bold',
              color: '#0072CE',
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              marginBottom: '1rem',
            }}
          >
            ¿Qué es el servicio de Enfermería?
          </h2>
          <p
            style={{
              fontWeight: 500,
              color: '#1f1f1f',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: '1.6',
            }}
          >
            El servicio de enfermería es el pilar fundamental en el cuidado de la salud. <br />
            Nuestros profesionales realizan procedimientos clínicos, apoyan la recuperación de los pacientes y <br />
            brindan educación en salud para prevenir enfermedades y promover hábitos saludables.
          </p>
        </div>
        <div
          style={{
            flex: '1 1 300px',
            minWidth: 280,
            borderRadius: 12,
            overflow: 'hidden',
            maxWidth: 480,
            width: '100%',
          }}
        >
          <Image
            src="/images/group-photo.png"
            alt="Grupo de profesionales de enfermería"
            width={480}
            height={320}
            style={{ borderRadius: 12, width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
      </section>
      {/* Additional Servicios – second blue panel (match PDF style) */}
      <section style={{ padding: '0 1rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              background: '#2EA0DF',
              borderRadius: 8,
              padding: '3rem 2.25rem',
              color: '#fff',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.25rem',
              justifyContent: 'space-between',
              boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
            }}
          >
            {/* Left column: Servicios de Enfermería que ofrecemos */}
            <div style={{ flex: '1 1 320px', minWidth: 260 }}>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                  margin: '0 0 1.5rem',
                  color: '#ffffff',
                }}
              >
                Servicios de Enfermería que ofrecemos
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  fontSize: 'clamp(1rem, 1.8vw, 1.14rem)',
                  lineHeight: 1.9,
                  color: '#1f1f1f',
                  listStyle: 'disc',
                }}
              >
                <li>Toma de signos vitales.</li>
                <li>
                  Administración de medicamentos por vía oral, intramuscular, endovenosa y
                  subcutánea.
                </li>
                <li>Curaciones y cuidado de heridas.</li>
                <li>Retiro y cambio de puntos de sutura.</li>
                <li>Canalización de vías periféricas.</li>
                <li>Nebulizaciones y terapias respiratorias.</li>
                <li>Control de glicemia capilar.</li>
                <li>Aplicación de inyectables y vacunas.</li>
                <li>Educación en autocuidado y prevención.</li>
              </ul>
            </div>
            {/* Right column: ¿Por qué elegir nuestro servicio de Enfermería? */}
            <div style={{ flex: '1 1 320px', minWidth: 260 }}>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.7rem)',
                  margin: '0 0 1.25rem',
                  color: '#ffffff',
                }}
              >
                ¿Por qué elegir nuestro servicio de Enfermería?
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  fontSize: 'clamp(1rem, 1.8vw, 1.14rem)',
                  lineHeight: 1.9,
                  color: '#1f1f1f',
                  listStyle: 'disc',
                }}
              >
                <li>Atención cálida y respetuosa.</li>
                <li>Profesionales capacitados y actualizados.</li>
                <li>Procedimientos seguros y con protocolos estrictos de bioseguridad.</li>
                <li>Disponibilidad y agilidad en la atención.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA block with background image (heart-chest.png) AFTER the blue box */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/heart-chest.png"
          alt="Cuidado de enfermería"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: 'min(1100px, 92vw)',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            padding: '2rem 1rem',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              lineHeight: 1.8,
              fontWeight: 500,
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            }}
          >
            En Bihospharma IPS entendemos que el cuidado de la salud está en los detalles. Por eso, cada procedimiento
            de enfermería es realizado con precisión, amabilidad y dedicación, asegurando tu tranquilidad en todo momento.
          </p>
        </div>
      </section>

      {/* White band with prominent CTA button */}
      <section style={{ background: '#ffffff', padding: '1.25rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Enfermer%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#1e9ee6',
              color: '#ffffff',
              padding: '0.9rem 1.4rem',
              borderRadius: 18,
              fontWeight: 900,
              letterSpacing: '0.03em',
              fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
              border: '4px solid #ffffff',
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
          Cuidamos de ti con profesionalismo y calidez en cada procedimiento
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
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contacto</h2>
          <p>info@bihospharma.com<br />www.bihospharma.com</p>
          <br />
          <p><strong>TELÉFONO</strong><br />320 316 5870 - 350 2151683</p>
          <br />
          <p><strong>YOPAL (CASANARE)</strong><br />Transversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
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
