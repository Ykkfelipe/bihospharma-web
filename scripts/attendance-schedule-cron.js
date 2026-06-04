/**
 * Pausa/reanuda almuerzo automáticamente para turnos abiertos (America/Bogota).
 * PM2: cron_restart cada 5 minutos.
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function todayCO() {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

function parseTime(dateStr, hhmm) {
    return new Date(`${dateStr}T${hhmm}:00-05:00`).getTime();
}

function getSchedule(user, dateStr) {
    const d = new Date(`${dateStr}T12:00:00-05:00`);
    const day = d.getDay();
    if (day === 0) return null;
    if (day === 6 && user.satWorkStart && user.satWorkEnd) {
        return { lunchStart: user.satWorkEnd, lunchEnd: user.satWorkEnd, hasLunch: false };
    }
    if (day === 6) return null;
    return {
        lunchStart: user.lunchStart,
        lunchEnd: user.lunchEnd,
        hasLunch: true,
    };
}

async function run() {
    const date = todayCO();
    const now = Date.now();
    const open = await prisma.shift.findMany({
        where: { date, checkOut: null },
        include: { user: true },
    });

    let updated = 0;
    for (const shift of open) {
        const sched = getSchedule(shift.user, date);
        if (!sched || !sched.hasLunch) continue;

        const lunchStart = parseTime(date, sched.lunchStart);
        const lunchEnd = parseTime(date, sched.lunchEnd);
        const data = {};

        if (shift.status === "active" && now >= lunchStart && now < lunchEnd) {
            data.status = "lunch_break";
            data.lunchStartedAt = shift.lunchStartedAt || new Date();
        } else if (shift.status === "lunch_break" && now >= lunchEnd) {
            data.status = "active";
            data.lunchEndedAt = shift.lunchEndedAt || new Date();
        }

        if (Object.keys(data).length) {
            await prisma.shift.update({ where: { id: shift.id }, data });
            updated++;
        }
    }

    console.log(`[Schedule cron] ${date}: ${open.length} open, ${updated} updated`);
}

run()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
