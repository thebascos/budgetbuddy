-- CreateTable
CREATE TABLE "AddSaving" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "savingId" TEXT NOT NULL,

    CONSTRAINT "AddSaving_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddSaving" ADD CONSTRAINT "AddSaving_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES "Saving"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
