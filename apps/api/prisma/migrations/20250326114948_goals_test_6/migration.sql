-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "Timelytic" ALTER COLUMN "deadline" SET DATA TYPE TEXT,
ALTER COLUMN "pausedTime" SET DATA TYPE TEXT;
