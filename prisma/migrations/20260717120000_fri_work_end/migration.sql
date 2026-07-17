-- Horario actualizado: entrada 08:00, viernes sale 17:00
ALTER TABLE "User" ADD COLUMN "friWorkEnd" TEXT NOT NULL DEFAULT '17:00';

-- Actualizar horarios existentes al nuevo estándar
UPDATE "User" SET
  "workStart" = '08:00',
  "morningEnd" = '13:00',
  "lunchStart" = '13:00',
  "lunchEnd" = '14:00',
  "workEnd" = '17:30',
  "friWorkEnd" = '17:00';

-- Carolina Bonilla: nuevo correo personal
UPDATE "User" SET
  "email" = 'carolinabonillarozo@hotmail.com',
  "name" = 'CAROLINA BONILLA ROZO'
WHERE "email" = 'carolina.bonilla@bihospharma.com';

UPDATE "LoginLog" SET "email" = 'carolinabonillarozo@hotmail.com'
WHERE "email" = 'carolina.bonilla@bihospharma.com';

UPDATE "PasswordResetToken" SET "email" = 'carolinabonillarozo@hotmail.com'
WHERE "email" = 'carolina.bonilla@bihospharma.com';

-- María Angélica: Servicios Generales Bogotá (sale 16:30 L-V, sáb 12:30)
UPDATE "User" SET
  "workStart" = '08:00',
  "morningEnd" = '13:00',
  "lunchStart" = '13:00',
  "lunchEnd" = '14:00',
  "workEnd" = '16:30',
  "friWorkEnd" = '16:30',
  "satWorkStart" = '08:00',
  "satWorkEnd" = '12:30'
WHERE "email" = 'mariaangelicaar02@gmail.com';
