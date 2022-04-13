/*
  Warnings:

  - You are about to drop the column `prederredPeopleNum` on the `NeighbourForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NeighbourForm" DROP COLUMN "prederredPeopleNum",
ADD COLUMN     "preferredPeopleNum" INTEGER;
