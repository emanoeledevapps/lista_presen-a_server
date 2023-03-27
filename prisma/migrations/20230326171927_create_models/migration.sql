-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "password" TEXT,
    "userType" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "geoLocation" TEXT,
    "propertyGeolocation" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "testimony" TEXT NOT NULL,
    "proofPhoto" TEXT NOT NULL,
    "reportedUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delation_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL DEFAULT '',
    "bannerUrl" TEXT NOT NULL,
    "bannerAlt" TEXT NOT NULL,
    "bodyPost" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_inspectionId_key" ON "Inspection"("inspectionId");

-- AddForeignKey
ALTER TABLE "Delation" ADD CONSTRAINT "Delation_reportedUser_fkey" FOREIGN KEY ("reportedUser") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_userWallet_fkey" FOREIGN KEY ("userWallet") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;
