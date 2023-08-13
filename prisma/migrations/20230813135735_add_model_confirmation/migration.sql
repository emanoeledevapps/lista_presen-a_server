-- CreateTable
CREATE TABLE "Confirmation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confirmation" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Confirmation_pkey" PRIMARY KEY ("id")
);
