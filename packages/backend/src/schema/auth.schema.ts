import { Static, Type } from "@sinclair/typebox";

/**
 * Login schema
 * Used for data validation and documentation
 */
export const LoginSchema = Type.Object(
  {
    username: Type.String({ format: "email" }),
    password: Type.String(),
  },
  {
    description: "LoginSchema",
    $id: "LoginSchema",
  }
);

export const LoginSchemaRef = Type.Ref(LoginSchema);

export type LoginSchemaType = Static<typeof LoginSchema>;

export const RegisterSchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    password: Type.String(),
    name: Type.String(),
    phone: Type.String(),
    address: Type.String(),
  },
  {
    description: "RegisterSchema",
    $id: "RegisterSchema",
  }
);

export const RegisterSchemaRef = Type.Ref(RegisterSchema);

export type RegisterSchemaType = Static<typeof RegisterSchema>;
