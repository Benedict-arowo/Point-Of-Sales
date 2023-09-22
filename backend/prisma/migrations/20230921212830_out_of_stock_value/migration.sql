/*
  Warnings:

  - Added the required column `initialQuantity` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOutOfStock` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "initialQuantity" INTEGER NOT NULL,
ADD COLUMN     "isOutOfStock" BOOLEAN NOT NULL;
