import Image from 'next/image';

export const metadata = {
  title: 'Día Mundial de la Fibrosis Quística | Bihospharma',
  description: 'Conmemoración y recursos sobre la Fibrosis Quística. Visualiza o descarga el documento oficial en formato PDF.',
};

export default function DiaMundialFibrosisQuisticaPage() {
  return (
    <>
      {/* HERO: título sobre imagen */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '58vh',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/blog/fq-hero.jpg"
          alt="Día Mundial de la Fibrosis Quística"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 1rem' }}>
          <h1
            style={{
              margin: 0,
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: '0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Día Mundial de la<br />Fibrosis Quística
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: '#ffffff', padding: '2.5rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              lineHeight: 1.9,
              color: '#101214',
              margin: '0 0 1.5rem',
              maxWidth: 980,
            }}
          >
            Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística (FQ), una fecha impulsada por la Asociación Internacional de Fibrosis Quística (CFW) desde 2013, con el objetivo de visibilizar esta enfermedad crónica y apoyar a las personas y familias que la enfrentan.
          </p>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'min(980px, 100%)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
              <Image
                src="/images/blog/fq-intro.jpg"
                alt="Consulta sobre síntomas respiratorios"
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es la fibrosis quística? + gris */}
      <section style={{ background: '#f1f5f9', padding: '2.25rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#1e88e5', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: '0 0 1rem' }}>
            ¿Qué es la fibrosis quística?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
              La fibrosis quística (FQ) es una enfermedad crónica y hereditaria, que produce generalmente la degeneración del sistema digestivo y del sistema respiratorio. En realidad, esta alteración genética, solo afecta las zonas del cuerpo que producen secreciones tales como los pulmones, el páncreas, hígado y el sistema reproductivo.
            </p>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
              La fibrosis quística provoca una obstrucción en los canales que transportan dichas secreciones que terminan convirtiéndose en infecciones graves. El verdadero problema es que, con el paso de los años, este padecimiento tiende a empeorar, lo que trae como resultado una esperanza de vida limitada.
            </p>
          </div>

          <h3 style={{ color: '#1991eb', fontWeight: 800, fontSize: 'clamp(1.15rem, 2.6vw, 1.5rem)', margin: '1.6rem 0 0.75rem' }}>
            La importancia del cribado neonatal o la prueba talón
          </h3>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '0 0 1.2rem' }}>
            El mejor diagnóstico temprano que pueda existir hoy en día es el cribado neonatal o prueba talón. Se trata de un pequeño examen de laboratorio que se le aplica al recién nacido durante los primeros 15 días de haber llegado al mundo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                Para ejecutarlo una enfermera o doctora tomará una muestra de tejido del talón del bebé, dejándole una pequeña marca parecida a la de una ampolla abierta, la cual se debe limpiar regularmente hasta que cicatrice.
              </p>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '1rem 0 0' }}>
                La prueba de talón, no solo permite detectar la fibrosis quística, sino cualquier enfermedad metabólica congénita, alteraciones cerebrales y neurológicas, problemas hormonales, trastornos de crecimiento, entre otra serie de padecimientos que de ser tratados eficazmente desde niños pueden mejorar la salud de la persona alargando su vida.
              </p>
            </div>
            <div style={{ borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
              <Image
                src="/images/blog/fq-neonatal.jpg"
                alt="Prueba del talón en recién nacido"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conclusión */}
      <section style={{ background: '#ffffff', padding: '2.25rem 1rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
              <Image
                src="/images/blog/fq-radiografia.jpg"
                alt="Revisión de radiografía pulmonar"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: 0 }}>
                <strong>La fibrosis quística</strong> es un desafío de salud que requiere conciencia, investigación y acompañamiento médico especializado. En fechas como esta, <strong>recordamos</strong> la importancia de la <strong>prevención</strong>, el <strong>diagnóstico</strong> temprano y el <strong>apoyo a las familias</strong> que viven con esta <strong>condición</strong>.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: '#0f172a', margin: '1.25rem 0 0' }}>
            En <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la <strong>promoción</strong> de la salud y la <strong>prevención</strong> de enfermedades.
          </p>
        </div>
      </section>

      {/* CTA azul */}
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

      {/* Contacto */}
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
