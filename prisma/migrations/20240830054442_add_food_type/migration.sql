-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN "avaliation" INTEGER;

-- CreateTable
CREATE TABLE "food_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RestaurantFoodType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RestaurantFoodType_A_fkey" FOREIGN KEY ("A") REFERENCES "food_type" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RestaurantFoodType_B_fkey" FOREIGN KEY ("B") REFERENCES "restaurants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserFoodType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserFoodType_A_fkey" FOREIGN KEY ("A") REFERENCES "food_type" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFoodType_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantFoodType_AB_unique" ON "_RestaurantFoodType"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantFoodType_B_index" ON "_RestaurantFoodType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFoodType_AB_unique" ON "_UserFoodType"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFoodType_B_index" ON "_UserFoodType"("B");
