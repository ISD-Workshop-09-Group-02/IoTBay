import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  name: Type.String(),
  userType: Type.String({ enum: ["staff", "customer"] }),
  shippingAddress: Type.Optional(Type.String()),
  billingAddress: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
}, {
  description: "UserSchema",
  $id: "UserSchema",
});

export const UserSchemaRef = Type.Ref(UserSchema);

export type UserSchemaType = Static<typeof UserSchema>;

export const UserCollectionSchema = Type.Array(UserSchemaRef, {
    description: 'UserCollectionSchema',
    $id: 'UserCollectionSchema',
})

export const UserCollectionSchemaRef = Type.Ref(UserCollectionSchema)

export type UserCollectionSchemaType = Static<typeof UserCollectionSchema>

export const UpdateUserParamsSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
}, {
  $id: "UpdateUserParamsSchema",
})

export const UpdateUserParamsSchemaRef = Type.Ref(UpdateUserParamsSchema)

export type UpdateUserParamsSchemaType = Static<typeof UpdateUserParamsSchema>

export const UpdateUserSchema = Type.Object({
  email: Type.Optional(Type.String({ format: "email" })),
  name: Type.Optional(Type.String()),
  shippingAddress: Type.Optional(Type.String()),
  billingAddress: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
}, {
  description: "UpdateUserSchema",
  $id: "UpdateUserSchema",
});

export const UpdateUserSchemaRef = Type.Ref(UpdateUserSchema);

export type UpdateUserSchemaType = Static<typeof UpdateUserSchema>;
