/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Profile";

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "instagram" TEXT,
    "github" TEXT,
    "bio" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);
