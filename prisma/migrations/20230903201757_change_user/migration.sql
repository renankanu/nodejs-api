/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(42)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(42) NOT NULL;
