/**
 * Send a test "account created" welcome email.
 *
 *   npx tsx scripts/send-test-welcome-email.ts afmbonilla2@gmail.com
 *
 * Uses Martha's provisioned account details as sample content (or SAMPLE_* env).
 * Creates a real password-setup token for the sample account email.
 */
import path from "path";
import { PrismaClient } from "@prisma/client";
import { sendAccountCreatedEmail } from "../src/lib/portal-welcome-email";

async function loadEnv() {
    try {
        const dotenv = await import("dotenv");
        dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
        dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
        dotenv.config();
    } catch {
        // dotenv optional on production if env already exported
    }
}

async function main() {
    await loadEnv();

    const to = process.argv[2]?.trim().toLowerCase();
    if (!to) {
        console.error("Usage: npx tsx scripts/send-test-welcome-email.ts <recipient@email>");
        process.exit(1);
    }

    const sampleEmail = (
        process.env.SAMPLE_ACCOUNT_EMAIL || "martha.avella@bihospharma.com"
    ).toLowerCase();
    const sampleName = process.env.SAMPLE_ACCOUNT_NAME || "MARTHA ROCIO AVELLA ROJAS";
    const temporaryPassword =
        process.env.STAFF_DEFAULT_PASSWORD ||
        process.env.PORTAL_TEMP_PASSWORD ||
        "BihosStaff2026!";

    if (!process.env.NEXTAUTH_URL) {
        process.env.NEXTAUTH_URL = "https://bihospharma.com";
    }

    const prisma = new PrismaClient();
    try {
        const result = await sendAccountCreatedEmail(prisma, {
            email: sampleEmail,
            name: sampleName,
            temporaryPassword,
            to,
        });

        if (!result) {
            console.error("SMTP is not configured (SMTP_USER / SMTP_PASS).");
            process.exit(1);
        }

        console.log(`✅ Test welcome email sent to ${to}`);
        console.log(`   Sample account: ${sampleEmail}`);
        console.log(`   Setup link: ${result.resetLink}`);
        if (result.messageId) console.log(`   Message-Id: ${result.messageId}`);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
