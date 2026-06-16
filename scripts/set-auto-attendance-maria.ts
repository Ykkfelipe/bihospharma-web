/**
 * Enable auto attendance ONLY for María Angélica Arenas Gómez.
 *   DATABASE_URL=file:./prod.db npx tsx scripts/set-auto-attendance-maria.ts
 */
import { PrismaClient } from "@prisma/client";

const MARIA_EMAIL = "mariaangelicaar02@gmail.com";
const MARIA_EXPECTED_NAME = "MARIA ANGELICA ARENAS";

const prisma = new PrismaClient();

async function main() {
    const maria = await prisma.user.findUnique({ where: { email: MARIA_EMAIL } });
    if (!maria) {
        throw new Error(`No se encontró usuario con email ${MARIA_EMAIL}`);
    }
    if (!maria.name.toUpperCase().includes(MARIA_EXPECTED_NAME)) {
        throw new Error(
            `El usuario ${MARIA_EMAIL} es "${maria.name}", no coincide con ${MARIA_EXPECTED_NAME}`
        );
    }

    await prisma.user.update({
        where: { email: MARIA_EMAIL },
        data: { autoAttendance: true },
    });
    console.log(`✅ autoAttendance=true — ${maria.email} (${maria.name})`);

    const disabled = await prisma.user.updateMany({
        where: {
            email: { not: MARIA_EMAIL },
            autoAttendance: true,
        },
        data: { autoAttendance: false },
    });
    if (disabled.count > 0) {
        console.log(`↩️  autoAttendance=false para ${disabled.count} otro(s) usuario(s)`);
    }

    const allMarias = await prisma.user.findMany({
        where: {
            OR: [
                { email: { contains: "maria" } },
                { name: { contains: "MARIA" } },
            ],
        },
        select: { email: true, name: true, autoAttendance: true },
    });
    console.log("\nUsuarios con «maria» en email o nombre:");
    for (const u of allMarias) {
        console.log(`  ${u.autoAttendance ? "✓ AUTO" : "  —"}  ${u.email} — ${u.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
