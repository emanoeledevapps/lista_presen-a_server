/*
  Warnings:

  - Added the required column `transactionHash` to the `TokensBurned` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokensBurned" ADD COLUMN     "transactionHash" TEXT NOT NULL;