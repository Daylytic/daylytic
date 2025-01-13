-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_id_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
