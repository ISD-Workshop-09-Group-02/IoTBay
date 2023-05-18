import { t } from "../trpc";
import { authRouterDefinition } from "./auth.router";
import { categoryRouterDefinition } from "./categories.router";
import { ordersRouterDefinition } from "./order.router";
import { productsRouterDefinition } from "./products.router";
import { staffRouterDefinition } from "./staff.router";
import { userRouterDefinition } from "./user.router";

export const appRouter = t.router({
  auth: authRouterDefinition,
  users: userRouterDefinition,
  products: productsRouterDefinition,
  categories: categoryRouterDefinition,
  staff: staffRouterDefinition,
  orders: ordersRouterDefinition,
});

// export type definition of API
export type AppRouter = typeof appRouter;
