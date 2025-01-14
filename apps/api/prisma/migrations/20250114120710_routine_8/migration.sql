/*
  Warnings:

  - Added the required column `timeZone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyTask" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timeZone" TEXT NOT NULL;
