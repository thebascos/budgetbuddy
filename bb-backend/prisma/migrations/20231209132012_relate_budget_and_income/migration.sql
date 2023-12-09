/*
  Warnings:

  - Added the required column `incomeId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "incomeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
