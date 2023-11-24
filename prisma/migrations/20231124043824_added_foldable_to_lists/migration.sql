/*
  Warnings:

  - Made the column `listId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_listId_fkey";

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "folded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "listId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
