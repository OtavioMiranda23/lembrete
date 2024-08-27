-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "street" TEXT,
    "num" TEXT,
    "region" TEXT
);
