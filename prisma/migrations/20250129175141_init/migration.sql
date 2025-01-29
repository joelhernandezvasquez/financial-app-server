-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "avatar" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "recurring" BOOLEAN NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
