/*
  Warnings:

  - The `categories` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[];
