/*
  Warnings:

  - You are about to drop the column `buyingPrice` on the `Items` table. All the data in the column will be lost.
  - Added the required column `amountInStock` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceBought` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "buyingPrice",
ADD COLUMN     "amountInStock" INTEGER NOT NULL,
ADD COLUMN     "priceBought" INTEGER NOT NULL;
