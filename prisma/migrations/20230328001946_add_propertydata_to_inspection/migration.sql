/*
  Warnings:

  - You are about to drop the column `categories` on the `Inspection` table. All the data in the column will be lost.
  - Added the required column `propertyData` to the `Inspection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "categories",
ADD COLUMN     "propertyData" TEXT NOT NULL;
