const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    console.log('[Cron] Running missing checkout job...');
    try {
        const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
        
        // Find all shifts from PREVIOUS days that have no checkout
        const openShifts = await prisma.shift.findMany({
            where: {
                checkOut: null,
                date: { lt: todayStr }
            }
        });

        if (openShifts.length > 0) {
            console.log(`[Cron] Found ${openShifts.length} open shifts from previous days. Auto-checking out.`);
            for (const shift of openShifts) {
                // Set checkout time to 11:59 PM of that shift's date
                const checkoutTime = new Date(`${shift.date}T23:59:59.000-05:00`); // UTC-5 for Bogota
                await prisma.shift.update({
                    where: { id: shift.id },
                    data: { checkOut: checkoutTime, notes: "Auto check-out via cron" }
                });
            }
            console.log('[Cron] Auto check-out complete.');
        } else {
            console.log('[Cron] No missing checkouts found.');
        }
    } catch (err) {
        console.error('[Cron] Error running job:', err);
    } finally {
        await prisma.$disconnect();
    }
}

run();
