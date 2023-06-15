-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "RequestFaucet" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RequestFaucet_pkey" PRIMARY KEY ("id")
);
