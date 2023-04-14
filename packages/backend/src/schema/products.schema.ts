import { Static, Type } from "@sinclair/typebox";

export const ProductsSchema = Type.Object(
  {
    productId: Type.String({ format: "uuid" }),
    name: Type.String(),
    price: Type.Number(),
    stock: Type.Number(),
    description: Type.String(),
    image: Type.String(),
    category: Type.String(),
    // OrderLineItems: Type.Array(Type.String()),
    // Category: Type.String(),
    categoryId: Type.String({ format: "uuid" }),
  },
  {
    description: "ProductsSchema",
    $id: "ProductsSchema",
  }
);

export const ProductSchemaRef = Type.Ref(ProductsSchema);

export type ProductsSchemaType = Static<typeof ProductsSchema>;

export const ProductsCollectionSchema = Type.Array(ProductSchemaRef, {
  description: "ProductsCollectionSchema",
  $id: "ProductsCollectionSchema",
});

export const ProductsCollectionSchemaRef = Type.Ref(ProductsCollectionSchema);

export type ProductsCollectionSchemaType = Static<
  typeof ProductsCollectionSchema
>;
