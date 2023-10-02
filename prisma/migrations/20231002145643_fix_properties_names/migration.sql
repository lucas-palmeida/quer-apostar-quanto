/*
  Warnings:

  - You are about to drop the column `isFinishe` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "isFinishe",
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;
