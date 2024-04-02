/*
  Warnings:

  - You are about to drop the `HospitalAdmin` table. If the table is not empty, all the data it contains will be lost.
  - The required column `emailResetPassword` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "HospitalAdmin" DROP CONSTRAINT "HospitalAdmin_hospital_id_fkey";

-- DropForeignKey
ALTER TABLE "HospitalAdmin" DROP CONSTRAINT "HospitalAdmin_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailResetPassword" TEXT NOT NULL;

-- DropTable
DROP TABLE "HospitalAdmin";

-- CreateTable
CREATE TABLE "hospital_admins" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hospital_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "keysId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keys" (
    "id" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "Keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hospital_admins_user_id_key" ON "hospital_admins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionInfo_userId_key" ON "SubscriptionInfo"("userId");

-- AddForeignKey
ALTER TABLE "hospital_admins" ADD CONSTRAINT "hospital_admins_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_admins" ADD CONSTRAINT "hospital_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionInfo" ADD CONSTRAINT "SubscriptionInfo_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_keysId_fkey" FOREIGN KEY ("keysId") REFERENCES "Keys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
