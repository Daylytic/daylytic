-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "validUntil" SET DEFAULT now() + interval '7 days';

-- CreateTable
CREATE TABLE "Assistance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questions" JSONB NOT NULL,
    "response" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Assistance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assistance" ADD CONSTRAINT "Assistance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
