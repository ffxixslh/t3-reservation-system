/*
  Warnings:

  - The values [MAIN,VICE] on the enum `DoctorLevel` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[doctorId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DoctorLevel_new" AS ENUM ('RESIDENT', 'ATTENDING', 'INTERN', 'CHIEF');
ALTER TABLE "doctors" ALTER COLUMN "level" TYPE "DoctorLevel_new" USING ("level"::text::"DoctorLevel_new");
ALTER TYPE "DoctorLevel" RENAME TO "DoctorLevel_old";
ALTER TYPE "DoctorLevel_new" RENAME TO "DoctorLevel";
DROP TYPE "DoctorLevel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_departmentId_fkey";

-- AlterTable
ALTER TABLE "departments" DROP CONSTRAINT "departments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "departments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "departments_id_seq";

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "departmentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "doctorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_doctorId_key" ON "users"("doctorId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
