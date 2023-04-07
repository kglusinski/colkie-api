/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdBy" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_createdBy_key" ON "Room"("createdBy");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
