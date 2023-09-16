/*
  Warnings:

  - You are about to drop the column `amountInStock` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Items` table. All the data in the column will be lost.
  - Added the required column `reorderLevel` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitsInStock` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "reorderLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "amountInStock",
DROP COLUMN "price",
ADD COLUMN     "pricePerUnit" INTEGER,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "reorderLevel" "reorderLevel" NOT NULL,
ADD COLUMN     "unitsInStock" INTEGER NOT NULL,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;
