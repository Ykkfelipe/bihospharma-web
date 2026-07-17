-- Descansos cortos (María Angélica — Servicios Generales)
ALTER TABLE "User" ADD COLUMN "morningBreakStart" TEXT;
ALTER TABLE "User" ADD COLUMN "morningBreakEnd" TEXT;
ALTER TABLE "User" ADD COLUMN "afternoonBreakStart" TEXT;
ALTER TABLE "User" ADD COLUMN "afternoonBreakEnd" TEXT;
ALTER TABLE "User" ADD COLUMN "restBreakMinutes" INTEGER;

UPDATE "User" SET
  "morningBreakStart" = '10:00',
  "morningBreakEnd" = '11:00',
  "afternoonBreakStart" = '16:00',
  "afternoonBreakEnd" = '16:30',
  "restBreakMinutes" = 15
WHERE "email" = 'mariaangelicaar02@gmail.com';
