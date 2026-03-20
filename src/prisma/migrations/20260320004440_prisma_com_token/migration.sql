-- CreateEnum
CREATE TYPE "Type" AS ENUM ('NORMAL', 'REFRESH');

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'NORMAL',
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_fkey" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
