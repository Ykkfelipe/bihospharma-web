import { NextRequest, NextResponse } from 'next/server';

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
  // signature removed; registrant name & id are required
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
    // signature intentionally not captured
  };

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

  const summary = buildSummary(payload);

  const delivered = (await deliverViaResend(summary)) || (await deliverViaWebhook(summary));

  if (!delivered) {
    console.info('[PQRS] Nueva solicitud recibida (sin integración configurada):\n', summary.text);
  }

  return NextResponse.json({ success: true, delivered });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

async function deliverViaResend(summary: SummaryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PQRS_EMAIL_TO;

  if (!apiKey || !to) {
    return false;
  }

  const recipients = to.split(',').map((item) => item.trim()).filter(Boolean);
  if (recipients.length === 0) {
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.PQRS_EMAIL_FROM ?? 'pqrs@bihospharma.com',
      to: recipients,
      subject: `PQRS (${summary.type}) - ${summary.registrantName}`,
      text: summary.text,
      html: summary.html,
    }),
  });

  if (!response.ok) {
    console.error('[PQRS] Error enviando con Resend:', await response.text());
    return false;
  }

  return true;
}

async function deliverViaWebhook(summary: SummaryPayload) {
  const webhookUrl = process.env.PQRS_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(summary),
    });

    if (!response.ok) {
      console.error('[PQRS] Error enviando al webhook:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('[PQRS] Error conectando al webhook:', error);
    return false;
  }
}

type FormFields = {
  date: string;
  registrantName: string;
  registrantId: string;
  phone: string;
  eps: string;
  email: string;
  address: string;
  requestType: string;
  description: string;
  // signature removed
};

type SummaryPayload = FormFields & {
  type: string;
  text: string;
  html: string;
};

function buildSummary(payload: FormFields): SummaryPayload {
  return {
    ...payload,
    type: payload.requestType,
    text: `Fecha: ${payload.date}\nRegistrante: ${payload.registrantName}\nDocumento registrante: ${payload.registrantId}\nTeléfono: ${payload.phone}\nEPS: ${payload.eps || 'N/A'}\nCorreo electrónico: ${payload.email}\nDirección: ${payload.address || 'N/A'}\nTipo de solicitud: ${payload.requestType}\nDescripción:\n${payload.description}`,
    html: `
      <h2 style="font-family:Arial,Helvetica,sans-serif;color:#0f2342;margin:0 0 12px">Nueva PQRS (${escapeHtml(payload.requestType)})</h2>
      <ul style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;padding:0;list-style:none;margin:0 0 16px">
        <li><strong>Fecha:</strong> ${escapeHtml(payload.date)}</li>
        <li><strong>Registrante:</strong> ${escapeHtml(payload.registrantName)}</li>
        <li><strong>Documento registrante:</strong> ${escapeHtml(payload.registrantId)}</li>
        <li><strong>Teléfono:</strong> ${escapeHtml(payload.phone)}</li>
        <li><strong>EPS:</strong> ${escapeHtml(payload.eps || 'N/A')}</li>
        <li><strong>Correo electrónico:</strong> ${escapeHtml(payload.email)}</li>
        <li><strong>Dirección:</strong> ${escapeHtml(payload.address || 'N/A')}</li>
        <li><strong>Tipo de solicitud:</strong> ${escapeHtml(payload.requestType)}</li>
      </ul>
      <p style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;margin:0 0 16px"><strong>Descripción:</strong><br/>${escapeHtml(payload.description).replace(/\n/g, '<br/>')}</p>
    `,
  };
}

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
