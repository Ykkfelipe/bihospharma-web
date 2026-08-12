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
import { MARIA_ANGELICA_EMAIL, MARIA_ANGELICA_SCHEDULE, STANDARD_SCHEDULE } from "../src/lib/work-schedule";

const prisma = new PrismaClient();
const PASSWORD = process.env.STAFF_DEFAULT_PASSWORD || "BihosStaff2026!";

const STAFF: Array<{
    email: string;
    name: string;
    role?: "admin" | "employee";
    fullSchedule?: typeof MARIA_ANGELICA_SCHEDULE;
    autoAttendance?: boolean;
}> = [
    { email: "amanda.bonilla@bihospharma.com", name: "AMANDA  BONILLA ROZO" },
    {
        email: MARIA_ANGELICA_EMAIL,
        name: "MARIA ANGELICA ARENAS GOMEZ",
        fullSchedule: MARIA_ANGELICA_SCHEDULE,
        autoAttendance: true,
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
    { email: "carolinabonillarozo@hotmail.com", name: "CAROLINA BONILLA ROZO" },
    { email: "maria.montano@bihospharma.com", name: "MARIA MONTANO" },
    { email: "paola.rodriguez@bihospharma.com", name: "PAOLA RODRIGUEZ" },
    { email: "martha.avella@bihospharma.com", name: "MARTHA ROCIO AVELLA ROJAS" },
];

async function main() {
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    for (const s of STAFF) {
        const existing = await prisma.user.findUnique({ where: { email: s.email } });
        const role = s.role ?? existing?.role ?? "employee";

        const scheduleFields = s.fullSchedule
            ? (() => {
                  const { satWorkStart, satWorkEnd, ...weekday } = s.fullSchedule;
                  return {
                      ...weekday,
                      satWorkStart,
                      satWorkEnd,
                      morningBreakStart: weekday.morningBreakStart ?? null,
                      morningBreakEnd: weekday.morningBreakEnd ?? null,
                      afternoonBreakStart: weekday.afternoonBreakStart ?? null,
                      afternoonBreakEnd: weekday.afternoonBreakEnd ?? null,
                      restBreakMinutes: weekday.restBreakMinutes ?? null,
                  };
              })()
            : {
                  ...STANDARD_SCHEDULE,
                  satWorkStart: null,
                  satWorkEnd: null,
                  morningBreakStart: null,
                  morningBreakEnd: null,
                  afternoonBreakStart: null,
                  afternoonBreakEnd: null,
                  restBreakMinutes: null,
              };

        await prisma.user.upsert({
            where: { email: s.email },
            update: {
                name: s.name,
                role,
                ...scheduleFields,
                autoAttendance: s.autoAttendance ?? false,
            },
            create: {
                email: s.email,
                passwordHash,
                name: s.name,
                role,
                ...scheduleFields,
                autoAttendance: s.autoAttendance ?? false,
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
