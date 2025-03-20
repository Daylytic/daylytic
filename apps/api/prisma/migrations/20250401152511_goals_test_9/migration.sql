-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "completedAt" SET DATA TYPE TIMESTAMPTZ(3);
