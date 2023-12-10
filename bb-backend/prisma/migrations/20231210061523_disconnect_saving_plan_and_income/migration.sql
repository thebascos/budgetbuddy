/*
  Warnings:

  - You are about to drop the column `incomeId` on the `Saving` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Saving" DROP CONSTRAINT "Saving_incomeId_fkey";

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "incomeId";
