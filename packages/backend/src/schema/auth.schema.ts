import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
