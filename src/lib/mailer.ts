/**
 * mailer.ts — Transporter de Nodemailer compartido
 *
 * Todas las rutas de API que necesiten enviar correos importan `transporter`
 * desde este archivo. La configuración se toma de las variables de entorno
 * definidas en .env.local (nunca se deben hardcodear credenciales aquí).
 *
 * Variables requeridas:
 *   SMTP_HOST  — servidor SMTP (ej. smtp.gmail.com)
 *   SMTP_PORT  — puerto (465 para SSL, 587 para TLS)
 *   SMTP_USER  — correo del remitente
 *   SMTP_PASS  — contraseña de aplicación
 */

import nodemailer from 'nodemailer';

const port = parseInt(process.env.SMTP_PORT ?? '465', 10);

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port,
    secure: port === 465, // true para 465 (SSL), false para 587 (STARTTLS)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
