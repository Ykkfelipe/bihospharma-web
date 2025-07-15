"use client";

import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          backgroundImage: 'url("/images/servicios-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '4rem',
            fontWeight: 'bold',
            textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            zIndex: 1,
          }}
        >
          SERVICIOS
        </h1>
      </div>
      {/* Add other page content below */}
      <section style={{ backgroundColor: '#48a4dc', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2.5rem', marginBottom: '2rem' }}>Consulta Externa</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {[
            { title: 'MEDICINA GENERAL', img: 'medicina-general.png' },
            { title: 'MEDICINA LABORAL\nEXAMENES OCUPACIONALES', img: 'medicina-laboral.png' },
            { title: 'MEDICINA INTERNA', img: 'medicina-interna.png' },
            { title: 'ENFERMERÍA', img: 'enfermeria.png' },
            { title: 'NUTRICIÓN', img: 'nutricion.png' },
            { title: 'REUMATOLOGÍA', img: 'reumatologia.png' },
            { title: 'PSICOLOGÍA', img: 'psicologia.png' },
            { title: 'TRABAJO SOCIAL', img: 'trabajo-social.png' },
            { title: 'FISIOTERAPIA', img: 'fisioterapia.png' },
          ].map(({ title, img }, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(/images/${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180px',
                borderRadius: '10px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '10px',
              }} />
              <div style={{ zIndex: 1, whiteSpace: 'pre-wrap', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{title}</div>
              <button style={{
                zIndex: 1,
                marginTop: '0.5rem',
                padding: '6px 14px',
                backgroundColor: '#48a4dc',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}>VER MÁS</button>
            </div>
          ))}
        </div>
      </section>
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
              <img src="/logos/instagram.png" alt="Instagram" style={{ width: '30px' }} />
            </a>
            <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/facebook.png" alt="Facebook" style={{ width: '30px' }} />
            </a>
            <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/linkedin.png" alt="LinkedIn" style={{ width: '30px' }} />
            </a>
            <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
              <img src="/logos/x.png" alt="X" style={{ width: '30px' }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}