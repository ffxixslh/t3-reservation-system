/*
  Warnings:

  - You are about to drop the column `desc` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `deptId` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `hospitalId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `medical_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `medical_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_deptId_fkey";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "desc",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "deptId",
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "medical_records" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hospitalId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalAdmin" (
    "hospital_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalAdmin_user_id_key" ON "HospitalAdmin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalAdmin_hospital_id_user_id_key" ON "HospitalAdmin"("hospital_id", "user_id");

-- AddForeignKey
ALTER TABLE "HospitalAdmin" ADD CONSTRAINT "HospitalAdmin_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalAdmin" ADD CONSTRAINT "HospitalAdmin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
