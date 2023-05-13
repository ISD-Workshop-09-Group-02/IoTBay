import { Static, Type } from "@sinclair/typebox";



export const StaffSchema = Type.Object({
  userId: Type.String(),
}, {
  description: "StaffSchema",
  $id: "StaffSchema",
});

export const StaffSchemaRef = Type.Ref(StaffSchema);

export type StaffSchemaType = Static<typeof StaffSchema>;

export const CreateStaffSchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    name: Type.String(),
    userType: Type.String(),
    address: Type.String(),
  },
  {
    description: "CreateStaffSchema",
    $id: "CreateStaffSchema",
  }
);
export const CreateStaffSchemaRef = Type.Ref(CreateStaffSchema);

export type CreateStaffSchemaType = Static<typeof CreateStaffSchema>;

export const CreateStaffRecordSchema = Type.Object({
  userID: Type.String(),
  isAnonmyous: Type.Boolean(),
  sex: Type.String(),
  email: Type.String()
}, {
  description: "CreateStaffRecordSchema",
  $id: "CreateStaffRecordSchema",
});

export const CreateStaffRecordSchemaRef = Type.Ref(CreateStaffRecordSchema);

export type CreateStaffRecordSchemaType = Static<typeof CreateStaffRecordSchema>;