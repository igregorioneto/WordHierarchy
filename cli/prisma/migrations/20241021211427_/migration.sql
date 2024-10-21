-- CreateTable
CREATE TABLE "WordHierarcky" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WordHierarcky_id_key" ON "WordHierarcky"("id");

-- AddForeignKey
ALTER TABLE "WordHierarcky" ADD CONSTRAINT "WordHierarcky_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "WordHierarcky"("id") ON DELETE SET NULL ON UPDATE CASCADE;
