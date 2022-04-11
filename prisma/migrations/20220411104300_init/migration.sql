-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "genderId" INTEGER,
    "contactEmail" TEXT,
    "phone" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlatPost" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "maxPeople" INTEGER,
    "description" TEXT,
    "requirements" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "FlatPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlatPostPhoto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "flatPostId" INTEGER NOT NULL,

    CONSTRAINT "FlatPostPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "genderName" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NeighbourForm" (
    "id" SERIAL NOT NULL,
    "universityId" INTEGER NOT NULL,
    "faculty" TEXT,
    "preferredPrice" INTEGER,
    "prederredPeopleNum" INTEGER,
    "preferredArea" TEXT,
    "requirementsForNeighbour" TEXT,
    "aboutMyself" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "NeighbourForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferredGendersOnNeighbourForms" (
    "neighbourFormId" INTEGER NOT NULL,
    "genderId" INTEGER NOT NULL,

    CONSTRAINT "PreferredGendersOnNeighbourForms_pkey" PRIMARY KEY ("neighbourFormId","genderId")
);

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlatPostOnUniversityPreferred" (
    "universityId" INTEGER NOT NULL,
    "flatPostId" INTEGER NOT NULL,

    CONSTRAINT "FlatPostOnUniversityPreferred_pkey" PRIMARY KEY ("flatPostId","universityId")
);

-- CreateTable
CREATE TABLE "FlatPostOnUniversityUndesirable" (
    "universityId" INTEGER NOT NULL,
    "flatPostId" INTEGER NOT NULL,

    CONSTRAINT "FlatPostOnUniversityUndesirable_pkey" PRIMARY KEY ("flatPostId","universityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_genderName_key" ON "Gender"("genderName");

-- CreateIndex
CREATE UNIQUE INDEX "NeighbourForm_userId_key" ON "NeighbourForm"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPost" ADD CONSTRAINT "FlatPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostPhoto" ADD CONSTRAINT "FlatPostPhoto_flatPostId_fkey" FOREIGN KEY ("flatPostId") REFERENCES "FlatPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighbourForm" ADD CONSTRAINT "NeighbourForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighbourForm" ADD CONSTRAINT "NeighbourForm_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" ADD CONSTRAINT "PreferredGendersOnNeighbourForms_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferredGendersOnNeighbourForms" ADD CONSTRAINT "PreferredGendersOnNeighbourForms_neighbourFormId_fkey" FOREIGN KEY ("neighbourFormId") REFERENCES "NeighbourForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" ADD CONSTRAINT "FlatPostOnUniversityPreferred_flatPostId_fkey" FOREIGN KEY ("flatPostId") REFERENCES "FlatPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityPreferred" ADD CONSTRAINT "FlatPostOnUniversityPreferred_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" ADD CONSTRAINT "FlatPostOnUniversityUndesirable_flatPostId_fkey" FOREIGN KEY ("flatPostId") REFERENCES "FlatPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlatPostOnUniversityUndesirable" ADD CONSTRAINT "FlatPostOnUniversityUndesirable_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
