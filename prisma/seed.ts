/**
 * seed.ts — Crea usuarios en la base de datos del portal corporativo.
 *
 * Uso:
 *   DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts
 *
 * Modifica el arreglo USERS para agregar empleados.
 * role: "admin" → puede publicar | role: "employee" → solo leer
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
    {
        name: "Felipe Moré",
        email: "afmbonilla2@gmail.com",
        password: "andresm1",
        role: "admin",
    },
    {
        name: "Empleado de Prueba",
        email: "empleado@bihospharma.com",
        password: "password123",
        role: "employee",
    },
];

async function main() {
    for (const user of USERS) {
        const passwordHash = await bcrypt.hash(user.password, 10);
        await prisma.user.upsert({
            where: { email: user.email },
            update: { passwordHash, name: user.name, role: user.role },
            create: { email: user.email, passwordHash, name: user.name, role: user.role },
        });
        console.log(`✅ User created/updated: ${user.email} (${user.role})`);
    }
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
