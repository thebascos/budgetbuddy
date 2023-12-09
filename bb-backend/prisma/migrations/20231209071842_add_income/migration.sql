/*
  Warnings:

  - You are about to drop the column `description` on the `Income` table. All the data in the column will be lost.
  - Added the required column `source` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_account` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Income" DROP COLUMN "description",
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "source_account" TEXT NOT NULL;
