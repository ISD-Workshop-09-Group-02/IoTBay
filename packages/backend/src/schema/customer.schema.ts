import { z } from "zod";

export const CustomerSchema = z.string().describe("customerID");

export const CustomerAnonymousSchema = z
.boolean().optional().describe("desired anonymous status");

export const CustomerEditMyDetails = z.object({
  isAnonymous: z.boolean().optional(),
  sex: z.string().optional(),
})

export const CustomerEditSchema = z.object({
  customerId: z.string(),
  isAnonymous: z.boolean().optional(),
  sex: z.string().optional(),
})
