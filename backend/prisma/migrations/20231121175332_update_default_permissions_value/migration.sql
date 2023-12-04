-- AlterTable
ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT ARRAY['MEMBER']::"Permission"[];
