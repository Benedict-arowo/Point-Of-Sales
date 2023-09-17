/*
  Warnings:

  - You are about to drop the column `orderId` on the `Items` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
