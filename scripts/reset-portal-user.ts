/**
 * Reset one portal user (password, role, unlock failed-login lock).
 *   npx tsx scripts/reset-portal-user.ts duglas.cifuentes@bihospharma.com
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config();

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2]?.trim().toLowerCase();
    if (!email) {
        console.error("Usage: npx tsx scripts/reset-portal-user.ts <email> [admin|employee]");
        process.exit(1);
    }

    const roleArg = process.argv[3]?.trim();
    const password =
        process.env.PORTAL_RESET_PASSWORD ||
        process.env.STAFF_DEFAULT_PASSWORD ||
        "BihosStaff2026!";

    const existing = await prisma.user.findUnique({ where: { email } });
    const role =
        roleArg === "admin" || roleArg === "employee"
            ? roleArg
            : existing?.role ?? "employee";

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { passwordHash, role },
        create: {
            email,
            passwordHash,
            role,
            name: existing?.name ?? email,
            workStart: "07:30",
            morningEnd: "13:00",
            lunchStart: "13:00",
            lunchEnd: "14:00",
            workEnd: "17:30",
        },
    });

    const cleared = await prisma.loginLog.deleteMany({
        where: { email, success: false },
    });

    console.log(`✅ ${user.email} — role: ${user.role}`);
    console.log(`   Failed login attempts cleared: ${cleared.count}`);
    console.log(`   Temporary password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
