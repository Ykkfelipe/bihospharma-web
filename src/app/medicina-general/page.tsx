import Image from 'next/image';

export default function MedicinaGeneral() {
  return (
    <>
      <div>
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/images/medicina-general-banner.png"
          alt="Medicina General"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0px 0px 10px rgba(0,0,0,0.7)',
          textAlign: 'center',
          zIndex: 2,
        }}>
          MEDICINA GENERAL
        </div>
      </div>

      <section style={{ padding: '3rem 1rem', textAlign: 'center', position: 'relative', backgroundColor: 'white' }}>
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          <Image
            src="/images/bihospharma-logo-banner.png"
            alt="Bihospharma Logo Background"
            fill
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.5,
              zIndex: 0,
              pointerEvents: 'none',
              objectFit: 'contain',
            }}
          />
          <p style={{
            fontSize: '1.35rem',
            lineHeight: '2.1rem',
            position: 'relative',
            zIndex: 1,
            fontWeight: 500,
            color: '#1f1f1f'
          }}>
            En Bihospharma, ofrecemos atención en Medicina General con un enfoque integral en la prevención,
            diagnóstico y tratamiento de enfermedades. Nuestro equipo de profesionales está comprometido con tu salud,
            brindándote un servicio cálido, confiable y personalizado.
          </p>
        </div>
      </section>
      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', backgroundColor: '#fff' }}>
        <div style={{ flex: '1 1 400px', maxWidth: '500px', padding: '1rem' }}>
          <Image
            src="/images/medicina-general.png"
            alt="Doctora Medicina General"
            width={500}
            height={350}
            style={{ borderRadius: '1rem', width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ flex: '1 1 400px', maxWidth: '500px', padding: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#2196f3', fontWeight: 'bold', marginBottom: '1rem' }}>
            ¿Qué es la Medicina General?
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.9rem', color: '#1f1f1f' }}>
            La Medicina General es la primera línea de atención en salud, encargada de evaluar, diagnosticar y tratar enfermedades comunes, así como de realizar seguimiento a condiciones crónicas. Además, juega un papel fundamental en la promoción de hábitos saludables y en la derivación a especialistas cuando es necesario.
          </p>
        </div>
      </section>
      <section style={{ backgroundColor: '#e3f2fd', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 400px', padding: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#1976d2', fontWeight: 'bold', marginBottom: '1rem' }}>
              ¿Cuándo Deberías Consultar a un Médico General?
            </h3>
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
            <h3 style={{ fontSize: '1.6rem', color: '#1976d2', fontWeight: 'bold', marginBottom: '1rem' }}>
              Beneficios de la Atención en Medicina General
            </h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8rem', color: '#1f1f1f', paddingLeft: '1rem', listStyleType: 'disc' }}>
              <li>Atención personalizada basada en tus necesidades de salud.</li>
              <li>Diagnóstico temprano para evitar complicaciones en el futuro.</li>
              <li>Seguimiento continuo para mejorar tu calidad de vida.</li>
              <li>Educación en salud para que tomes decisiones informadas.</li>
            </ul>
          </div>
        </div>
      </section>
      <section style={{ position: 'relative', height: 'auto', minHeight: '400px', width: '100%' }}>
        <Image
          src="/images/general-banner2.png"
          alt="Consulta Medicina General"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          fontWeight: '500',
          textAlign: 'center',
          textShadow: '0px 0px 10px rgba(0,0,0,0.8)',
          padding: '0 1rem',
          zIndex: 2,
          width: '100%',
          maxWidth: '600px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p style={{
            marginBottom: '1rem',
            textAlign: 'center',
            lineHeight: '1.8rem',
            fontSize: '1.1rem'
          }}>
            Cuidar de tu salud es la mejor inversión. En Bihospharma, estamos listos para brindarte la mejor atención en Medicina General.
          </p>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20Medicina%20General"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              padding: '0.7rem 1.2rem',
              borderRadius: '50px',
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              flexWrap: 'wrap',
              flexShrink: 0,
              maxWidth: '90%',
              justifyContent: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
            </svg>
            <span>AGENDA TU CITA</span>
          </a>
          <p style={{
            marginTop: '2rem',
            fontSize: '1.3rem',
            color: 'white',
            textShadow: '0px 0px 10px rgba(0,0,0,0.7)',
            textAlign: 'center',
            lineHeight: '2rem'
          }}>
            Tu bienestar es nuestra prioridad.<br />
            Confía en los expertos y cuida tu salud con nosotros.
          </p>
        </div>
      </section>
      <section style={{ backgroundColor: 'white', padding: '3rem 1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#42a5f5', borderRadius: '1rem', padding: '2rem', flex: '1 1 400px', maxWidth: '500px', margin: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem', lineHeight: '2rem' }}>
            <li><a href="/medicina-general" style={{ color: 'black', textDecoration: 'underline' }}>Medicina General</a></li>
            <li><a href="/programas-atencion" style={{ color: 'black', textDecoration: 'underline' }}>Programas de atención</a></li>
            <li><a href="/sst" style={{ color: 'black', textDecoration: 'underline' }}>SST</a></li>
            <li><a href="/laboratorio-clinico" style={{ color: 'black', textDecoration: 'underline' }}>Laboratorio Clínico</a></li>
            <br />
            <li><a href="/estados-financieros" style={{ color: 'black', textDecoration: 'underline' }}>Estados financieros</a></li>
            <li><a href="/trabaja-con-nosotros" style={{ color: 'black', textDecoration: 'underline' }}>Trabaja con nosotros</a></li>
            <li><a href="/pqrsf" style={{ color: 'black', textDecoration: 'underline' }}>Escríbenos PQRSF</a></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 400px', maxWidth: '500px', margin: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contacto</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>info@bihospharma.com<br />www.bihospharma.com</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>TELÉFONO</p>
          <p>320 316 5870 - 350 2151683</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>YOPAL (CASANARE)</p>
          <p>Transversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>BOGOTÁ D.C</p>
          <p>Cra 25 No 4A-14</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/facebook.png" alt="Facebook" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/instagram.png" alt="Instagram" width={32} height={32} />
            </a>
            <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/linkedin.png" alt="LinkedIn" width={32} height={32} />
            </a>
            <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
              <img src="/logos/x.png" alt="X" width={32} height={32} />
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}