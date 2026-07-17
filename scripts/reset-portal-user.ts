/**
 * Reset one portal user (password, role, unlock failed-login lock).
 *   npx tsx scripts/reset-portal-user.ts duglas.cifuentes@bihospharma.com
 *
 * On production (no dotenv devDependency):
 *   DATABASE_URL=file:./prod.db PORTAL_RESET_PASSWORD='...' npx tsx scripts/reset-portal-user.ts <email>
 */
import path from "path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { STANDARD_SCHEDULE } from "../src/lib/work-schedule";

const prisma = new PrismaClient();

async function loadEnv() {
    try {
        const dotenv = await import("dotenv");
        dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
        dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
        dotenv.config();
    } catch {
        // dotenv is dev-only; rely on DATABASE_URL / PORTAL_RESET_PASSWORD from the shell
    }
}

async function main() {
    await loadEnv();
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
            ...STANDARD_SCHEDULE,
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
