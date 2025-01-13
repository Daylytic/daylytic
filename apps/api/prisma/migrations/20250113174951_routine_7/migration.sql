/*
  Warnings:

  - You are about to drop the column `routineId` on the `DailyTask` table. All the data in the column will be lost.
  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `DailyTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyTask" DROP CONSTRAINT "DailyTask_routineId_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_userId_fkey";

-- AlterTable
ALTER TABLE "DailyTask" DROP COLUMN "routineId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- DropTable
DROP TABLE "Routine";

-- AddForeignKey
ALTER TABLE "DailyTask" ADD CONSTRAINT "DailyTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
