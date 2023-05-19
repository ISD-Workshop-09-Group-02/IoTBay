import { z } from "zod";
// model Order {
//     orderId       String          @id @default(cuid())
//     date          DateTime
//     total         Float
//     userId        String
//     user          User            @relation(fields: [userId], references: [userId])
//     paymentId     String
//     payment       Payment?
//     shipmentId    String?
//     shipment      Shipment?
//     invoiceId     String?
//     invoice       Invoice?        @relation(fields: [invoiceId], references: [invoiceId])
//     orderLineItem OrderLineItem[]
//   }
// model OrderLineItem {
//     orderLineItemId String  @id @default(cuid())
//     orderId         String
//     order           Order   @relation(fields: [orderId], references: [orderId])
//     productId       String
//     product         Product @relation(fields: [productId], references: [productId])
//     quantity        Int
//     userId          String
//     user            User    @relation(fields: [userId], references: [userId])
//   }

// CREATE
// This function runs the first time you create an order in the session (when add first item or when the application starts)
// 1:m relationship between user and Order
// createOrder create a new Order row in the database, orderline items empty, default everything to 0 / defaults
//

// createOrder(products, userId)
// The goal of this is to create a new order in the database, tagged to the specific user 1:m
// From this we will return the order ID from the database, as well as maybe the total

export const OrderCreateSchema = z.object({
  products: z.object({
    productId: z.string(),
    quantity: z.number(),
  }),
  userId: z.string(),
});

export const OrderDeleteSchema = z.string().describe("orderId");

export const OrderAddProductSchema = z.object({
  orderId: z.string(),
  product: z.string(),
  quantity: z.number(),
});

export const EditLineItemSchema = z.object({
  lineItemId: z.string(),
  quantity: z.number().positive(),
});

export const OrderDeleteProductsSchema = z.object({
  products: z.object({
    productId: z.string(),
    quantity: z.number(),
  }),
  userId: z.string(),
});
