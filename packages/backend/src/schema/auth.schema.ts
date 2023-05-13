import { z } from "zod";
import isMobilePhone from 'validator/es/lib/isMobilePhone'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string(),
  phone: z.string().refine(isMobilePhone, {
    message: 'Invalid phone number',
  }),
  address: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
