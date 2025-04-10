/*
  Warnings:

  - You are about to drop the column `finishedProjects` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `finishedTasks` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `reachedGoals` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "finishedProjects",
DROP COLUMN "finishedTasks",
DROP COLUMN "reachedGoals",
ADD COLUMN     "timelyticSessions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Timelytic" (
    "id" TEXT NOT NULL,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "deadline" INTEGER,
    "duration" INTEGER,
    "pausedTime" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Timelytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timelytic_userId_key" ON "Timelytic"("userId");

-- AddForeignKey
ALTER TABLE "Timelytic" ADD CONSTRAINT "Timelytic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
