-- DropForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" DROP CONSTRAINT "PreferredGendersOnNeighbourForms_genderId_fkey";

-- DropForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" DROP CONSTRAINT "PreferredGendersOnNeighbourForms_neighbourFormId_fkey";

-- AddForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" ADD CONSTRAINT "PreferredGendersOnNeighbourForms_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" ADD CONSTRAINT "PreferredGendersOnNeighbourForms_neighbourFormId_fkey" FOREIGN KEY ("neighbourFormId") REFERENCES "NeighbourForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
