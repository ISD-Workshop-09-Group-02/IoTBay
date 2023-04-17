import zod from 'zod'
import validator from 'validator'


export const loginSchema = zod.object({
    username: zod.string().refine((value) => validator.isEmail(value), {
        message: 'Invalid email',
    }),
    password: zod.string(),
})

export const registerSchema = zod.object({
    email: zod.string().refine((value) => validator.isEmail(value), {
        message: 'Invalid email',
    }),
    password: zod.string().min(8).max(255),
    name: zod.string().min(3),
    phone: zod.string().refine((value) => validator.isMobilePhone(value), {
        message: 'Invalid phone number',
    }),
    address: zod.string(),
})

export type LoginSchemaType = zod.infer<typeof loginSchema>
export type RegisterSchemaType = zod.infer<typeof registerSchema>