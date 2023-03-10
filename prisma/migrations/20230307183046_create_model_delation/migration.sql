/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Delation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "testimony" TEXT NOT NULL,
    "proofPhoto" TEXT NOT NULL,
    "reportedUser" TEXT NOT NULL,

    CONSTRAINT "Delation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- AddForeignKey
ALTER TABLE "Delation" ADD CONSTRAINT "Delation_reportedUser_fkey" FOREIGN KEY ("reportedUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
