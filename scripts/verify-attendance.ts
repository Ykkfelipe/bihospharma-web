/**
 * Verifies shift check-in/out persists to SQLite (run: npm run test:attendance)
 */
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { safeCheckIn, safeCheckOut, todayCO } from "../src/lib/attendance-utils";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const prisma = new PrismaClient();
const TEST_EMAIL = "empleado.test@bihospharma.com";

async function main() {
    const date = todayCO();
    const hash = await bcrypt.hash("TestBihos2026!", 10);

    const user = await prisma.user.upsert({
        where: { email: TEST_EMAIL },
        update: { passwordHash: hash, name: "Empleado Prueba", role: "employee" },
        create: {
            email: TEST_EMAIL,
            passwordHash: hash,
            name: "Empleado Prueba",
            role: "employee",
        },
    });

    await prisma.shift.deleteMany({ where: { userId: user.id, date } });

    const checkIn = await safeCheckIn(user.id, date, "127.0.0.1", "verify-script");
    if (!checkIn.shift?.id) throw new Error("Check-in did not create a shift");

    const checkOut = await safeCheckOut(user.id, date, "127.0.0.1", "verify-script");
    if (!checkOut.checkOut) throw new Error("Check-out did not set checkOut");

    const count = await prisma.shift.count({ where: { userId: user.id, date } });
    if (count !== 1) throw new Error(`Expected 1 shift, got ${count}`);

    console.log("✅ Attendance flow OK");
    console.log(`   User: ${TEST_EMAIL} / TestBihos2026!`);
    console.log(`   Shift ${date}: in=${checkIn.shift.checkIn.toISOString()} out=${checkOut.checkOut.toISOString()}`);
}

main()
    .catch((e) => {
        console.error("❌", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
