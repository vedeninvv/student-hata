/*
  Warnings:

  - You are about to drop the `FlatPostPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" DROP CONSTRAINT "FlatPostOnUniversityPreferred_flatPostId_fkey";

-- DropForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" DROP CONSTRAINT "FlatPostOnUniversityPreferred_universityId_fkey";

-- DropForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" DROP CONSTRAINT "FlatPostOnUniversityUndesirable_flatPostId_fkey";

-- DropForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" DROP CONSTRAINT "FlatPostOnUniversityUndesirable_universityId_fkey";

-- DropForeignKey
ALTER TABLE "FlatPostPhoto" DROP CONSTRAINT "FlatPostPhoto_flatPostId_fkey";

-- DropTable
DROP TABLE "FlatPostPhoto";

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" ADD CONSTRAINT "FlatPostOnUniversityPreferred_flatPostId_fkey" FOREIGN KEY ("flatPostId") REFERENCES "FlatPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" ADD CONSTRAINT "FlatPostOnUniversityPreferred_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" ADD CONSTRAINT "FlatPostOnUniversityUndesirable_flatPostId_fkey" FOREIGN KEY ("flatPostId") REFERENCES "FlatPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" ADD CONSTRAINT "FlatPostOnUniversityUndesirable_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
