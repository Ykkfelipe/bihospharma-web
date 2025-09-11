import Image from 'next/image';

export const metadata = {
  title: 'Medicina Interna | Bihospharma',
  description:
    'Valoración integral del adulto y manejo de patologías crónicas con enfoque preventivo.',
};

export default function MedicinaInternaPage() {
  return (
    <>
      {/* HERO */}
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
        <Image src="/images/medicina-interna-banner.png" alt="Medicina Interna" fill priority style={{ objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.45) 100%)',
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
          MEDICINA INTERNA
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
            maxWidth: 1200,           // wider container like the PDF page
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
                opacity: 0.18,        // lighter so the copy reads cleanly
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
              // serif stack to mimic the PDF’s look
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              // size/leading tuned to look like the design
              fontSize: 'clamp(1.08rem, 2.15vw, 1.35rem)',
              lineHeight: '2.15rem',
              fontWeight: 500,
              color: '#1a2233',
              // keep the text measure elegant like the PDF text column
              maxWidth: '70ch',
              margin: '0 auto',
            }}
          >
            En Bihospharma IPS, contamos con médicos especialistas en Medicina Interna dedicados a la prevención,
            diagnóstico y tratamiento de enfermedades en adultos, brindando atención humana, ética y de alta calidad.
          </p>
        </div>
      </section>


      {/* SERVICIOS layout (image left + three items right) */}
      <section style={{ backgroundColor: '#ffffff', padding: '2.5rem 1rem' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2.25rem)',
            alignItems: 'stretch',
          }}
        >
          {/* Left image with SERVICIOS title overlay */}
          <div style={{ position: 'relative', minHeight: 'clamp(220px, 40vw, 420px)', borderRadius: 8, overflow: 'hidden' }}>
            <Image src="/images/medicina-interna.png" alt="Medicina Interna" fill style={{ objectFit: 'cover' }} />
            <h2
              style={{
                position: 'absolute',
                left: 26,
                bottom: 26,
                margin: 0,
                color: '#ffffff',
                fontWeight: 800,
                letterSpacing: '0.35rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                fontSize: 'clamp(1rem, 2.6vw, 1.75rem)',
              }}
            >
              SERVICIOS
            </h2>
          </div>

          {/* Right: three items with circular images + blue titles (two-line where needed) */}
          <div style={{ backgroundColor: '#fff' }}>
            <div style={{ display: 'grid', gap: 'clamp(1.2rem, 3vw, 2.2rem)' }}>
              {/* Item 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(72px, 18vw, 122px) 1fr', alignItems: 'center', gap: 'clamp(12px, 3vw, 18px)' }}>
                <div
                  style={{
                    width: 'clamp(72px, 18vw, 122px)',
                    height: 'clamp(72px, 18vw, 122px)',
                    borderRadius: '50%',
                    border: 'clamp(6px, 1.8vw, 11px) solid #1e88e5',
                    overflow: 'hidden',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#e3f2fd',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                  }}
                >
                  <Image src="/images/hipertension.png" alt="Exámenes ocupacionales" width={140} height={140} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1rem, 2.8vw, 1.6rem)', lineHeight: 1.15 }}>
                  Exámenes
                  <br />
                  ocupacionales
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(72px, 18vw, 122px) 1fr', alignItems: 'center', gap: 'clamp(12px, 3vw, 18px)' }}>
                <div
                  style={{
                    width: 'clamp(72px, 18vw, 122px)',
                    height: 'clamp(72px, 18vw, 122px)',
                    borderRadius: '50%',
                    border: 'clamp(6px, 1.8vw, 11px) solid #1e88e5',
                    overflow: 'hidden',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#e3f2fd',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                  }}
                >
                  <Image src="/images/diabetes.png" alt="Evaluaciones" width={140} height={140} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1rem, 2.8vw, 1.6rem)', lineHeight: 1.15 }}>
                  Evaluaciones de ingreso, periódicas
                  <br />
                  y de egreso
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(72px, 18vw, 122px) 1fr', alignItems: 'center', gap: 'clamp(12px, 3vw, 18px)' }}>
                <div
                  style={{
                    width: 'clamp(72px, 18vw, 122px)',
                    height: 'clamp(72px, 18vw, 122px)',
                    borderRadius: '50%',
                    border: 'clamp(6px, 1.8vw, 11px) solid #1e88e5',
                    overflow: 'hidden',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#e3f2fd',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                  }}
                >
                  <Image src="/images/medicina-general.png" alt="Énfasis osteomuscular" width={140} height={140} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1rem, 2.8vw, 1.6rem)', lineHeight: 1.15 }}>
                  Exámenes médico ocupacionales con
                  <br />
                  énfasis osteomuscular.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque: Ventajas de realizar sus exámenes con nosotros (panel azul + foto) */}
      <section style={{ padding: '1rem 1rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0', alignItems: 'stretch' }}>
          {/* Left blue panel */}
          <div style={{ backgroundColor: '#0d86d9', color: '#fff', padding: 'clamp(1.25rem, 3.2vw, 2.25rem) clamp(1rem, 2.5vw, 2rem)' }}>
            <h3 style={{ fontSize: 'clamp(1.35rem,2.4vw,1.9rem)', fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
              Ventajas de realizar sus
              <br />
              exámenes con nosotros
            </h3>
            <ul style={{ marginTop: '1.1rem', fontSize: 'clamp(0.95rem, 2.1vw, 1.05rem)', lineHeight: 1.8, paddingLeft: '1.1rem' }}>
              <li>Cumplimiento 100% con la Resolución 2346 de 2007 y demás normas vigentes.</li>
              <li>Resultados rápidos y confidenciales.</li>
              <li>Atención prioritaria para empresas y trabajadores.</li>
              <li>Informe ocupacional detallado para la empresa.</li>
            </ul>
          </div>

          {/* Right image */}
          <div style={{ position: 'relative', minHeight: 'clamp(220px, 40vw, 420px)' }}>
            <Image src="/images/feliz-medico-masculino-visitando-pacientes-mayores-en-casa-y-revisando-documentos-medicos.png" alt="Ventajas exámenes" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* CTA TOP: image with large serif text (no button here) */}
      <section style={{ position: 'relative', width: '100%', minHeight: 360 }}>
        <Image
          src="/images/imagen3interna.png"
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
            Tu bienestar en el trabajo es nuestra prioridad. En Bihospharma, te ofrecemos
            exámenes ocupacionales y servicios en Medicina Laboral con calidad, rapidez y
            cumplimiento normativo.
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
          Y garantiza un entorno laboral seguro y saludable.
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
