-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR NOT NULL,
    "maximum" INTEGER NOT NULL,
    "theme" VARCHAR NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pots" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "target" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "theme" VARCHAR NOT NULL,

    CONSTRAINT "pots_pkey" PRIMARY KEY ("id")
);
