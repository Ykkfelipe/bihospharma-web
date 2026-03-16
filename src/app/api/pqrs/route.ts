import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

const allowedTypes = new Set(['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Felicitación']);

type PQRSSubmission = {
  date: string;
  registrantName: string;
  registrantId: string;
  phone: string;
  eps?: string;
  email: string;
  address?: string;
  requestType: string;
  description: string;
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: PQRSSubmission | null = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'No fue posible leer la solicitud.' }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ error: 'Solicitud vacía.' }, { status: 400 });
  }

  const payload = {
    date: sanitize(body.date),
    registrantName: sanitize(body.registrantName),
    registrantId: sanitize(body.registrantId),
    phone: sanitize(body.phone),
    eps: sanitize(body.eps),
    email: sanitize(body.email),
    address: sanitize(body.address),
    requestType: sanitize(body.requestType),
    description: sanitize(body.description),
  };

  // ─── Validación de campos obligatorios ──────────────────────────────────────
  const missing: string[] = [];
  if (!payload.date) missing.push('Fecha');
  if (!payload.registrantName) missing.push('Nombre y apellidos de quien registra');
  if (!payload.registrantId) missing.push('Documento de identidad de quien registra');
  if (!payload.phone) missing.push('Teléfono');
  if (!payload.email) missing.push('Correo electrónico');
  if (!payload.requestType) missing.push('Tipo de solicitud');
  if (!payload.description) missing.push('Descripción');

  if (missing.length > 0) {
    return NextResponse.json({ error: `Faltan los campos: ${missing.join(', ')}` }, { status: 400 });
  }

  if (!allowedTypes.has(payload.requestType)) {
    return NextResponse.json({ error: 'Selecciona un tipo de solicitud válido.' }, { status: 400 });
  }

  const emailPattern = /.+@.+\..+/i;
  if (!emailPattern.test(payload.email)) {
    return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 });
  }

  // ─── Envío del correo por SMTP (Nodemailer) ──────────────────────────────────
  const to = process.env.PQRS_EMAIL_TO;
  const from = process.env.SMTP_USER;

  if (!to || !from) {
    // Si no hay credenciales configuradas, registramos en consola y respondemos OK
    // para que el formulario no muestre error al usuario durante desarrollo sin .env.
    console.info('[PQRS] Credenciales SMTP no configuradas. Solicitud recibida:\n', payload);
    return NextResponse.json({ success: true, delivered: false });
  }

  try {
    await transporter.sendMail({
      from: `"Bihospharma PQRS" <${from}>`,
      to,
      subject: `PQRS (${payload.requestType}) — ${payload.registrantName}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });
  } catch (err) {
    console.error('[PQRS] Error enviando correo:', err);
    return NextResponse.json(
      { error: 'No fue posible enviar la solicitud. Por favor inténtalo nuevamente.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, delivered: true });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sanitize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Fields = {
  date: string;
  registrantName: string;
  registrantId: string;
  phone: string;
  eps: string;
  email: string;
  address: string;
  requestType: string;
  description: string;
};

function buildText(p: Fields) {
  return [
    `Tipo de solicitud: ${p.requestType}`,
    `Fecha: ${p.date}`,
    `Registrante: ${p.registrantName}`,
    `Documento registrante: ${p.registrantId}`,
    `Teléfono: ${p.phone}`,
    `EPS: ${p.eps || 'N/A'}`,
    `Correo electrónico: ${p.email}`,
    `Dirección: ${p.address || 'N/A'}`,
    '',
    'Descripción:',
    p.description,
  ].join('\n');
}

function buildHtml(p: Fields) {
  const typeColors: Record<string, string> = {
    'Petición': '#1d6fbf',
    'Queja': '#c0392b',
    'Reclamo': '#e67e22',
    'Sugerencia': '#27ae60',
    'Felicitación': '#8e44ad',
  };
  const badgeColor = typeColors[p.requestType] ?? '#0f2342';

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;">

<!-- PREHEADER (Hidden text for mobile notifications) -->
<div style="display:none;font-size:1px;color:#f1f5f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  Nueva PQRS (${escapeHtml(p.requestType)}) de ${escapeHtml(p.registrantName)}
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,35,66,0.10);">

      <!-- HEADER -->
      <tr>
        <td style="background:linear-gradient(135deg,#0a2540 0%,#0f4c8a 100%);padding:32px 40px;text-align:center;">
          <img src="https://bihospharma.com/logos/bihos-logo.png" alt="Bihospharma" width="80" height="80"
               style="display:block;margin:0 auto 16px;border-radius:50%;background:#fff;padding:6px;"/>
          <p style="margin:0;color:#b6d9f7;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">
            Formulario PQRS
          </p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Arial,sans-serif;">
            Nueva solicitud recibida
          </h1>
        </td>
      </tr>

      <!-- TYPE BADGE -->
      <tr>
        <td style="padding:20px 40px 0;text-align:center;">
          <span style="display:inline-block;background:${badgeColor};color:#fff;font-family:Arial,sans-serif;
                       font-size:13px;font-weight:bold;letter-spacing:0.8px;padding:6px 20px;border-radius:20px;">
            ${escapeHtml(p.requestType).toUpperCase()}
          </span>
        </td>
      </tr>

      <!-- DATA TABLE -->
      <tr>
        <td style="padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            ${tableRow('Fecha', escapeHtml(p.date), true)}
            ${tableRow('Registrante', escapeHtml(p.registrantName), false)}
            ${tableRow('Documento', escapeHtml(p.registrantId), true)}
            ${tableRow('Teléfono', escapeHtml(p.phone), false)}
            ${tableRow('EPS', escapeHtml(p.eps || 'N/A'), true)}
            ${tableRow('Correo', escapeHtml(p.email), false)}
            ${tableRow('Dirección', escapeHtml(p.address || 'N/A'), true)}
          </table>
        </td>
      </tr>

      <!-- DESCRIPTION -->
      <tr>
        <td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;
                           color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">
                  Descripción de la manifestación
                </p>
                <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#1e293b;
                           line-height:1.6;white-space:pre-wrap;">${escapeHtml(p.description)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#0a2540;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#94a3b8;">
            Bihospharma IPS &bull; <a href="https://bihospharma.com" style="color:#60a5fa;text-decoration:none;">bihospharma.com</a>
            &bull; info@bihospharma.com
          </p>
          <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#475569;">
            Este correo fue generado automáticamente. Por favor no responda a este mensaje.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function tableRow(label: string, value: string, shaded: boolean) {
  const bg = shaded ? '#f8fafc' : '#ffffff';
  return `<tr style="background:${bg};">
    <td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:13px;color:#64748b;
               width:160px;border-bottom:1px solid #e2e8f0;">${label}</td>
    <td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:13px;color:#1e293b;
               font-weight:600;border-bottom:1px solid #e2e8f0;">${value}</td>
  </tr>`;
}

