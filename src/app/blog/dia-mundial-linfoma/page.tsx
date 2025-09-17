import Image from 'next/image';

export const metadata = {
  title: 'Día Mundial del Linfoma | Bihospharma',
  description:
    'Conciencia, tipos, factores de riesgo, síntomas y tratamiento del linfoma. Conoce por qué el diagnóstico temprano es clave.',
};

export default function BlogPostDiaMundialDelLinfoma() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '56vh',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/linfoma-banner.png"
          alt="Día Mundial del Linfoma"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <h1
          style={{
            position: 'relative',
            color: '#fff',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '0.02em',
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.1,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            margin: 0,
            padding: '0 1rem',
          }}
        >
          Día Mundial del Linfoma
        </h1>
      </section>

      {/* INTRO */}
      <section style={{ background: '#fff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            ¿Qué es el linfoma?
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              lineHeight: 1.9,
              color: '#101214',
              margin: '0 0 1.2rem',
              maxWidth: 980,
            }}
          >
            Cada 15 de septiembre se conmemora el Día Mundial del Linfoma, una fecha dedicada a concienciar sobre este tipo de cáncer que afecta al sistema linfático y que, con un diagnóstico temprano, puede tener mejores opciones de tratamiento y recuperación.
          </p>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              lineHeight: 1.9,
              color: '#101214',
              margin: 0,
              maxWidth: 980,
            }}
          >
            El linfoma es un tipo de cáncer que se origina en los linfocitos, células que forman parte del sistema inmunológico y que se encuentran en los ganglios linfáticos, el bazo y otras partes del cuerpo. Cuando los linfocitos sufren alteraciones, empiezan a crecer y multiplicarse de forma anormal, lo que da lugar al linfoma. Un signo común es la presencia de ganglios linfáticos duros, agrandados y que no duelen al tocarlos.
          </p>

        </div>
      </section>

      {/* TIPOS (gris) */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            Tipos de linfomas
          </h2>

          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', marginBottom: '1rem' }}>
            Existen dos tipos principales:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
            <div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 800 }}>Linfoma de Hodgkin</h3>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', margin: 0 }}>
                <li>Afecta  principalmente a los ganglios linfáticos de la parte superior del cuerpo (cuello, tórax, costillas).</li>
                <li>Se caracteriza por la presencia de la célula de Reed-Sternberg.</li>
                <li>Es más fácil de tratar en comparación con otros tipos.</li>
                <li>Se propaga de un ganglio a otro siguiendo un patrón más predecible.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 800 }}>Linfoma no Hodgkin</h3>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', margin: 0 }}>
                <li>Es más común en hombres y en adultos jóvenes (20 a 40 años).</li>
                <li>Puede aparecer en cualquier parte del cuerpo.</li>
                <li>Su crecimiento suele ser rápido, aunque existen variantes menos agresivas.</li>
                <li>Es un grupo amplio que incluye muchos subtipos diferentes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORES + SÍNTOMAS (dos columnas, sin imágenes) */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Columna izquierda: Factores de riesgo (título como en PDF) */}
            <div>
              <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
                Factores de riesgo
              </h2>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Aunque muchas veces no se conoce la causa exacta, algunos factores pueden aumentar el riesgo de desarrollar linfoma:
              </p>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
                <li>Haber recibido tratamientos previos de quimioterapia o radioterapia.</li>
                <li>Haber tenido mononucleosis.</li>
                <li>Estar infectado con virus como HTLV o VIH.</li>
                <li>Tener antecedentes familiares de linfoma (aunque es poco frecuente).</li>
              </ul>
            </div>

            {/* Columna derecha: Síntomas más comunes */}
            <div>
              <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
                Síntomas más comunes
              </h2>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Los signos varían según la localización del linfoma, pero los más frecuentes son:
              </p>
              <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
                <li>Ganglio linfático agrandado (en cuello, pecho, axila, abdomen o ingle).</li>
                <li>Tos y dificultad para respirar.</li>
                <li>Fiebre persistente.</li>
                <li>Sudoración excesiva en las noches.</li>
                <li>Pérdida de apetito.</li>
                <li>Pérdida de peso repentina.</li>
                <li>Cansancio extremo.</li>
                <li>Erupciones o pequeños puntos rojos en la piel.</li>
                <li>Dolor en los ganglios después de consumir alcohol.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRATAMIENTO */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            Tratamiento
          </h2>

          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
            El tratamiento depende del tipo de linfoma y del estadio en el que se encuentre. Las opciones más comunes incluyen:
          </p>
          <ul style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', paddingLeft: '1rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
            <li>Quimioterapia.</li>
            <li>Radioterapia.</li>
            <li>Inmunoterapia.</li>
            <li>Trasplante de médula ósea en algunos casos.</li>
          </ul>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.6rem 0 0' }}>
            La clave es el diagnóstico temprano, que permite diseñar un plan de tratamiento oportuno y aumentar las posibilidades de éxito.
          </p>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0.6rem 0 0' }}>
            El linfoma es una enfermedad grave, pero detectarla a tiempo puede salvar vidas. Conocer sus síntomas y factores de riesgo es fundamental para consultar al especialista de manera oportuna.
          </p>
        </div>
      </section>

      {/* Centered CTA button (match services style) */}
      <section
        className="ctaButton"
        style={{
          background: '#ffffff',
          padding: '1.25rem 1rem 0.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(180deg, #2EA0DF 0%, #1C82C3 100%)',
              color: '#ffffff',
              padding: '0.95rem 2.1rem',
              borderRadius: 9999,
              fontWeight: 800,
              letterSpacing: '0.02em',
              fontSize: 'clamp(1rem, 2.1vw, 1.35rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              textDecoration: 'none',
              boxShadow:
                '0 10px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.45)',
              border: '4px solid #ffffff',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 9999,
                border: '3px solid #ffffff',
                background: 'rgba(255,255,255,0.18)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <path
                  d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"
                />
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.98rem, 2.4vw, 1.25rem)' }}>
              AGENDA TU CITA
            </span>
          </a>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact" style={{ position: 'relative', background: '#ffffff', padding: '3rem 1rem' }}>
        <div style={{ position: 'absolute', right: 0, bottom: -20, width: 420, height: 420, opacity: 0.14, pointerEvents: 'none' }}>
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
            <p style={{ margin: '0.2rem 0', textAlign: 'center' }}>
              <strong>YOPAL (CASANARE)</strong><br />
              Tranversal 18 #7-05 Piso 5<br />
              Edificio Mont Black
            </p>
            <p style={{ margin: '0.6rem 0 1.5rem', textAlign: 'center' }}>
              <strong>BOGOTÁ D.C</strong><br />
              Cra 25 No 4A-14
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
