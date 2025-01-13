/*
  Warnings:

  - You are about to drop the column `type` on the `ToDoList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "ToDoList" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ToDoListType";

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "routineId" TEXT NOT NULL,

    CONSTRAINT "DailyTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routine_userId_key" ON "Routine"("userId");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyTask" ADD CONSTRAINT "DailyTask_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
