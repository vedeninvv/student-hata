/*
  Warnings:

  - The primary key for the `FlatPostOnUniversityPreferred` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FlatPostOnUniversityPreferred` table. All the data in the column will be lost.
  - The primary key for the `FlatPostOnUniversityUndesirable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FlatPostOnUniversityUndesirable` table. All the data in the column will be lost.
  - The primary key for the `PreferredGendersOnNeighbourForms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PreferredGendersOnNeighbourForms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlatPostOnUniversityPreferred" DROP CONSTRAINT "FlatPostOnUniversityPreferred_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FlatPostOnUniversityPreferred_pkey" PRIMARY KEY ("flatPostId", "universityId");

-- AlterTable
ALTER TABLE "FlatPostOnUniversityUndesirable" DROP CONSTRAINT "FlatPostOnUniversityUndesirable_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FlatPostOnUniversityUndesirable_pkey" PRIMARY KEY ("flatPostId", "universityId");

-- AlterTable
ALTER TABLE "PreferredGendersOnNeighbourForms" DROP CONSTRAINT "PreferredGendersOnNeighbourForms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PreferredGendersOnNeighbourForms_pkey" PRIMARY KEY ("neighbourFormId", "genderId");
