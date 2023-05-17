import { Type } from '@sinclair/typebox';

/**
 orderId: string
  date: Date
  total: number
  userId: string
  paymentId: string
  shipmentId: string | null
  invoiceId: string | null
 */

  /**
   OrderLineItem
   orderLineItemId           String           @id @default(cuid())
  orderId                   String
  order                     Order            @relation(fields: [orderId], references: [orderId])
  productId                 String
  product                   Product          @relation(fields: [productId], references: [productId])
  quantity                  Int
  userId                    String
  user  
   */

  export const OrderSchema = Type.Object({
    orderId: Type.String(),
    date: Type.String(),
    total: Type.Number(),
    userId: Type.String(),
    paymentId: Type.String(),
    shipmentId: Type.Optional(Type.String()),
    invoiceId: Type.Optional(Type.String()),
  })

  export const OrderSchemaWithLineItemsAndProducts = Type.Object({
    orderId: Type.String(),
    date: Type.String(),
    total: Type.Number(),
    userId: Type.String(),
    paymentId: Type.String(),
    shipmentId: Type.Optional(Type.String()),
    invoiceId: Type.Optional(Type.String()),
    lineItems: Type.Array(Type.Object())({   
        orderLineItemId: Type.String(),
        orderId: Type.String(),
        productId: Type.String(),
        quantity: Type.Number(),
        userId: Type.String())}
        // product: Type.Object() 
        
  )}


  
  // deleteOrder (DELETE)
  
  export const DeleteOrderParamsSchema = Type.Object(
    {
        orderId: Type.String(),
        userId: Type.String(),
    },
    {
      description: "DeleteOrderParamsSchema",
      $id: "DeleteOrderParamsSchema",
    }
  );
  
  export const DeleteOrderParamsSchemaRef = Type.Ref(DeleteOrderParamsSchema);
  
  export type DeleteOrderParamsSchemaType = Static<
    typeof DeleteOrderParamsSchema
  >;
  
  
  // updateOrder (PUT) /
  
  export const UpdateProductParamSchema = Type.Object(
    {
      orderId: Type.String(),
      lineItems: Type.Array(Type.Object())({   
        orderLineItemId: Type.String(),
        orderId: Type.String(),
        productId: Type.String(),
        quantity: Type.Number(),
        userId: Type.String(),)
    }
    {
      description: "UpdateOrderParamSchema",
      $id: "UpdateOrderParamSchema",
    }
  );
  
  export const UpdateOrderParamSchemaRef = Type.Ref(UpdateOrderParamSchema);
  
  export type UpdateOrderParamSchemaType = Static<
    typeof UpdateOrderParamSchema
  >;
  
             
