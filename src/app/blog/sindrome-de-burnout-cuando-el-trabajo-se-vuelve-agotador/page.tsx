import Image from 'next/image';

export const metadata = {
  title: 'Síndrome de Burnout | Bihospharma',
  description: 'El síndrome de burnout: cuando el trabajo se vuelve agotador. Causas, síntomas y cómo manejarlo.',
};

export default function BlogPostBurnout() {
  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(280px, 56vh, 520px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/burnout.png"
          alt="Síndrome de Burnout"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
          }}
        />
        <div
          className="heroTitleWrap"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <h1
            className="heroTitle"
            style={{
              margin: 0,
              color: '#fff',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              lineHeight: 1.12,
              fontWeight: 900,
              letterSpacing: '0.01em',
              textAlign: 'center',
              padding: '0 1rem',
              textShadow: '0 2px 6px rgba(0,0,0,0.6)',
            }}
          >
            Síndrome de Burnout:
            <br />
            cuando el trabajo se vuelve agotador
          </h1>
        </div>
      </section>

      {/* INTRO PARAGRAPH BLOCK */}
      <section
        style={{
          background: '#fff',
          padding: '3rem 1rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 850,
            width: '100%',
            margin: '0 auto',
            background: '#fff',
            borderRadius: 0,
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'inherit',
              fontSize: '1.25rem',
              lineHeight: '2.1rem',
              color: '#1f1f1f',
              fontWeight: 400,
              margin: 0,
              textAlign: 'center',
              maxWidth: 850,
            }}
          >
            El <strong>síndrome de burnout</strong> o <strong>síndrome de agotamiento laboral</strong> es una respuesta al <strong>estrés crónico</strong> en el trabajo, que afecta tanto a nivel individual como organizacional. Se caracteriza por <strong>agotamiento emocional</strong>, <strong>actitud fría o despersonalizada</strong> y <strong>baja realización</strong> profesional o personal.
          </p>
        </div>
      </section>

      {/* ¿Qué es el agotamiento emocional? - TWO COLUMN */}
      <section
        style={{
          background: '#fff',
          padding: '0 1rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 850, width: '100%' }}>
          <h2 style={{color:'#009FE3', fontSize:'1.6rem', fontWeight:900, marginBottom:'1.2rem'}}>
            ¿Qué es el agotamiento emocional?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: '1.13rem',
                  color: '#1f1f1f',
                  lineHeight: '1.9rem',
                  margin: 0,
                }}
              >
                El agotamiento emocional se manifiesta como una sensación constante de cansancio físico y mental, la percepción de no poder dar más de sí mismo y el sobresfuerzo continuo.
                <br />
                Suele aparecer en personas que trabajan en contacto permanente con otras, especialmente cuando las condiciones laborales no son las adecuadas.
              </p>
            </div>
            <div
              style={{
                position:'relative',
                width:'100%',
                height:'clamp(220px,38vw,320px)',
                boxShadow:'0 12px 26px rgba(0,0,0,0.12)',
                borderRadius:'12px',
                overflow:'hidden',
              }}
            >
              <Image src="/images/burnout2.png" alt="Persona estresada en oficina" fill style={{objectFit:'cover', borderRadius:'12px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Actitud fría o despersonalizada y Baja realización personal o profesional (combined section) */}
      <section
        style={{
          background: '#f7f7f7',
          padding: '3rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 950, width: '100%', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left column: image */}
            <div style={{position:'relative',width:'100%',height:'clamp(240px,38vw,340px)',borderRadius:'12px',overflow:'hidden',boxShadow:'0 12px 26px rgba(0,0,0,0.12)'}}>
              <Image
                src="/images/burnout3.png"
                alt="Persona con estrés en oficina"
                width={640}
                height={480}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
            </div>
            {/* Right column: text */}
            <div>
              <h2 style={{color:'#009FE3',fontSize:'1.6rem',fontWeight:900,marginBottom:'1rem',fontFamily:'Georgia, Cambria, "Times New Roman", Times, serif',letterSpacing: '-0.01em'}}>
                Actitud fría o despersonalizada
              </h2>
              <p
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: '1.13rem',
                  color: '#1f1f1f',
                  lineHeight: '1.9rem',
                  margin: 0,
                  marginBottom: '1.5rem',
                  fontWeight: 400,
                }}
              >
                Las personas con burnout pueden desarrollar actitudes distantes, frías o cínicas hacia los demás. Esto se refleja en la irritabilidad, pérdida de motivación y en la dificultad para mantener relaciones laborales y personales saludables.
              </p>
              <h2 style={{color:'#009FE3',fontSize:'1.6rem',fontWeight:900,margin:'1.5rem 0 1rem',fontFamily:'Georgia, Cambria, "Times New Roman", Times, serif',letterSpacing: '-0.01em'}}>
                Baja realización personal o profesional
              </h2>
              <p
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: '1.13rem',
                  color: '#1f1f1f',
                  lineHeight: '1.9rem',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Quienes padecen este síndrome tienden a evaluarse de forma negativa, sintiéndose ineficaces o poco competentes. Esto puede generar bajo rendimiento, dificultad para manejar la presión y una autoestima debilitada, afectando todas las áreas de su vida.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Prevención del síndrome de burnout */}
      <section
        style={{
          background: '#fff',
          padding: '3rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 950, width: '100%' }}>
          <h2
            style={{
              margin: 0,
              marginBottom: '1.3rem',
              fontSize: '2.15rem',
              fontWeight: 900,
              color: '#009FE3',
              textAlign: 'left',
              letterSpacing: '-0.01em'
            }}
          >
            Prevención del síndrome de burnout
          </h2>
          <ul
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: '1.25rem',
              color: '#1f1f1f',
              lineHeight: '2.15rem',
              margin: 0,
              paddingLeft: '1.6em',
              listStyle: 'disc'
            }}
          >
            <li style={{ marginTop: '0.2rem' }}><span>Implementar <strong>planes de recuperación o rehabilitación</strong>.</span></li>
            <li style={{ marginTop: '0.2rem' }}><span>Recibir <strong>tratamiento psicoterapéutico y asesoramiento</strong> oportuno.</span></li>
            <li style={{ marginTop: '0.2rem' }}><span><strong>Promover la adaptación</strong> entre el trabajador y su entorno laboral.</span></li>
            <li style={{ marginTop: '0.2rem' }}><span><strong>Mejorar el ambiente de trabajo</strong> y las condiciones organizacionales.</span></li>
            <li style={{ marginTop: '0.2rem' }}><span><strong>Fortalecer vínculos sociales</strong> y redes de apoyo.</span></li>
            <li style={{ marginTop: '0.2rem' }}><span>Potenciar la <strong>gestión del desempeño</strong> y <strong>reconocimiento del esfuerzo</strong>.</span></li>
          </ul>
        </div>
      </section>

      {/* Autocuidado y bienestar personal */}
      <section
        style={{
          background: '#fff',
          padding: '2.6rem 1rem 3.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 950, width: '100%' }}>
          <h2
            style={{
              margin: 0,
              marginBottom: '1.3rem',
              fontSize: '2.15rem',
              fontWeight: 900,
              color: '#009FE3',
              textAlign: 'left',
              letterSpacing: '-0.01em'
            }}
          >
            Autocuidado y bienestar personal
          </h2>

          <p
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: '1.2rem',
              color: '#1f1f1f',
              lineHeight: '2rem',
              margin: 0,
              marginBottom: '0.75rem'
            }}
          >
            El autocuidado es clave para prevenir el agotamiento laboral. Algunos hábitos que puedes aplicar son:
          </p>

          <ul
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: '1.25rem',
              color: '#1f1f1f',
              lineHeight: '2.15rem',
              margin: 0,
              paddingLeft: '1.6em',
              listStyle: 'disc'
            }}
          >
            <li style={{ marginTop: '0.2rem' }}><strong>Establece límites</strong>: define el fin de tu jornada y respétalo.</li>
            <li style={{ marginTop: '0.2rem' }}><strong>Organiza tu tiempo</strong>: planifica tus tareas y evita la sobrecarga.</li>
            <li style={{ marginTop: '0.2rem' }}><strong>Desconéctate</strong>: busca espacios para descansar y desconectar del trabajo.</li>
            <li style={{ marginTop: '0.2rem' }}><strong>Valora tu esfuerzo</strong>: reconoce tus logros y los de tu equipo.</li>
          </ul>
        </div>
      </section>

      {/* Estilo de vida saludable (grey panel with bullets + image) */}
      <section style={{ backgroundColor: '#ffffff', padding: '2.5rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', borderRadius: 18, background: '#efefef', padding: '2rem', boxShadow: '0 12px 26px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, marginBottom: '1rem', fontSize: '2.15rem', fontWeight: 900, color: '#009FE3', letterSpacing: '-0.01em' }}>Estilo de vida saludable</h2>
              <ul style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif', fontSize: '1.25rem', lineHeight: '2.15rem', color: '#1f1f1f', margin: 0, paddingLeft: '1.6em', listStyle: 'disc' }}>
                <li>Haz ejercicio: mejora el ánimo y reduce el estrés.</li>
                <li>Aliméntate bien: una dieta equilibrada mejora tu energía y concentración.</li>
                <li>Duerme suficiente: el descanso es esencial para la recuperación mental.</li>
                <li>Practica la atención plena: medita o realiza respiraciones profundas.</li>
                <li>Cuida tus relaciones: rodéate de personas que te apoyen y te motiven.</li>
              </ul>
            </div>
            <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 38vw, 300px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}>
              <Image src="/images/burnout4.png" alt="Alimentación saludable" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA azul de texto */}
      <section style={{ background: '#1991eb', padding: '1.25rem 1rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p
            style={{
              margin: 0,
              color: '#ffffff',
              fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Agenda tu cita con nuestros especialistas y recibe acompañamiento integral para ti y tu familia.
          </p>
        </div>
      </section>

      {/* Final tagline and CTA */}
      <section
        style={{
          background: '#2EA0DF',
          color: '#fff',
          padding: '2.5rem 1rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
            lineHeight: '1.9rem',
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            fontWeight: 600,
          }}
        >
          En Bihospharma, <strong>nuestro equipo de salud</strong> te acompaña en el cuidado integral de tu bienestar físico y emocional.
        </div>
      </section>
      <section
        style={{
          background: '#fff',
          padding: '3rem 1rem 2.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
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
              border: '3px solid #ffffff',
              marginBottom: '1.5rem',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 9999,
                border: '2px solid #ffffff',
                background: 'rgba(255,255,255,0.18)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z" />
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)' }}>
              AGENDA TU CITA
            </span>
          </a>
        </div>
      </section>

      {/* Contacto (layout consistente con otros posts) */}
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
