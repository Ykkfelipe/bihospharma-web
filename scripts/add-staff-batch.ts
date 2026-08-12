/**
 * Add or update a specific batch of staff (production-safe — does not touch other users).
 *   DATABASE_URL=file:./prod.db npx tsx scripts/add-staff-batch.ts
 *
 * New accounts receive a welcome email (temp password + link to set password).
 * Set SEND_WELCOME_EMAIL=0 to skip.
 */
import path from "path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { STANDARD_SCHEDULE } from "../src/lib/work-schedule";
import { sendAccountCreatedEmail } from "../src/lib/portal-welcome-email";

const prisma = new PrismaClient();
const PASSWORD = process.env.STAFF_DEFAULT_PASSWORD || "BihosStaff2026!";

const BATCH = [
    { email: "martha.avella@bihospharma.com", name: "MARTHA ROCIO AVELLA ROJAS" },
];

async function loadEnv() {
    try {
        const dotenv = await import("dotenv");
        dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
        dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
        dotenv.config();
    } catch {
        // dotenv is optional when env vars are already exported
    }
}

async function main() {
    await loadEnv();
    if (!process.env.NEXTAUTH_URL) {
        process.env.NEXTAUTH_URL = "https://bihospharma.com";
    }

    const passwordHash = await bcrypt.hash(PASSWORD, 10);
    const sendWelcome = process.env.SEND_WELCOME_EMAIL !== "0";

    for (const s of BATCH) {
        const existing = await prisma.user.findUnique({ where: { email: s.email } });
        const role = existing?.role ?? "employee";
        const created = !existing;

        await prisma.user.upsert({
            where: { email: s.email },
            update: { name: s.name, role },
            create: {
                email: s.email,
                passwordHash,
                name: s.name,
                role,
                ...STANDARD_SCHEDULE,
            },
        });
        console.log(`✅ ${created ? "created" : "updated"} ${s.email} — ${s.name}`);

        if (created && sendWelcome) {
            const mail = await sendAccountCreatedEmail(prisma, {
                email: s.email,
                name: s.name,
                temporaryPassword: PASSWORD,
            });
            if (mail) {
                console.log(`   ✉️  welcome email sent`);
            }
        }
    }

    console.log(`\nListos. Contraseña temporal del seed: ${PASSWORD}`);
    console.log(`Pueden entrar en /personal/login o crear su contraseña desde el correo de bienvenida.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
