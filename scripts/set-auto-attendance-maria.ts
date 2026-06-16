/**
 * One-time: enable auto attendance for María Angélica (production).
 *   npx tsx scripts/set-auto-attendance-maria.ts
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config();

import { PrismaClient } from "@prisma/client";

const MARIA_EMAIL = "mariaangelicaar02@gmail.com";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.update({
        where: { email: MARIA_EMAIL },
        data: { autoAttendance: true },
    });
    console.log(`✅ autoAttendance=true — ${user.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
