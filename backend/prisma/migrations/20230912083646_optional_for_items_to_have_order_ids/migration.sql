-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_orderId_fkey";

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
