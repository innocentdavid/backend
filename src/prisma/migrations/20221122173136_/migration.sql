/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `daysTreatment` VARCHAR(255) NOT NULL,
    `surgicalInterventions` VARCHAR(255) NOT NULL,
    `typeOfInjury` VARCHAR(255) NOT NULL,
    `psychologicalSequelae` VARCHAR(255) NOT NULL,
    `aestheticSequels` VARCHAR(255) NOT NULL,
    `permanentWorkIncapacity` VARCHAR(255) NOT NULL,
    `totalPrice` INTEGER NOT NULL DEFAULT 0,
    `otp` INTEGER NOT NULL,
    `isOTPSent` BOOLEAN NOT NULL DEFAULT false,
    `isValidOTP` BOOLEAN NOT NULL DEFAULT false,
    `isFormComplete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quotaRemaining` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
