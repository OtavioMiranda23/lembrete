/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `food_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "food_type_name_key" ON "food_type"("name");
