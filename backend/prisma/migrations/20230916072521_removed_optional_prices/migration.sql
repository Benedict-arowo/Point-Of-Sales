/*
  Warnings:

  - You are about to drop the column `quantity` on the `Items` table. All the data in the column will be lost.
  - Made the column `priceBought` on table `Items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pricePerUnit` on table `Items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "quantity",
ALTER COLUMN "priceBought" SET NOT NULL,
ALTER COLUMN "pricePerUnit" SET NOT NULL;
