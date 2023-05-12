import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { user: req.user };

  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;