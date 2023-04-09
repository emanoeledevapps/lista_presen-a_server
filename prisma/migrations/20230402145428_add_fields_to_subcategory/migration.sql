-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "description" TEXT,
ADD COLUMN     "placeholder" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'numeric';
