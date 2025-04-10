/*
  Warnings:

  - The `deadline` column on the `Timelytic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pausedTime` column on the `Timelytic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "completedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Timelytic" DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3),
DROP COLUMN "pausedTime",
ADD COLUMN     "pausedTime" TIMESTAMP(3);
