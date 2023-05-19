-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "orderId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT,
    "shipmentId" TEXT,
    "invoiceId" TEXT,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("invoiceId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("date", "invoiceId", "orderId", "paymentId", "shipmentId", "total", "userId") SELECT "date", "invoiceId", "orderId", "paymentId", "shipmentId", "total", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
