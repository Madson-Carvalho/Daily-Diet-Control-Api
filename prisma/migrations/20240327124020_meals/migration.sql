/*
  Warnings:

  - Added the required column `name` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` ADD COLUMN `name` VARCHAR(50) NOT NULL;
