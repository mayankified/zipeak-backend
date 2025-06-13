/*
  Warnings:

  - The values [USER,AGENT] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `agentId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `sqft` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `bathrooms` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `area` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bhk` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carpetArea` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAddress` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `furnishing` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerSqFt` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superBuiltUpArea` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Apartment', 'Villa', 'Plot', 'House');

-- CreateEnum
CREATE TYPE "FurnishingStatus" AS ENUM ('Unfurnished', 'Semi_Furnished', 'Fully_Furnished');

-- CreateEnum
CREATE TYPE "Facing" AS ENUM ('North', 'South', 'East', 'West', 'North_East', 'North_West', 'South_East', 'South_West');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('Ready_to_Move', 'Under_Construction');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'BROKER', 'SALESMAN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BROKER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_agentId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "address",
DROP COLUMN "agentId",
DROP COLUMN "bedrooms",
DROP COLUMN "sqft",
ADD COLUMN     "ageOfProperty" DOUBLE PRECISION,
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "availability" "AvailabilityStatus" NOT NULL,
ADD COLUMN     "balconies" INTEGER,
ADD COLUMN     "bhk" INTEGER NOT NULL,
ADD COLUMN     "carpetArea" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "expectedPossession" TIMESTAMP(3),
ADD COLUMN     "facing" "Facing",
ADD COLUMN     "floorNumber" INTEGER,
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "furnishing" "FurnishingStatus" NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pricePerSqFt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "superBuiltUpArea" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalFloors" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "bathrooms" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Property_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BROKER';
