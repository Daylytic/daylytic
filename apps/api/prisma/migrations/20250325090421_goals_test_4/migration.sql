/*
  Warnings:

  - You are about to drop the `RoutineData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `finishedTasks` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoutineData" DROP CONSTRAINT "RoutineData_analyticsId_fkey";

-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "finishedProjects" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "finishedTasks" JSONB NOT NULL,
ADD COLUMN     "lastRoutineReset" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loginStreak" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "reachedGoals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recordLoginStreak" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "recordRoutineStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "routineStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timelyticTasksFinished" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timelyticTimeSpent" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- DropTable
DROP TABLE "RoutineData";
