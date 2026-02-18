'use client';

import Image from 'next/image';
import { useState, useEffect, type CSSProperties, type FormEvent, type ReactNode } from 'react';

const requestTypes = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Felicitación'] as const;
type RequestType = (typeof requestTypes)[number];
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const MOBILE_BREAKPOINT = 720;

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
  // signature removed per UX feedback; registrant name & id used instead
};

export default function PQRSFormCard() {
  const [selectedType, setSelectedType] = useState<RequestType | ''>('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [isCompact, setIsCompact] = useState(false);

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

  useEffect(() => {
    function handleResize() {
      setIsCompact(window.innerWidth <= MOBILE_BREAKPOINT);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetFeedback = () => {
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

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

    const emailPattern = /.+@.+\..+/i;
    if (!emailPattern.test(payload.email)) {
      setStatus('error');
      setMessage('Ingresa un correo electrónico válido.');
      return;
    }

    try {
      setStatus('submitting');
      setMessage('');
      const response = await fetch('/api/pqrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: 'No fue posible enviar la solicitud.' }));
        throw new Error(error ?? 'No fue posible enviar la solicitud.');
      }

      setStatus('success');
      setMessage('Tu PQRS fue enviada. Pronto nos comunicaremos contigo.');
      setSelectedType('');
      event.currentTarget.reset();
    } catch (err) {
      console.error('Error enviando PQRS:', err);
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'No fue posible enviar la solicitud. Inténtalo nuevamente.');
    }
  };

  return (
    <div style={outerStyles}>
      <form onSubmit={handleSubmit} onChange={resetFeedback} noValidate style={formShell}>
        <div style={watermarkLayer}>
          <Image
            src="/logos/bihos-logo.png"
            alt="Marca de agua Bihospharma"
            width={360}
            height={360}
            style={{ objectFit: 'contain', transform: 'translateY(18px) scale(1.16)', opacity: 0.92, filter: 'drop-shadow(0 18px 36px rgba(15,35,66,0.12))' }}
          />
        </div>

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

        <div style={contentStyles}>
          <h1 style={formTitle}>PETICIÓN, QUEJA, RECLAMO, SUGERENCIA O FELICITACIÓN</h1>

          <div style={gridStyles}>
            <InputLine label="Fecha:" name="date" placeholder="DD/MM/AAAA" required compact={isCompact} />
            {/* Nombre y documento del registrante se solicitan al final del formulario */}
            <div style={pairStyles}>
              <InputLine label="Tel:" name="phone" placeholder="Teléfono" required compact={isCompact} />
              <InputLine label="EPS:" name="eps" placeholder="EPS" compact={isCompact} />
            </div>
            <InputLine label="Correo electrónico:" name="email" type="email" placeholder="ejemplo@correo.com" required autoComplete="email" compact={isCompact} />
            <InputLine label="Dirección:" name="address" placeholder="Dirección" compact={isCompact} />
          </div>

          <div style={{ marginTop: 26 }}>
            <div style={sectionLabelStyle}>Marque con una X según corresponda:</div>
            <input type="hidden" name="requestType" value={selectedType} />
            <div style={typeGridStyles}>
              {requestTypes.map((type, index) => {
                const isActive = selectedType === type;
                const isLastItem = index === requestTypes.length - 1;
                const isLastColumn = !isCompact
                  ? isLastItem
                  : index % 2 === 1 || isLastItem;
                const lastRowThreshold = requestTypes.length - (requestTypes.length % 2 === 0 ? 2 : 1);
                const needsBottomBorder = isCompact && index < lastRowThreshold;
                const columnSpan = isCompact && isLastItem && requestTypes.length % 2 !== 0 ? 'span 2' : 'auto';
                return (
                  <button
                    key={type}
                    type="button"
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

          <div style={{ marginTop: 38 }}>
            <div style={sectionLabel}>Datos de quien registra la solicitud</div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr', gap: 12 }}>
              <InputLine label="Nombre de quien registra:" name="registrantName" placeholder="Nombre completo" required compact={isCompact} />
              <InputLine label="Documento de quien registra:" name="registrantId" placeholder="Número" required compact={isCompact} />
            </div>
            <p style={{ ...disclaimerStyles, marginTop: 12 }}>Puedes registrar la solicitud a nombre de un familiar o tercero si es necesario.</p>
          </div>

          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              type="submit"
              style={{
                ...submitStyles,
                opacity: status === 'submitting' ? 0.75 : 1,
                cursor: status === 'submitting' ? 'wait' : 'pointer',
              }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Enviando...' : 'Enviar PQRS'}
            </button>
            <p style={disclaimerStyles}>Al enviar este formulario autorizas el tratamiento de tus datos para responder a tu solicitud de PQRS.</p>
            {status === 'success' && (
              <p style={{ ...feedbackStyles, color: '#0d7a4d' }} role="status" aria-live="polite">{message}</p>
            )}
            {status === 'error' && (
              <p style={{ ...feedbackStyles, color: '#b42318' }} role="alert">{message}</p>
            )}
          </div>
        </div>

        <div style={contactStyles}>
          <InfoItem icon={<PhoneIcon />} text="Cel: +57 (320) 316 5870" compact={isCompact} />
          <InfoItem icon={<WebIcon />} text="www.bihospharma.com" compact={isCompact} />
          <InfoItem icon={<MailIcon />} text="info@bihospharma.com" compact={isCompact} />
          <InfoItem icon={<MapIcon />} text="Carrera 25 # 4A-14 Bogotá" compact={isCompact} />
        </div>

        <div style={bottomBanner}>
          <div style={bottomBlueOne} />
          <div style={bottomBlueTwo} />
          <div style={bottomGray} />
        </div>
      </form>
    </div>
  );
}

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

const outerShell: CSSProperties = {
  width: '100%',
  maxWidth: 780,
  background: 'rgba(255,255,255,0.96)',
  padding: '32px 32px 42px',
  borderRadius: 30,
  boxShadow: '0 20px 42px rgba(23, 54, 94, 0.18)',
  border: '1px solid rgba(15, 35, 66, 0.06)',
};

const formShell: CSSProperties = {
  position: 'relative',
  background: '#fff',
  borderRadius: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const watermarkLayer: CSSProperties = {
  position: 'absolute',
  inset: '180px 0 220px',
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none',
  opacity: 0.18,
};

const topBanner: CSSProperties = {
  position: 'relative',
  height: 170,
  overflow: 'hidden',
};

const topGradient: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(130deg, #061c33 0%, #0b4f87 45%, #0f83c1 80%, #4fc9f2 100%)',
};

const topInnerArc: CSSProperties = {
  position: 'absolute',
  left: -220,
  top: -180,
  width: 460,
  height: 460,
  borderRadius: '50%',
  background: 'linear-gradient(150deg, rgba(255,255,255,0.42) 0%, rgba(21,96,152,0.35) 55%, rgba(8,50,90,0.08) 100%)',
};

const topSoftArc: CSSProperties = {
  position: 'absolute',
  left: -70,
  top: -70,
  width: 320,
  height: 220,
  borderRadius: '0 0 190px 190px',
  background: 'linear-gradient(150deg, rgba(255,255,255,0.65) 0%, rgba(109,196,235,0.4) 70%, rgba(12,92,149,0) 100%)',
};

const topWaveDark: CSSProperties = {
  position: 'absolute',
  left: -130,
  bottom: -60,
  width: 360,
  height: 190,
  borderRadius: '0 150px 140px 0',
  background: 'linear-gradient(130deg, rgba(4,30,57,0.78) 0%, rgba(4,49,82,0.58) 68%, rgba(4,49,82,0) 100%)',
};

const topWaveLight: CSSProperties = {
  position: 'absolute',
  left: -50,
  bottom: -72,
  width: 330,
  height: 170,
  borderRadius: '0 150px 140px 0',
  background: 'linear-gradient(130deg, rgba(42,154,205,0.72) 0%, rgba(42,154,205,0.36) 65%, rgba(42,154,205,0) 100%)',
};

const topRightGlow: CSSProperties = {
  position: 'absolute',
  right: -120,
  top: -110,
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'radial-gradient(circle at center, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.04) 100%)',
};

const logoBadge: CSSProperties = {
  position: 'absolute',
  right: 32,
  top: 28,
  width: 118,
  height: 118,
  borderRadius: 26,
  background: '#fff',
  boxShadow: '0 12px 26px rgba(15, 52, 94, 0.22)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentBody: CSSProperties = {
  padding: '2.4rem 2.8rem 2.6rem',
  position: 'relative',
  zIndex: 1,
};

const formTitle: CSSProperties = {
  textAlign: 'center',
  color: '#0f2342',
  fontWeight: 800,
  letterSpacing: 1.1,
  fontSize: '1.08rem',
  textTransform: 'uppercase',
};

const gridTwoCols: CSSProperties = {
  marginTop: 28,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '16px 28px',
};

const pairRow: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 20,
};

const sectionLabel: CSSProperties = {
  marginBottom: 12,
  color: '#102b49',
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: 0.2,
};

const typeGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  border: '1.4px solid #1c3559',
  borderRadius: 8,
  overflow: 'hidden',
  background: '#fdfefe',
};

const typePill: CSSProperties = {
  padding: '10px 8px',
  border: 'none',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.18s ease',
};

const textareaField: CSSProperties = {
  width: '100%',
  borderRadius: 14,
  border: '1.4px solid rgba(15,35,66,0.28)',
  padding: '16px 16px',
  fontSize: 14,
  color: '#0f2342',
  resize: 'vertical',
  minHeight: 150,
  background: 'transparent',
  outline: 'none',
  lineHeight: 1.55,
};

const submitButton: CSSProperties = {
  padding: '0.9rem 1.2rem',
  borderRadius: 999,
  border: 'none',
  background: 'linear-gradient(135deg, #0a4c7a 0%, #0e8abf 48%, #16bbe8 100%)',
  color: '#fff',
  fontWeight: 800,
  letterSpacing: 0.35,
  fontSize: '0.98rem',
  cursor: 'pointer',
  boxShadow: '0 12px 24px rgba(10, 76, 122, 0.3)',
  transition: 'transform 0.18s ease',
};

const disclaimerText: CSSProperties = {
  fontSize: 12,
  color: '#4b5563',
  textAlign: 'center',
  letterSpacing: 0.15,
};

const feedbackText: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  textAlign: 'center',
};

const contactBar: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  justifyContent: 'center',
  padding: '1.05rem 2rem',
  background: '#f4f7fb',
};

const infoItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: '#0f2342',
  fontWeight: 600,
  fontSize: 12,
};

const infoIcon: CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 6,
  background: '#0d84c1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
};

const infoItemMobile: CSSProperties = {
  ...infoItem,
  fontSize: 11,
  gap: 8,
};

const infoIconMobile: CSSProperties = {
  ...infoIcon,
  width: 24,
  height: 24,
};

const bottomBanner: CSSProperties = {
  position: 'relative',
  height: 90,
  overflow: 'hidden',
};

const bottomBlueOne: CSSProperties = {
  position: 'absolute',
  left: -90,
  bottom: -70,
  width: 220,
  height: 220,
  borderRadius: '50%',
  background: '#1c3d67',
};

const bottomBlueTwo: CSSProperties = {
  position: 'absolute',
  left: 40,
  bottom: -90,
  width: 240,
  height: 230,
  borderRadius: '50%',
  background: '#1070aa',
};

const bottomGray: CSSProperties = {
  position: 'absolute',
  right: -90,
  bottom: -110,
  width: 280,
  height: 240,
  borderRadius: '50%',
  background: '#dce3ea',
};

const lineRow: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content minmax(0, 1fr)',
  alignItems: 'end',
  gap: 10,
};

const lineRowMobile: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 4,
};

const lineLabel: CSSProperties = {
  whiteSpace: 'nowrap',
  color: '#0f2342',
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: 0.2,
};

const lineLabelMobile: CSSProperties = {
  ...lineLabel,
  whiteSpace: 'normal',
  fontSize: 12,
};

const requiredMark: CSSProperties = {
  marginLeft: 4,
  color: '#b42318',
};

const lineInput: CSSProperties = {
  minWidth: 0,
  border: 'none',
  borderBottom: '1.6px solid #0f2342',
  padding: '4px 0 2px',
  fontSize: 14,
  color: '#0f2342',
  background: 'transparent',
  outline: 'none',
  fontFamily: 'inherit',
};

const lineInputMobile: CSSProperties = {
  ...lineInput,
  fontSize: 13,
  padding: '3px 0 1px',
};
