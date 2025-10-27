/*
  Warnings:

  - Added the required column `fecha_nacimiento` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `fecha_nacimiento` DATETIME(3) NOT NULL,
    ADD COLUMN `genero` VARCHAR(191) NOT NULL;
