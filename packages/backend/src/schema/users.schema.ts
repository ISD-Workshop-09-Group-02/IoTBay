import zod from 'zod';
import validator from 'validator';

export const userSchema = zod.object({
    userId: zod.string().cuid(),
    email: zod.string().refine((value) => validator.isEmail(value), {
        message: 'Invalid email',
    }),
    name: zod.string(),
    userType: zod.enum(["staff", "customer"]),
    shippingAddress: zod.string().optional().nullable(),
    billingAddress: zod.string().optional().nullable(),
    dob: zod.string().datetime().optional().nullable(),
});

export const userCollectionSchema = zod.array(userSchema);

export type UserSchemaType = zod.infer<typeof userSchema>;

export type UserCollectionSchemaType = zod.infer<typeof userCollectionSchema>;