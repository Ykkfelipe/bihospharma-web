/**
 * Corporate portal seed — creates/updates admin and optional demo employee.
 *
 *   npm run db:seed
 *
 * Configure via .env.local: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    const adminName = process.env.SEED_ADMIN_NAME || "Administrador";

    if (!adminEmail || !adminPassword) {
        console.error(
            "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local before seeding."
        );
        process.exit(1);
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { passwordHash, name: adminName, role: "admin" },
        create: {
            email: adminEmail,
            passwordHash,
            name: adminName,
            role: "admin",
        },
    });
    console.log(`✅ Admin: ${adminEmail}`);

    const demoEmail = process.env.SEED_DEMO_EMAIL;
    const demoPassword = process.env.SEED_DEMO_PASSWORD;
    if (demoEmail && demoPassword) {
        const demoHash = await bcrypt.hash(demoPassword, 10);
        await prisma.user.upsert({
            where: { email: demoEmail },
            update: {
                passwordHash: demoHash,
                name: process.env.SEED_DEMO_NAME || "Empleado Demo",
                role: "employee",
            },
            create: {
                email: demoEmail,
                passwordHash: demoHash,
                name: process.env.SEED_DEMO_NAME || "Empleado Demo",
                role: "employee",
            },
        });
        console.log(`✅ Demo employee: ${demoEmail}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
