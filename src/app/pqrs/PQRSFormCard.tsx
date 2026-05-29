'use client';

// ============================================================
// DOCUMENTACIÓN DE HANDOVER — PQRSFormCard
// Proyecto: Sitio web Bihospharma IPS
// ============================================================
// Este archivo contiene el formulario de PQRS (Petición, Queja,
// Reclamo, Sugerencia, Felicitación) que usan los pacientes y
// usuarios para enviar una solicitud formal a Bihospharma.
//
// Si estás tomando el proyecto, aquí te explico cómo funciona
// este componente de principio a fin.
//
// Para cambiar los campos del formulario, busca el componente
// <InputLine> más abajo — cada campo es una instancia de ese.
// Para cambiar a dónde se envía el formulario, ve a /api/pqrs/.
// Los estilos visuales están separados en pqrsStyles.ts.
// ============================================================

import Image from 'next/image';
import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { CONTACT } from '@/lib/contactInfo';
import {
  outerShell,
  formShell,
  watermarkLayer,
  topBanner,
  topGradient,
  topInnerArc,
  topSoftArc,
  topWaveDark,
  topWaveLight,
  topRightGlow,
  logoBadge,
  contentBody,
  formTitle,
  gridTwoCols,
  pairRow,
  sectionLabel,
  typeGrid,
  typePill,
  textareaField,
  submitButton,
  disclaimerText,
  feedbackText,
  contactBar,
  infoItem,
  infoIcon,
  infoItemMobile,
  infoIconMobile,
  bottomBanner,
  bottomBlueOne,
  bottomBlueTwo,
  bottomGray,
  lineRow,
  lineRowMobile,
  lineLabel,
  lineLabelMobile,
  requiredMark,
  lineInput,
  lineInputMobile,
} from './pqrsStyles';

// Estas son las 5 categorías válidas de solicitud.
// Si Bihospharma pide agregar una nueva (ej. "Denuncia"),
// simplemente agrégala aquí en el arreglo y aparecerá en el formulario.
const requestTypes = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Felicitación'] as const;
type RequestType = (typeof requestTypes)[number];

// El formulario puede estar en uno de 4 estados posibles.
// Esto controla qué se muestra en pantalla (botón desactivado, mensaje de error, etc.)
// - 'idle'       → el usuario no ha hecho nada todavía
// - 'submitting' → esperando respuesta del servidor
// - 'success'    → el formulario se envió correctamente
// - 'error'      → hubo un problema (campo vacío, correo inválido, error del servidor)
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// Ancho máximo en píxeles antes de cambiar al diseño de una sola columna (móvil).
const MOBILE_BREAKPOINT = 720;

// Estructura de datos que se envía al servidor cuando el usuario hace submit.
// Si el equipo de Bihospharma necesita un campo adicional (ej. "ciudad"),
// hay que agregarlo aquí Y en el archivo /api/pqrs/route.ts.
type FormPayload = {
  date: string;
  registrantName: string;
  registrantId: string;
  phone: string;
  eps: string;
  email: string;
  address: string;
  requestType: RequestType | '';
  description: string;
  // La firma se eliminó — se usa nombre + documento como identificación
};

export default function PQRSFormCard() {
  // Estado del tipo de solicitud seleccionado (los 5 botones de la parte media).
  const [selectedType, setSelectedType] = useState<RequestType | ''>('');

  // Estado del envío: controla el mensaje de éxito/error y el botón de enviar.
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');

  // Si la pantalla es pequeña (≤720px), isCompact = true y el diseño cambia
  // a una sola columna para que todo quepa bien en celular.
  const [isCompact, setIsCompact] = useState(false);

  // Estos son los estilos que cambian dependiendo del tamaño de pantalla.
  // Toman el estilo base de pqrsStyles.ts y le sobreescriben ciertos valores.
  const outerStyles = isCompact
    ? { ...outerShell, maxWidth: 430, padding: '24px 18px 32px', borderRadius: 22, boxShadow: '0 16px 32px rgba(20, 40, 72, 0.16)' }
    : outerShell;
  const contentStyles = isCompact
    ? { ...contentBody, padding: '1.9rem 1.6rem 2.1rem' }
    : contentBody;
  const gridStyles = isCompact
    ? { ...gridTwoCols, gridTemplateColumns: '1fr', gap: '16px' }
    : gridTwoCols;
  const pairStyles = isCompact
    ? { ...pairRow, gridTemplateColumns: '1fr', gap: 14 }
    : pairRow;
  const sectionLabelStyle = isCompact
    ? { ...sectionLabel, fontSize: 12, letterSpacing: 0.1 }
    : sectionLabel;
  const typeGridStyles = isCompact
    ? { ...typeGrid, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', borderRadius: 6 }
    : typeGrid;
  const textareaStyles = isCompact
    ? { ...textareaField, fontSize: 13, minHeight: 140, background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(2px)' }
    : { ...textareaField, background: 'rgba(255,255,255,0.38)', backdropFilter: 'blur(2px)' };
  const submitStyles = isCompact
    ? { ...submitButton, fontSize: '0.9rem', padding: '0.85rem 1.1rem' }
    : submitButton;
  const disclaimerStyles = isCompact
    ? { ...disclaimerText, fontSize: 11 }
    : disclaimerText;
  const feedbackStyles = isCompact
    ? { ...feedbackText, fontSize: 12.5 }
    : feedbackText;
  const contactStyles = isCompact
    ? { ...contactBar, gap: 12, padding: '0.9rem 1.2rem', justifyContent: 'flex-start' }
    : contactBar;

  // Este useEffect escucha cuando el usuario cambia el tamaño de la ventana
  // y actualiza isCompact en tiempo real. Usé un listener de JavaScript en vez
  // de media queries de CSS porque los estilos son objetos JS (no clases CSS).
  //
  // IMPORTANTE: el "return" al final limpia el listener cuando el componente
  // se desmonta. Sin esto habría una fuga de memoria (memory leak).
  useEffect(() => {
    function handleResize() {
      setIsCompact(window.innerWidth <= MOBILE_BREAKPOINT);
    }

    handleResize(); // Ejecutar al cargar para establecer el estado inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Borra el mensaje de éxito/error en cuanto el usuario empieza a escribir de nuevo.
  const resetFeedback = () => {
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  // Esta función corre cuando el usuario hace clic en "Enviar PQRS".
  // Primero valida los campos, luego hace la petición al servidor.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que la página se recargue al enviar
    const form = event.currentTarget;

    // FormData lee todos los campos del formulario de una sola vez
    // sin necesidad de referencias individuales a cada <input>.
    const formData = new FormData(form);

    // Construimos el objeto que se va a enviar al servidor.
    // .trim() elimina espacios en blanco al inicio y al final de cada campo.
    const payload: FormPayload = {
      date: (formData.get('date') ?? '').toString().trim(),
      registrantName: (formData.get('registrantName') ?? '').toString().trim(),
      registrantId: (formData.get('registrantId') ?? '').toString().trim(),
      phone: (formData.get('phone') ?? '').toString().trim(),
      eps: (formData.get('eps') ?? '').toString().trim(),
      email: (formData.get('email') ?? '').toString().trim(),
      address: (formData.get('address') ?? '').toString().trim(),
      requestType: (formData.get('requestType') ?? '').toString() as RequestType | '',
      description: (formData.get('description') ?? '').toString().trim(),
    };

    // Revisamos todos los campos obligatorios antes de mostrar el error,
    // así el usuario ve de una sola vez qué le falta llenar.
    const missing: string[] = [];
    if (!payload.date) missing.push('Fecha');
    if (!payload.registrantName) missing.push('Nombre y apellidos de quien registra');
    if (!payload.registrantId) missing.push('Documento de identidad de quien registra');
    if (!payload.phone) missing.push('Teléfono');
    if (!payload.email) missing.push('Correo electrónico');
    if (!payload.requestType) missing.push('Tipo de solicitud');
    if (!payload.description) missing.push('Descripción de la manifestación');

    if (missing.length > 0) {
      setStatus('error');
      setMessage(`Diligencia los campos obligatorios: ${missing.join(', ')}`);
      return;
    }

    // Validación básica del correo electrónico antes de enviar.
    const emailPattern = /.+@.+\..+/i;
    if (!emailPattern.test(payload.email)) {
      setStatus('error');
      setMessage('Ingresa un correo electrónico válido.');
      return;
    }

    try {
      // Cambiamos el estado a 'submitting' para desactivar el botón
      // y evitar que el usuario envíe el formulario dos veces.
      setStatus('submitting');
      setMessage('');

      // Aquí enviamos los datos al backend.
      // La ruta /api/pqrs está definida en src/app/api/pqrs/route.ts
      // Ahí se configura a qué correo llegan las PQRS — si Bihospharma
      // necesita cambiar el destinatario, ese es el archivo a modificar.
      const response = await fetch('/api/pqrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Si el servidor responde con un error, intentamos leer el mensaje.
        // Si el cuerpo no es JSON válido, usamos un mensaje genérico.
        const { error } = await response.json().catch(() => ({ error: 'No fue posible enviar la solicitud.' }));
        throw new Error(error ?? 'No fue posible enviar la solicitud.');
      }

      // Todo salió bien: mostramos confirmación y reseteamos el formulario.
      setStatus('success');
      setMessage('Tu PQRS fue enviada. Pronto nos comunicaremos contigo.');
      setSelectedType('');
      form.reset();
    } catch (err) {
      console.error('Error enviando PQRS:', err);
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'No fue posible enviar la solicitud. Inténtalo nuevamente.');
    }
  };

  return (
    <div style={outerStyles}>
      {/* noValidate desactiva las validaciones nativas del navegador
          para que usemos nuestros propios mensajes de error en español */}
      <form onSubmit={handleSubmit} onChange={resetFeedback} noValidate style={formShell}>

        {/* Marca de agua del logo de Bihospharma detrás del formulario.
            Es solo decorativa — pointerEvents: none evita que bloquee los inputs */}
        <div style={watermarkLayer}>
          <Image
            src="/logos/bihos-logo.png"
            alt="Marca de agua Bihospharma"
            width={360}
            height={360}
            style={{ objectFit: 'contain', transform: 'translateY(18px) scale(1.16)', opacity: 0.92, filter: 'drop-shadow(0 18px 36px rgba(15,35,66,0.12))' }}
          />
        </div>

        {/* Encabezado azul con el logo. Los divs decorativos son
            capas de gradiente y arcos para el efecto visual. */}
        <div style={topBanner}>
          <div style={topGradient} />
          <div style={topInnerArc} />
          <div style={topSoftArc} />
          <div style={topWaveDark} />
          <div style={topWaveLight} />
          <div style={topRightGlow} />
          <div style={logoBadge}>
            <Image src="/logos/bihos-logo.png" alt="Bihospharma" width={90} height={90} />
          </div>
        </div>

        {/* ——— Cuerpo del formulario ——— */}
        <div style={contentStyles}>
          <h1 style={formTitle}>PETICIÓN, QUEJA, RECLAMO, SUGERENCIA O FELICITACIÓN</h1>

          {/* Campos de información básica en cuadrícula de 2 columnas
              (en móvil cambia a 1 columna automáticamente) */}
          <div style={gridStyles}>
            <InputLine label="Fecha:" name="date" placeholder="DD/MM/AAAA" required compact={isCompact} />
            <div style={pairStyles}>
              <InputLine label="Tel:" name="phone" placeholder="Teléfono" required compact={isCompact} />
              <InputLine label="EPS:" name="eps" placeholder="EPS" compact={isCompact} />
            </div>
            <InputLine label="Correo electrónico:" name="email" type="email" placeholder="ejemplo@correo.com" required autoComplete="email" compact={isCompact} />
            <InputLine label="Dirección:" name="address" placeholder="Dirección" compact={isCompact} />
          </div>

          {/* Selector del tipo de solicitud.
              El valor seleccionado se guarda en el estado selectedType
              y se envía al servidor mediante un <input type="hidden">. */}
          <div style={{ marginTop: 26 }}>
            <div style={sectionLabelStyle}>Marque con una X según corresponda:</div>
            <input type="hidden" name="requestType" value={selectedType} />
            <div style={typeGridStyles}>
              {requestTypes.map((type, index) => {
                const isActive = selectedType === type;
                const isLastItem = index === requestTypes.length - 1;

                // Lógica de bordes: el último botón de cada fila no lleva borde derecho
                const isLastColumn = !isCompact
                  ? isLastItem
                  : index % 2 === 1 || isLastItem;

                const lastRowThreshold = requestTypes.length - (requestTypes.length % 2 === 0 ? 2 : 1);
                const needsBottomBorder = isCompact && index < lastRowThreshold;

                // Si hay número impar de opciones en móvil, el último botón ocupa 2 columnas
                const columnSpan = isCompact && isLastItem && requestTypes.length % 2 !== 0 ? 'span 2' : 'auto';

                return (
                  <button
                    key={type}
                    type="button"
                    // Si el usuario hace clic sobre el tipo ya seleccionado, lo deselecciona
                    onClick={() => setSelectedType((prev) => (prev === type ? '' : type))}
                    aria-pressed={isActive}
                    style={{
                      ...typePill,
                      fontSize: isCompact ? 12 : 13,
                      padding: isCompact ? '10px 6px' : '10px 8px',
                      borderRight: isLastColumn ? 'none' : '1.4px solid #1c3559',
                      borderBottom: needsBottomBorder ? '1.4px solid #1c3559' : 'none',
                      background: isActive ? 'linear-gradient(140deg, #0a4c7a 0%, #0f76b6 100%)' : 'transparent',
                      color: isActive ? '#fff' : '#0f2342',
                      gridColumn: columnSpan,
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campo de texto libre donde el usuario describe su solicitud */}
          <div style={{ marginTop: 30 }}>
            <div style={sectionLabel}>Descripción de la manifestación</div>
            <textarea
              name="description"
              placeholder="Describe con el mayor detalle posible tu solicitud"
              rows={6}
              style={textareaStyles}
              required
            />
          </div>

          {/* Datos de quien hace el registro (pueden ser datos del paciente
              o de un familiar que registra en nombre de otro) */}
          <div style={{ marginTop: 38 }}>
            <div style={sectionLabel}>Datos de quien registra la solicitud</div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr', gap: 12 }}>
              <InputLine label="Nombre de quien registra:" name="registrantName" placeholder="Nombre completo" required compact={isCompact} />
              <InputLine label="Documento de quien registra:" name="registrantId" placeholder="Número" required compact={isCompact} />
            </div>
            <p style={{ ...disclaimerStyles, marginTop: 12 }}>Puedes registrar la solicitud a nombre de un familiar o tercero si es necesario.</p>
          </div>

          {/* Botón de envío + mensajes de estado */}
          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              type="submit"
              style={{
                ...submitStyles,
                // El botón se ve semitransparente y el cursor cambia a "espera"
                // mientras la solicitud está en vuelo para que el usuario no haga clic dos veces
                opacity: status === 'submitting' ? 0.75 : 1,
                cursor: status === 'submitting' ? 'wait' : 'pointer',
              }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Enviando...' : 'Enviar PQRS'}
            </button>
            <p style={disclaimerStyles}>Al enviar este formulario autorizas el tratamiento de tus datos para responder a tu solicitud de PQRS.</p>

            {/* Mensajes de retroalimentación.
                role="status" y role="alert" permiten que los lectores de pantalla
                anuncien el resultado del envío a usuarios con discapacidad visual. */}
            {status === 'success' && (
              <p style={{ ...feedbackStyles, color: '#0d7a4d' }} role="status" aria-live="polite">{message}</p>
            )}
            {status === 'error' && (
              <p style={{ ...feedbackStyles, color: '#b42318' }} role="alert">{message}</p>
            )}
          </div>
        </div>

        {/* Barra de contacto al pie del formulario */}
        <div style={contactStyles}>
          <InfoItem icon={<PhoneIcon />} text={`Cel / WhatsApp: ${CONTACT.phoneMobile}`} compact={isCompact} />
          <InfoItem icon={<WebIcon />} text="www.bihospharma.com" compact={isCompact} />
          <InfoItem icon={<MailIcon />} text="info@bihospharma.com" compact={isCompact} />
          <InfoItem icon={<MapIcon />} text="Carrera 25 # 4A-14 Bogotá" compact={isCompact} />
        </div>

        {/* Franja decorativa inferior */}
        <div style={bottomBanner}>
          <div style={bottomBlueOne} />
          <div style={bottomBlueTwo} />
          <div style={bottomGray} />
        </div>
      </form>
    </div>
  );
}

// ============================================================
// Sub-componentes internos
// ============================================================

// InputLine: campo de texto reutilizable con etiqueta y línea inferior.
// Para agregar un nuevo campo al formulario, basta con añadir otra línea
// <InputLine label="..." name="..." /> en el JSX de arriba.
function InputLine({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  autoComplete,
  compact,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  compact?: boolean;
}) {
  const rowStyle = compact ? lineRowMobile : lineRow;
  const labelStyle = compact ? lineLabelMobile : lineLabel;
  const inputStyle = compact ? lineInputMobile : lineInput;

  return (
    <div style={rowStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required ? <span style={requiredMark}>*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={inputStyle}
      />
    </div>
  );
}

// InfoItem: elemento de la barra de contacto (ícono + texto).
function InfoItem({ icon, text, compact }: { icon: ReactNode; text: string; compact?: boolean }) {
  const containerStyle = compact ? infoItemMobile : infoItem;
  const iconStyle = compact ? infoIconMobile : infoIcon;
  return (
    <div style={containerStyle}>
      <div style={iconStyle}>{icon}</div>
      <span>{text}</span>
    </div>
  );
}

// ============================================================
// Íconos SVG — incluidos directamente para no depender de una
// librería externa de íconos y mantener el bundle más liviano.
// ============================================================

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.6 12.6 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.6 12.6 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 4 8 8 8-8" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
