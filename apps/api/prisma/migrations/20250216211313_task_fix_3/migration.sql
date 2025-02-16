-- DropIndex
DROP INDEX "Task_userId_position_key";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';
