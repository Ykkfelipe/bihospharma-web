import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "El correo es obligatorio." }, { status: 400 });
        }

        // Always return success for security (don't reveal if email exists)
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            // Delete any old tokens for this email
            await prisma.passwordResetToken.deleteMany({ where: { email } });

            // Generate a secure token
            const token = crypto.randomBytes(32).toString("hex");
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

            await prisma.passwordResetToken.create({
                data: { email, token, expiresAt },
            });

            // Build the reset link
            const baseUrl = process.env.NEXTAUTH_URL || "https://bihospharma.com";
            const resetLink = `${baseUrl}/personal/reset-password?token=${token}`;

            // Send the email
            await transporter.sendMail({
                from: `"Bihospharma IPS" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Restablecer contraseña — Bihospharma IPS",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #0a2540, #0f4c8a); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 20px;">Bihospharma IPS</h1>
                            <p style="color: #b6d9f7; margin: 5px 0 0; font-size: 14px;">Restablecer contraseña</p>
                        </div>
                        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; border-top: none;">
                            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                                Hola <strong>${user.name}</strong>,
                            </p>
                            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                                Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva:
                            </p>
                            <div style="text-align: center; margin: 25px 0;">
                                <a href="${resetLink}" style="background: #0f4c8a; color: white; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                                    Restablecer mi contraseña
                                </a>
                            </div>
                            <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                                Este enlace expira en <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este correo.
                            </p>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                            <p style="color: #9ca3af; font-size: 11px; text-align: center;">
                                Bihospharma IPS — Acceso Corporativo
                            </p>
                        </div>
                    </div>
                `,
            });
        }

        // Always return success (don't reveal if email exists)
        return NextResponse.json({
            message: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
        });
    } catch (error) {
        console.error("[forgot-password] Error:", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
