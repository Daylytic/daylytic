-- AlterEnum
ALTER TYPE "TaskType" ADD VALUE 'EVENT';

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';
