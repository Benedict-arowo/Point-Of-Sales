/*
  Warnings:

  - Added the required column `category` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryList" AS ENUM ('FOOD', 'DRINK', 'GAMES');

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "category" "CategoryList" NOT NULL,
ALTER COLUMN "amountInStock" DROP NOT NULL,
ALTER COLUMN "priceBought" DROP NOT NULL;
