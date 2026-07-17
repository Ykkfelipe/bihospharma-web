/**
 * Aplica cambios de horario (Jul 2026) y correo de Carolina en la BD activa.
 *   DATABASE_URL=file:./prod.db npx tsx scripts/apply-schedule-update-jul2026.ts
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config();

import { PrismaClient } from "@prisma/client";
import {
    MARIA_ANGELICA_EMAIL,
    MARIA_ANGELICA_SCHEDULE,
    STANDARD_SCHEDULE,
} from "../src/lib/work-schedule";

const prisma = new PrismaClient();

const OLD_CAROLINA_EMAIL = "carolina.bonilla@bihospharma.com";
const NEW_CAROLINA_EMAIL = "carolinabonillarozo@hotmail.com";

async function main() {
    const scheduleUpdate = await prisma.user.updateMany({
        data: { ...STANDARD_SCHEDULE },
    });
    console.log(`✅ Horario estándar actualizado para ${scheduleUpdate.count} usuarios`);

    const maria = await prisma.user.findUnique({ where: { email: MARIA_ANGELICA_EMAIL } });
    if (maria) {
        const { satWorkStart, satWorkEnd, ...weekday } = MARIA_ANGELICA_SCHEDULE;
        await prisma.user.update({
            where: { id: maria.id },
            data: {
                ...weekday,
                satWorkStart,
                satWorkEnd,
                autoAttendance: true,
            },
        });
        console.log(
            `✅ María Angélica: L-V 08:00–16:30 · Sáb 08:00–12:30 · almuerzo 13:00–14:00 · descansos 15 min (10:00–11:00 y 16:00–16:30)`
        );
    } else {
        console.log(`⚠️  No se encontró ${MARIA_ANGELICA_EMAIL}`);
    }

    const carolina = await prisma.user.findUnique({ where: { email: OLD_CAROLINA_EMAIL } });
    if (carolina) {
        await prisma.user.update({
            where: { id: carolina.id },
            data: {
                email: NEW_CAROLINA_EMAIL,
                name: "CAROLINA BONILLA ROZO",
                ...STANDARD_SCHEDULE,
            },
        });
        const loginLogs = await prisma.loginLog.updateMany({
            where: { email: OLD_CAROLINA_EMAIL },
            data: { email: NEW_CAROLINA_EMAIL },
        });
        const resetTokens = await prisma.passwordResetToken.updateMany({
            where: { email: OLD_CAROLINA_EMAIL },
            data: { email: NEW_CAROLINA_EMAIL },
        });
        console.log(
            `✅ Carolina: ${OLD_CAROLINA_EMAIL} → ${NEW_CAROLINA_EMAIL} (${loginLogs.count} login logs, ${resetTokens.count} reset tokens)`
        );
    } else {
        const existing = await prisma.user.findUnique({ where: { email: NEW_CAROLINA_EMAIL } });
        if (existing) {
            await prisma.user.update({
                where: { id: existing.id },
                data: { name: "CAROLINA BONILLA ROZO", ...STANDARD_SCHEDULE },
            });
            console.log(`✅ Carolina ya tenía ${NEW_CAROLINA_EMAIL}; nombre y horario actualizados`);
        } else {
            console.log(`⚠️  No se encontró usuario Carolina (${OLD_CAROLINA_EMAIL})`);
        }
    }

    console.log("\nHorarios aplicados:");
    console.log("  General — L-J: 08:00–17:30 · V: 08:00–17:00 · almuerzo 13:00–14:00");
    console.log("  María Angélica — L-V: 08:00–16:30 · Sáb: 08:00–12:30 · almuerzo 13:00–14:00");
    console.log("    Descansos: 15 min entre 10:00–11:00 y 15 min entre 16:00–16:30");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
