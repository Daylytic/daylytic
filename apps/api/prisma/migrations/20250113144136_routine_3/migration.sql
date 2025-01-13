-- AlterTable
ALTER TABLE "Routine" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';
