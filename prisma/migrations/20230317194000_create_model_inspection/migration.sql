-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "inspectedAt" TEXT,
    "categories" TEXT NOT NULL,
    "resultCategories" TEXT,
    "userWallet" TEXT NOT NULL,
    "currentLocation" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_inspectionId_key" ON "Inspection"("inspectionId");

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_userWallet_fkey" FOREIGN KEY ("userWallet") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;
