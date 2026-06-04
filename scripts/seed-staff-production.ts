/**
 * Crea/actualiza personal en producción con horarios.
 *   npx tsx scripts/seed-staff-production.ts
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config();

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PASSWORD = process.env.STAFF_DEFAULT_PASSWORD || "BihosStaff2026!";

const STAFF: Array<{
    email: string;
    name: string;
    role?: "admin" | "employee";
    satWorkStart?: string;
    satWorkEnd?: string;
}> = [
    { email: "amanda.bonilla@bihospharma.com", name: "AMANDA  BONILLA ROZO" },
    {
        email: "mariaangelicaar02@gmail.com",
        name: "MARIA ANGELICA ARENAS GOMEZ",
        satWorkStart: "08:00",
        satWorkEnd: "12:00",
    },
    { email: "duglas.cifuentes@bihospharma.com", name: "DUGLAS MIGUEL CIFUENTES MARTINEZ", role: "admin" },
    { email: "luis.bello@bihospharma.com", name: "LUIS ERNESTO BELLO VILLARREAL" },
    { email: "juan.solano@bihospharma.com", name: "JUAN PABLO SOLANO ROMERO" },
    { email: "johanna.ruiz@bihospharma.com", name: "ANDREA JOHANNA RUIZ GIL" },
    { email: "alexander.solano@bihospharma.com", name: "FRANQUI ALEXANDER SOLANO ROZO" },
    { email: "yaneth.alfonso@bihospharma.com", name: "YANETH ALFONSO  SEPULVEDA" },
    { email: "dorisnieto177@gmail.com", name: "DORIS  ALVARADO NIETO" },
    { email: "sonia.gomez@bihospharma.com", name: "SONIA MARCELA GOMEZ ACOSTA" },
    { email: "julian.villamil@bihospharma.com", name: "JULIAN DAVID VILLAMIL BENAVIDES" },
    { email: "ingridt.tumay@bihospharma.com", name: "INGRIDT ANGELICA TUMAY" },
];

async function main() {
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    for (const s of STAFF) {
        const existing = await prisma.user.findUnique({ where: { email: s.email } });
        const role = s.role ?? existing?.role ?? "employee";

        await prisma.user.upsert({
            where: { email: s.email },
            update: {
                name: s.name,
                role,
                workStart: "07:30",
                morningEnd: "13:00",
                lunchStart: "13:00",
                lunchEnd: "14:00",
                workEnd: "17:30",
                satWorkStart: s.satWorkStart ?? null,
                satWorkEnd: s.satWorkEnd ?? null,
            },
            create: {
                email: s.email,
                passwordHash,
                name: s.name,
                role,
                workStart: "07:30",
                morningEnd: "13:00",
                lunchStart: "13:00",
                lunchEnd: "14:00",
                workEnd: "17:30",
                satWorkStart: s.satWorkStart ?? null,
                satWorkEnd: s.satWorkEnd ?? null,
            },
        });
        console.log(`✅ ${s.email} — ${s.name}`);
    }

    console.log(`\nContraseña temporal para todos: ${PASSWORD}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
