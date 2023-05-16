-- CreateTable
CREATE TABLE "Impact" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "carbon" INTEGER NOT NULL,
    "agua" INTEGER NOT NULL,
    "bio" INTEGER NOT NULL,
    "solo" INTEGER NOT NULL,

    CONSTRAINT "Impact_pkey" PRIMARY KEY ("id")
);
