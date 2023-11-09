/*
  Warnings:

  - The primary key for the `departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `departments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `deptId` on the `doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_deptId_fkey";

-- AlterTable
ALTER TABLE "departments" DROP CONSTRAINT "departments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "departments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "deptId",
ADD COLUMN     "deptId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
