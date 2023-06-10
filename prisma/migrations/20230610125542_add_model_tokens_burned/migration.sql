-- CreateTable
CREATE TABLE "TokensBurned" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "bio" INTEGER NOT NULL,
    "soil" INTEGER NOT NULL,
    "carbon" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokensBurned_pkey" PRIMARY KEY ("id")
);
