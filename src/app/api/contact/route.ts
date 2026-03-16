import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: ContactSubmission | null = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'No fue posible leer la solicitud.' }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ error: 'Solicitud vacía.' }, { status: 400 });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  // ─── Validación ──────────────────────────────────────────────────────────────
  const missing: string[] = [];
  if (!name) missing.push('Nombre');
  if (!email) missing.push('Correo electrónico');
  if (!subject) missing.push('Asunto');
  if (!message) missing.push('Mensaje');

  if (missing.length > 0) {
    return NextResponse.json({ error: `Faltan los campos: ${missing.join(', ')}` }, { status: 400 });
  }

  const emailPattern = /.+@.+\..+/i;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 });
  }

  // ─── Envío por SMTP ──────────────────────────────────────────────────────────
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.SMTP_USER;

  if (!to || !from) {
    console.info('[CONTACT] Credenciales SMTP no configuradas. Mensaje recibido de:', name, email);
    return NextResponse.json({ success: true, delivered: false });
  }

  try {
    await transporter.sendMail({
      from: `"Bihospharma Web" <${from}>`,
      to,
      replyTo: email, // Al hacer "Responder", el correo va directamente al remitente
      subject: `Contacto: ${subject}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: buildHtml({ name, email, subject, message }),
    });
  } catch (err) {
    console.error('[CONTACT] Error enviando correo:', err);
    return NextResponse.json(
      { error: 'No fue posible enviar el mensaje. Por favor inténtalo nuevamente.' },
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

function buildHtml(p: { name: string; email: string; subject: string; message: string }) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;">

<!-- PREHEADER (Hidden text for mobile notifications) -->
<div style="display:none;font-size:1px;color:#f1f5f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  Mensaje de ${escapeHtml(p.name)}: ${escapeHtml(p.subject)} 
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
            Formulario de Contacto
          </p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Arial,sans-serif;">
            Nuevo mensaje recibido
          </h1>
        </td>
      </tr>

      <!-- SENDER INFO -->
      <tr>
        <td style="padding:28px 40px 8px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            <tr style="background:#f8fafc;">
              <td style="padding:10px 16px;font-size:13px;color:#64748b;width:100px;border-bottom:1px solid #e2e8f0;">De</td>
              <td style="padding:10px 16px;font-size:13px;color:#1e293b;font-weight:600;border-bottom:1px solid #e2e8f0;">${escapeHtml(p.name)}</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:10px 16px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Correo</td>
              <td style="padding:10px 16px;font-size:13px;border-bottom:1px solid #e2e8f0;">
                <a href="mailto:${escapeHtml(p.email)}" style="color:#1d6fbf;text-decoration:none;">${escapeHtml(p.email)}</a>
              </td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 16px;font-size:13px;color:#64748b;">Asunto</td>
              <td style="padding:10px 16px;font-size:13px;color:#1e293b;font-weight:600;">${escapeHtml(p.subject)}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- MESSAGE -->
      <tr>
        <td style="padding:16px 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;
                           color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">
                  Mensaje
                </p>
                <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#1e293b;
                           line-height:1.6;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- REPLY HINT -->
      <tr>
        <td style="padding:0 40px 24px;text-align:center;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#64748b;">
            💡 Puedes responder directamente a este correo para contactar a <strong>${escapeHtml(p.name)}</strong>.
          </p>
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
            Este correo fue generado automáticamente desde el formulario de contacto.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

