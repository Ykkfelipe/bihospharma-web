/**
 * Add or update a specific batch of staff (production-safe — does not touch other users).
 *   DATABASE_URL=file:./prod.db npx tsx scripts/add-staff-batch.ts
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PASSWORD = process.env.STAFF_DEFAULT_PASSWORD || "BihosStaff2026!";

const BATCH = [
    { email: "carolina.bonilla@bihospharma.com", name: "CAROLINA BONILLA" },
    { email: "maria.montano@bihospharma.com", name: "MARIA MONTANO" },
    { email: "paola.rodriguez@bihospharma.com", name: "PAOLA RODRIGUEZ" },
];

async function main() {
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    for (const s of BATCH) {
        const existing = await prisma.user.findUnique({ where: { email: s.email } });
        const role = existing?.role ?? "employee";

        await prisma.user.upsert({
            where: { email: s.email },
            update: { name: s.name, role },
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
            },
        });
        console.log(`✅ ${existing ? "updated" : "created"} ${s.email} — ${s.name}`);
    }

    console.log(`\nListos. Pueden registrarse en /personal/register con su correo y el código de acceso del portal.`);
    console.log(`(Si aún no tienen cuenta propia, contraseña temporal del seed: ${PASSWORD})`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
