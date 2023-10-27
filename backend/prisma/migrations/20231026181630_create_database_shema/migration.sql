-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('LIST_USERS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" "Permission"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "love_amount" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_likes" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "moviesId" TEXT NOT NULL,

    CONSTRAINT "user_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
