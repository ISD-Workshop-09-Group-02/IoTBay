import { TRPCError, initTRPC } from '@trpc/server';
import { z } from 'zod';
import { createContext } from './context';
import { PassportUser } from 'fastify';
import { User } from '@prisma/client';


export const t = initTRPC.context<typeof createContext>().create();

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
       user: ctx.user.user
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const appRouter = t.router({
  getMe: protectedProcedure.input(z.object({})).query(({ctx}) => {
    // console.log(ctx.user);
    return ctx.user as Omit<User, "password">;
  }),
  order: t.router({
    getMyOrder: t.procedure.input(z.object({})).query(({ctx}) => {
      // console.log(ctx.user);
      return {
        test: "hello"
      }
    }
    ),
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;