-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tutorial" TEXT NOT NULL,
    "totallySustainable" TEXT NOT NULL,
    "partiallySustainable" TEXT NOT NULL,
    "neutro" TEXT NOT NULL,
    "partiallyNotSustainable" TEXT NOT NULL,
    "totallyNotSustainable" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "carbonValue" INTEGER NOT NULL,
    "bioValue" INTEGER NOT NULL,
    "aguaValue" INTEGER NOT NULL,
    "soloValue" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
