/*
  Warnings:

  - You are about to drop the column `recurrenceEndDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recurrencePattern` on the `Task` table. All the data in the column will be lost.
  - The `priority` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[todoListId,position]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,position]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'OPTIONAL');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_todoListId_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "recurrenceEndDate",
DROP COLUMN "recurrencePattern",
ADD COLUMN     "position" INTEGER NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority";

-- CreateIndex
CREATE UNIQUE INDEX "Task_todoListId_position_key" ON "Task"("todoListId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_position_key" ON "Task"("userId", "position");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "ToDoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
