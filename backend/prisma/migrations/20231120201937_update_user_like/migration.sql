/*
  Warnings:

  - The values [LIST_USERS] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permission_new" AS ENUM ('MEMBER', 'MASTER');
ALTER TABLE "users" ALTER COLUMN "permissions" TYPE "Permission_new"[] USING ("permissions"::text::"Permission_new"[]);
ALTER TYPE "Permission" RENAME TO "Permission_old";
ALTER TYPE "Permission_new" RENAME TO "Permission";
DROP TYPE "Permission_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_moviesId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_usersId_fkey";

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
