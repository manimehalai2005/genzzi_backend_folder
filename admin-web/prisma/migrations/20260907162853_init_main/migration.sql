-- CreateEnum
CREATE TYPE "MasterStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "master_countries" (
    "id" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneCode" TEXT,
    "currencyCode" TEXT,
    "emoji" TEXT,
    "status" "MasterStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_states" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_cities" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_languages" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nativeName" TEXT,
    "status" "MasterStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_currencies" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_timezones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "utcOffset" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_timezones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "status" "MasterStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_industries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_degrees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_universities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT,
    "stateId" TEXT,
    "cityId" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_certification_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_certification_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_file_types" (
    "id" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_file_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_social_platforms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_social_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_colleges" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "website" TEXT,
    "countryId" TEXT,
    "stateId" TEXT,
    "cityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_departments" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_college_departments" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "master_college_departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_countries_iso2_key" ON "master_countries"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "master_countries_iso3_key" ON "master_countries"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "master_states_countryId_name_key" ON "master_states"("countryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "master_cities_stateId_name_key" ON "master_cities"("stateId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "master_languages_code_key" ON "master_languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_currencies_code_key" ON "master_currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_timezones_name_key" ON "master_timezones"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_skills_name_key" ON "master_skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_industries_name_key" ON "master_industries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_degrees_name_key" ON "master_degrees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_universities_name_countryId_key" ON "master_universities"("name", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "master_certification_providers_name_key" ON "master_certification_providers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_file_types_extension_key" ON "master_file_types"("extension");

-- CreateIndex
CREATE UNIQUE INDEX "master_file_types_mimeType_key" ON "master_file_types"("mimeType");

-- CreateIndex
CREATE UNIQUE INDEX "master_social_platforms_name_key" ON "master_social_platforms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_colleges_code_key" ON "master_colleges"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_colleges_name_cityId_key" ON "master_colleges"("name", "cityId");

-- CreateIndex
CREATE UNIQUE INDEX "master_departments_code_key" ON "master_departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_departments_name_key" ON "master_departments"("name");

-- CreateIndex
CREATE INDEX "master_college_departments_departmentId_idx" ON "master_college_departments"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "master_college_departments_collegeId_departmentId_key" ON "master_college_departments"("collegeId", "departmentId");

-- AddForeignKey
ALTER TABLE "master_states" ADD CONSTRAINT "master_states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "master_countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_cities" ADD CONSTRAINT "master_cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "master_states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_universities" ADD CONSTRAINT "master_universities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "master_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_universities" ADD CONSTRAINT "master_universities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "master_states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_universities" ADD CONSTRAINT "master_universities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "master_cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_colleges" ADD CONSTRAINT "master_colleges_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "master_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_colleges" ADD CONSTRAINT "master_colleges_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "master_states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_colleges" ADD CONSTRAINT "master_colleges_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "master_cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_college_departments" ADD CONSTRAINT "master_college_departments_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "master_colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_college_departments" ADD CONSTRAINT "master_college_departments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "master_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
