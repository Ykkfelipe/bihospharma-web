import type { CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// PQRS Form — Style constants
// ---------------------------------------------------------------------------
// I moved all styles here to keep PQRSFormCard.tsx focused on logic and
// structure. Having 600+ lines mixing layout and styles in one file felt
// hard to navigate when debugging.
// ---------------------------------------------------------------------------

export const outerShell: CSSProperties = {
    width: '100%',
    maxWidth: 780,
    background: 'rgba(255,255,255,0.96)',
    padding: '32px 32px 42px',
    borderRadius: 30,
    boxShadow: '0 20px 42px rgba(23, 54, 94, 0.18)',
    border: '1px solid rgba(15, 35, 66, 0.06)',
};

export const formShell: CSSProperties = {
    position: 'relative',
    background: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
};

// Subtle brand watermark behind the form content — purely decorative,
// so pointerEvents is disabled to avoid blocking input fields.
export const watermarkLayer: CSSProperties = {
    position: 'absolute',
    inset: '180px 0 220px',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
    opacity: 0.18,
};

export const topBanner: CSSProperties = {
    position: 'relative',
    height: 170,
    overflow: 'hidden',
};

export const topGradient: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(130deg, #061c33 0%, #0b4f87 45%, #0f83c1 80%, #4fc9f2 100%)',
};

export const topInnerArc: CSSProperties = {
    position: 'absolute',
    left: -220,
    top: -180,
    width: 460,
    height: 460,
    borderRadius: '50%',
    background: 'linear-gradient(150deg, rgba(255,255,255,0.42) 0%, rgba(21,96,152,0.35) 55%, rgba(8,50,90,0.08) 100%)',
};

export const topSoftArc: CSSProperties = {
    position: 'absolute',
    left: -70,
    top: -70,
    width: 320,
    height: 220,
    borderRadius: '0 0 190px 190px',
    background: 'linear-gradient(150deg, rgba(255,255,255,0.65) 0%, rgba(109,196,235,0.4) 70%, rgba(12,92,149,0) 100%)',
};

export const topWaveDark: CSSProperties = {
    position: 'absolute',
    left: -130,
    bottom: -60,
    width: 360,
    height: 190,
    borderRadius: '0 150px 140px 0',
    background: 'linear-gradient(130deg, rgba(4,30,57,0.78) 0%, rgba(4,49,82,0.58) 68%, rgba(4,49,82,0) 100%)',
};

export const topWaveLight: CSSProperties = {
    position: 'absolute',
    left: -50,
    bottom: -72,
    width: 330,
    height: 170,
    borderRadius: '0 150px 140px 0',
    background: 'linear-gradient(130deg, rgba(42,154,205,0.72) 0%, rgba(42,154,205,0.36) 65%, rgba(42,154,205,0) 100%)',
};

export const topRightGlow: CSSProperties = {
    position: 'absolute',
    right: -120,
    top: -110,
    width: 320,
    height: 320,
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.04) 100%)',
};

export const logoBadge: CSSProperties = {
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

export const contentBody: CSSProperties = {
    padding: '2.4rem 2.8rem 2.6rem',
    position: 'relative',
    zIndex: 1,
};

export const formTitle: CSSProperties = {
    textAlign: 'center',
    color: '#0f2342',
    fontWeight: 800,
    letterSpacing: 1.1,
    fontSize: '1.08rem',
    textTransform: 'uppercase',
};

export const gridTwoCols: CSSProperties = {
    marginTop: 28,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px 28px',
};

export const pairRow: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 20,
};

export const sectionLabel: CSSProperties = {
    marginBottom: 12,
    color: '#102b49',
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 0.2,
};

// The 5 request type buttons sit inside this grid. Each button gets
// a right border except the last one — done with conditional styles
// in the component based on index.
export const typeGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    border: '1.4px solid #1c3559',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fdfefe',
};

export const typePill: CSSProperties = {
    padding: '10px 8px',
    border: 'none',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.18s ease',
};

export const textareaField: CSSProperties = {
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

export const submitButton: CSSProperties = {
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

export const disclaimerText: CSSProperties = {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
    letterSpacing: 0.15,
};

export const feedbackText: CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    textAlign: 'center',
};

export const contactBar: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    padding: '1.05rem 2rem',
    background: '#f4f7fb',
};

export const infoItem: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: '#0f2342',
    fontWeight: 600,
    fontSize: 12,
};

export const infoIcon: CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: 6,
    background: '#0d84c1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
};

// Mobile variants — spread the base style and override only what changes.
// This avoids repeating shared values and makes diffs easier to read.
export const infoItemMobile: CSSProperties = {
    ...infoItem,
    fontSize: 11,
    gap: 8,
};

export const infoIconMobile: CSSProperties = {
    ...infoIcon,
    width: 24,
    height: 24,
};

export const bottomBanner: CSSProperties = {
    position: 'relative',
    height: 90,
    overflow: 'hidden',
};

export const bottomBlueOne: CSSProperties = {
    position: 'absolute',
    left: -90,
    bottom: -70,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: '#1c3d67',
};

export const bottomBlueTwo: CSSProperties = {
    position: 'absolute',
    left: 40,
    bottom: -90,
    width: 240,
    height: 230,
    borderRadius: '50%',
    background: '#1070aa',
};

export const bottomGray: CSSProperties = {
    position: 'absolute',
    right: -90,
    bottom: -110,
    width: 280,
    height: 240,
    borderRadius: '50%',
    background: '#dce3ea',
};

// ---------------------------------------------------------------------------
// InputLine sub-component styles
// ---------------------------------------------------------------------------

export const lineRow: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'max-content minmax(0, 1fr)',
    alignItems: 'end',
    gap: 10,
};

// On mobile the label and input stack vertically instead of sitting side by side.
export const lineRowMobile: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 4,
};

export const lineLabel: CSSProperties = {
    whiteSpace: 'nowrap',
    color: '#0f2342',
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 0.2,
};

export const lineLabelMobile: CSSProperties = {
    ...lineLabel,
    whiteSpace: 'normal',
    fontSize: 12,
};

export const requiredMark: CSSProperties = {
    marginLeft: 4,
    color: '#b42318',
};

// Intentionally borderless on the sides — only a bottom border to give it
// an underline look, which feels cleaner on this white card background.
export const lineInput: CSSProperties = {
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

export const lineInputMobile: CSSProperties = {
    ...lineInput,
    fontSize: 13,
    padding: '3px 0 1px',
};
