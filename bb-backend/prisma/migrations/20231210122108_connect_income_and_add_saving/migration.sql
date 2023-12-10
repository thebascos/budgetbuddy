/*
  Warnings:

  - Added the required column `incomeId` to the `AddSaving` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddSaving" ADD COLUMN     "incomeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AddSaving" ADD CONSTRAINT "AddSaving_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
