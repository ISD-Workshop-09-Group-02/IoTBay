import { Static, Type } from "@sinclair/typebox";

export const CategorySchema = Type.Object(
  {
    categoryId: Type.String({ format: "uuid" }),
    name: Type.String(),
  },
  {
    description: "CategorySchema",
    $id: "CategorySchema",
  }
);

export const CategorySchemaRef = Type.Ref(CategorySchema);

export type CategorySchemaType = Static<typeof CategorySchema>;

export const CategoryCollectionSchema = Type.Array(CategorySchemaRef, {
  description: "CategoryCollectionSchema",
  $id: "CategoryCollectionSchema",
});

export const CategoryCollectionSchemaRef = Type.Ref(CategoryCollectionSchema);

export type CategoryCollectionSchemaType = Static<
  typeof CategoryCollectionSchema
>;
