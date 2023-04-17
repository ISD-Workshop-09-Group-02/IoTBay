import zod from 'zod';
import validator from 'validator';

export const userSchema = zod.object({
    userId: zod.string().cuid(),
    email: zod.string().refine((value) => validator.isEmail(value), {
        message: 'Invalid email',
    }),
    name: zod.string(),
    userType: zod.enum(["staff", "customer"]),
    shippingAddress: zod.string().optional(),
    billingAddress: zod.string().optional(),
    dob: zod.string().datetime().optional(),
});

export const userCollectionSchema = zod.array(userSchema);

export type UserSchemaType = zod.infer<typeof userSchema>;

export type UserCollectionSchemaType = zod.infer<typeof userCollectionSchema>;