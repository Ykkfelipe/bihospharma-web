-- María Angélica: mismo horario de salida que el personal general (L-J 17:30, V 17:00)
UPDATE "User" SET
  "workStart" = '08:00',
  "morningEnd" = '13:00',
  "lunchStart" = '13:00',
  "lunchEnd" = '14:00',
  "workEnd" = '17:30',
  "friWorkEnd" = '17:00'
WHERE "email" = 'mariaangelicaar02@gmail.com';
