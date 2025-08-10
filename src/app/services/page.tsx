"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ServicesPage() {
  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  if (typeof window !== "undefined") {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
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
              {title === 'MEDICINA GENERAL' && (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('medicina-general-info');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
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
                    zIndex: 1
                  }}
                >
                  VER MÁS
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
      <div id="medicina-general-info" style={{ marginBottom: '4rem' }}>
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
      </div>
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