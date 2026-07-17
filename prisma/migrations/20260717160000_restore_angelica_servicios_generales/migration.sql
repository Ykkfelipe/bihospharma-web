-- Restaurar horario de María Angélica (Servicios Generales Bogotá — solo ella)
-- L-V 08:00–16:30, Sáb 08:00–12:30. El horario L-J 17:30 / V 17:00 es para el resto del personal.
UPDATE "User" SET
  "workStart" = '08:00',
  "morningEnd" = '13:00',
  "lunchStart" = '13:00',
  "lunchEnd" = '14:00',
  "workEnd" = '16:30',
  "friWorkEnd" = '16:30',
  "satWorkStart" = '08:00',
  "satWorkEnd" = '12:30',
  "morningBreakStart" = '10:00',
  "morningBreakEnd" = '11:00',
  "afternoonBreakStart" = '16:00',
  "afternoonBreakEnd" = '16:30',
  "restBreakMinutes" = 15
WHERE "email" = 'mariaangelicaar02@gmail.com';
