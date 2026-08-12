/**
 * Welcome email sent when an admin provisions a portal account.
 * Includes temporary password + link to set a personal password.
 */
import crypto from "crypto";
import type { PrismaClient } from "@prisma/client";
import { transporter } from "./mailer";

const RESET_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days for first setup

export type AccountCreatedEmailInput = {
    email: string;
    name: string;
    temporaryPassword: string;
    /** Deliver to this address instead of `email` (tests). */
    to?: string;
};

export function buildAccountCreatedEmailHtml(input: {
    name: string;
    email: string;
    temporaryPassword: string;
    loginUrl: string;
    resetLink: string;
}): string {
    const { name, email, temporaryPassword, loginUrl, resetLink } = input;
    return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #0a2540, #0f4c8a); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 20px;">Bihospharma IPS</h1>
                            <p style="color: #b6d9f7; margin: 5px 0 0; font-size: 14px;">Cuenta del portal corporativo</p>
                        </div>
                        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; border-top: none;">
                            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                                Hola <strong>${escapeHtml(name)}</strong>,
                            </p>
                            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                                La creación de tu cuenta en el portal corporativo de Bihospharma IPS ya está lista.
                            </p>
                            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-bottom: 8px;">
                                Puedes ingresar con estos datos temporales:
                            </p>
                            <div style="background: #ffffff; border: 1px solid #d1d5db; border-radius: 10px; padding: 16px 18px; margin: 12px 0 20px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.04em;">Correo</p>
                                <p style="color: #111827; font-size: 15px; margin: 0 0 14px; font-weight: 600;">${escapeHtml(email)}</p>
                                <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.04em;">Contraseña temporal</p>
                                <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600; font-family: Consolas, Monaco, monospace;">${escapeHtml(temporaryPassword)}</p>
                            </div>
                            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                                Por seguridad, te recomendamos crear tu propia contraseña ahora mismo:
                            </p>
                            <div style="text-align: center; margin: 25px 0;">
                                <a href="${resetLink}" style="background: #0f4c8a; color: white; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                                    Crear mi contraseña
                                </a>
                            </div>
                            <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                                Este enlace para crear tu contraseña expira en <strong>7 días</strong>.
                                También puedes iniciar sesión con la contraseña temporal en
                                <a href="${loginUrl}" style="color: #0f4c8a;">${loginUrl}</a>
                                y luego usar «Olvidé mi contraseña» si lo necesitas.
                            </p>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                            <p style="color: #9ca3af; font-size: 11px; text-align: center;">
                                Bihospharma IPS — Acceso Corporativo
                            </p>
                        </div>
                    </div>
                `;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function isSmtpConfigured(): boolean {
    return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Creates a password-setup token and emails the new account credentials.
 * Returns null if SMTP is not configured (caller should log a warning).
 */
export async function sendAccountCreatedEmail(
    prisma: PrismaClient,
    input: AccountCreatedEmailInput
): Promise<{ resetLink: string; messageId?: string } | null> {
    if (!isSmtpConfigured()) {
        console.warn("[welcome-email] SMTP not configured; skipping account-created email.");
        return null;
    }

    const email = input.email.trim().toLowerCase();
    const to = (input.to ?? email).trim().toLowerCase();
    const baseUrl = (process.env.NEXTAUTH_URL || "https://bihospharma.com").replace(/\/$/, "");
    const loginUrl = `${baseUrl}/personal/login`;

    await prisma.passwordResetToken.deleteMany({ where: { email } });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + RESET_TTL_MS);
    await prisma.passwordResetToken.create({
        data: { email, token, expiresAt },
    });

    const resetLink = `${baseUrl}/personal/reset-password?token=${token}`;
    const html = buildAccountCreatedEmailHtml({
        name: input.name,
        email,
        temporaryPassword: input.temporaryPassword,
        loginUrl,
        resetLink,
    });

    const info = await transporter.sendMail({
        from: `"Bihospharma IPS" <${process.env.SMTP_USER}>`,
        to,
        subject: "Tu cuenta del portal ya está lista — Bihospharma IPS",
        html,
    });

    return { resetLink, messageId: info.messageId };
}
