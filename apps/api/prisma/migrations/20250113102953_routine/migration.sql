/*
  Warnings:

  - Made the column `description` on table `Goal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `picture` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ToDoListType" AS ENUM ('PROJECT', 'ROUTINE');

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "deadline" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "ToDoList" ADD COLUMN     "type" "ToDoListType" NOT NULL DEFAULT 'PROJECT';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "picture" SET NOT NULL;
