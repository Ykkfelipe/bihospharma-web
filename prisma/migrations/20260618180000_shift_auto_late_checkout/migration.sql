-- Auto check-in/out flags and "forgot to close shift" (cierre tardío)
ALTER TABLE "Shift" ADD COLUMN "autoCheckIn" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Shift" ADD COLUMN "autoCheckout" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Shift" ADD COLUMN "isLateCheckout" BOOLEAN NOT NULL DEFAULT false;
