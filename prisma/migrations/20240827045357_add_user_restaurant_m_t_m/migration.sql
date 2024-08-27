-- CreateTable
CREATE TABLE "_UserRestaurants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserRestaurants_A_fkey" FOREIGN KEY ("A") REFERENCES "restaurants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserRestaurants_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserRestaurants_AB_unique" ON "_UserRestaurants"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRestaurants_B_index" ON "_UserRestaurants"("B");
