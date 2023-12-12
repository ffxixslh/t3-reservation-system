/*
  Warnings:

  - Made the column `description` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "description" SET NOT NULL;
