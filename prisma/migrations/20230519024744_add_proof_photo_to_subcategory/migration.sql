/*
  Warnings:

  - You are about to drop the column `geolocation` on the `SubCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "geolocation",
ADD COLUMN     "proofPhoto" BOOLEAN NOT NULL DEFAULT false;
