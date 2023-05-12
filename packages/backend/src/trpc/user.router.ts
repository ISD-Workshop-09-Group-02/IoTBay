import { z } from "zod";
import { t } from ".";
import { loggedInProcedure, publicProcedure, staffProcedure } from "./utils";
import { TRPCError } from "@trpc/server";

export const userRouterDefinition = t.router({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.req.user;
  }),
  user: staffProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        userId: input,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    return user;
  }),
  users: staffProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();

    return users.map(({ password, ...user }) => user);
  }),
});
