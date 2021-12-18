/*
  Warnings:

  - Added the required column `thumbnail` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" VARCHAR NOT NULL;
