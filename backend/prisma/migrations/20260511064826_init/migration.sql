/*
  Warnings:

  - You are about to drop the `block_reason` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "block_reason";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "login" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
