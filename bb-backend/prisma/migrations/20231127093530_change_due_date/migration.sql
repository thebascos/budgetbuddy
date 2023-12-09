/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `dueDay` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "dueDate",
ADD COLUMN     "dueDay" INTEGER NOT NULL;
