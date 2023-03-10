-- AlterTable
ALTER TABLE "User" ALTER COLUMN "propertyGeolocation" DROP NOT NULL,
ALTER COLUMN "propertyGeolocation" SET DATA TYPE TEXT;
