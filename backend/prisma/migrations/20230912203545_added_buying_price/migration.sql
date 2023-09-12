/*
  Warnings:

  - You are about to drop the column `amountInStock` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Items` table. All the data in the column will be lost.
  - Added the required column `buyingPrice` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "amountInStock",
DROP COLUMN "createdDate",
ADD COLUMN     "buyingPrice" INTEGER NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
