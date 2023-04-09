/*
  Warnings:

  - You are about to drop the column `neutro` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `partiallyNotSustainable` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `partiallySustainable` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `totallyNotSustainable` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `totallySustainable` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `tutorial` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "neutro",
DROP COLUMN "partiallyNotSustainable",
DROP COLUMN "partiallySustainable",
DROP COLUMN "totallyNotSustainable",
DROP COLUMN "totallySustainable",
DROP COLUMN "tutorial",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
