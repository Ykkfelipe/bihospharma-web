/**
 * Restaura entradas del 2026-07-17 borradas por sobrescritura accidental de prod.db.
 * Usa el roster que sí marcó el día anterior (2026-07-16) + Sonia (login hoy).
 *
 * Live SQLite path (Prisma resolves relative to prisma/schema.prisma):
 *   DATABASE_URL='file:/home/ec2-user/bihospharma-web/prisma/prod.db' npx tsx scripts/restore-shifts-2026-07-17.ts
 */
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DATE = "2026-07-17";
const SCHEDULED_START = new Date(`${DATE}T08:00:00-05:00`);
const NOTE = "Restaurado automáticamente tras incidente de BD (deploy 2026-07-17).";

/** Personal real a restaurar para el 17 (roster habitual + resto del equipo). */
const RESTORE_EMAILS = [
    "juan.solano@bihospharma.com",
    "johanna.ruiz@bihospharma.com",
    "dorisnieto177@gmail.com",
    "sonia.gomez@bihospharma.com",
    "ingridt.tumay@bihospharma.com",
    "yaneth.alfonso@bihospharma.com",
    "julian.villamil@bihospharma.com",
    "mariaangelicaar02@gmail.com",
    "duglas.cifuentes@bihospharma.com",
    "luis.bello@bihospharma.com",
    "amanda.bonilla@bihospharma.com",
    "carolinabonillarozo@hotmail.com",
    "alexander.solano@bihospharma.com",
    "maria.montano@bihospharma.com",
    "paola.rodriguez@bihospharma.com",
];

async function main() {
    const now = new Date();
    console.log(`DB: ${process.env.DATABASE_URL ?? "(from env files)"}`);
    console.log(`Restaurando turnos para ${DATE} (entrada programada 08:00 Bogotá)\n`);

    for (const email of RESTORE_EMAILS) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log(`⚠ No encontrado: ${email}`);
            continue;
        }

        const existing = await prisma.shift.findUnique({
            where: { userId_date: { userId: user.id, date: DATE } },
        });

        if (existing) {
            // Si la entrada quedó después del mediodía, fue un reintento post-incidente → corregir a 08:00
            const checkInHourBogota = Number(
                existing.checkIn.toLocaleString("en-US", {
                    timeZone: "America/Bogota",
                    hour: "numeric",
                    hour12: false,
                })
            );
            if (checkInHourBogota >= 12 && !existing.checkOut) {
                await prisma.shift.update({
                    where: { id: existing.id },
                    data: {
                        checkIn: SCHEDULED_START,
                        isLate: false,
                        notes: existing.notes
                            ? `${existing.notes} | ${NOTE}`
                            : NOTE,
                    },
                });
                console.log(`↩ Corregida entrada tarde → 08:00: ${user.name}`);
            } else {
                console.log(`✓ Ya tiene turno: ${user.name} (in=${existing.checkIn.toISOString()})`);
            }
            continue;
        }

        const checkIn = user.autoAttendance
            ? SCHEDULED_START
            : SCHEDULED_START;

        // Estado según hora actual (Bogotá lunch 13:00–14:00)
        const bogotaHour = Number(
            now.toLocaleString("en-US", {
                timeZone: "America/Bogota",
                hour: "numeric",
                hour12: false,
            })
        );
        const bogotaMin = Number(
            now.toLocaleString("en-US", {
                timeZone: "America/Bogota",
                minute: "numeric",
            })
        );
        const mins = bogotaHour * 60 + bogotaMin;

        let status = "active";
        let lunchStartedAt: Date | null = null;
        let lunchEndedAt: Date | null = null;

        if (mins >= 13 * 60 && mins < 14 * 60) {
            status = "lunch_break";
            lunchStartedAt = new Date(`${DATE}T13:00:00-05:00`);
        } else if (mins >= 14 * 60) {
            status = "active";
            lunchStartedAt = new Date(`${DATE}T13:00:00-05:00`);
            lunchEndedAt = new Date(`${DATE}T14:00:00-05:00`);
        }

        await prisma.shift.create({
            data: {
                userId: user.id,
                date: DATE,
                checkIn,
                isLate: false,
                autoCheckIn: user.autoAttendance,
                status,
                lunchStartedAt,
                lunchEndedAt,
                notes: NOTE,
            },
        });

        console.log(`✅ Restaurado: ${user.name} — entrada 08:00 · status=${status}`);
    }

    const today = await prisma.shift.findMany({
        where: { date: DATE },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { checkIn: "asc" },
    });

    console.log(`\nTurnos ${DATE}: ${today.length}`);
    for (const s of today) {
        console.log(`  ${s.user.name} · ${s.checkIn.toISOString()} · ${s.status}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
