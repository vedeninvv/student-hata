/*
  Warnings:

  - The primary key for the `FlatPostOnUniversityPreferred` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FlatPostOnUniversityUndesirable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PreferredGendersOnNeighbourForms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FlatPostOnUniversityPreferred" DROP CONSTRAINT "FlatPostOnUniversityPreferred_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FlatPostOnUniversityPreferred_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FlatPostOnUniversityUndesirable" DROP CONSTRAINT "FlatPostOnUniversityUndesirable_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FlatPostOnUniversityUndesirable_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PreferredGendersOnNeighbourForms" DROP CONSTRAINT "PreferredGendersOnNeighbourForms_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PreferredGendersOnNeighbourForms_pkey" PRIMARY KEY ("id");
