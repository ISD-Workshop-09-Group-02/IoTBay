import { z } from "zod";
import {
  EditLineItemSchema,
  OrderAddProductSchema,
  OrderCreateSchema,
  OrderDeleteSchema,
} from "../schema/order.schema";
import { t } from "../trpc";
import {
  loggedInProcedure,
  publicProcedure,
  staffProcedure,
} from "../trpc/utils";
import { TRPCError } from "@trpc/server";

export const ordersRouterDefinition = t.router({
  /**
   * Create all orders
   */
  createOrder: loggedInProcedure
    .input(OrderCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.create({
        data: {
          userId: ctx.user.userId,
          date: new Date(),
          total: 0,
        },
      });

      const initialLineItem = await ctx.prisma.orderLineItem.create({
        data: {
          quantity: input.products.quantity,
          productId: input.products.productId,
          orderId: order.orderId,
          userId: ctx.user.userId,
        }
      })

      const orderWithLineItem = await ctx.prisma.order.findUnique({
        where: {
          orderId: order.orderId,
        },
        include: {
          orderLineItem: true,
        },
      });



      // Create a new order for the specific user
      

      return orderWithLineItem;
    }),

  /**
   * Delete an order
   */
  deleteOrder: staffProcedure
    .input(OrderDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          orderId: input,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      return ctx.prisma.order.delete({
        where: {
          orderId: input,
        },
      });
    }),

  /**
   * Add a product to an order
   */
  addProduct: loggedInProcedure
    .input(OrderAddProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { orderId, product, quantity } = input;

      const order = await ctx.prisma.order.findUnique({
        where: {
          orderId,
        },
      });

      if (order?.userId !== ctx.user?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to add products to this order",
        });
      }

      const createdLineItem = await ctx.prisma.orderLineItem.create({
        data: {
          orderId,
          productId: product,
          userId: ctx.user.userId,
          quantity,
        },
      });

      const newOrder = await ctx.prisma.order.findUnique({
        where: {
          orderId,
        },
        include: {
          orderLineItem: true,
        },
      });
    }),

  /**
   * Edit line item quantity
   */
  editLineItem: loggedInProcedure
    .input(EditLineItemSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to edit this line item",
        });
      }

      const lineItem = await ctx.prisma.orderLineItem.findUnique({
        where: {
          orderLineItemId: input.lineItemId,
        },
      });

      if (lineItem?.userId !== ctx.user?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to edit this line item",
        });
      }

      const updatedLineItem = await ctx.prisma.orderLineItem.update({
        where: {
          orderLineItemId: input.lineItemId,
        },
        data: {
          quantity: input.quantity,
        },
      });

      const updatedOrder = await ctx.prisma.order.findUnique({
        where: {
          orderId: lineItem.orderId,
        },
        include: {
          orderLineItem: true,
        },
      });

      return updatedOrder;
    }),
  /**
   * Delete Product from Order
   */
  deleteProduct: loggedInProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const lineItem = await ctx.prisma.orderLineItem.findUnique({
        where: {
          orderLineItemId: input,
        },
      });

      if (lineItem?.userId !== ctx.user?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this line item",
        });
      }

      const deletedLineItem = await ctx.prisma.orderLineItem.delete({
        where: {
          orderLineItemId: input,
        },
      });

      const updatedOrder = await ctx.prisma.order.findUnique({
        where: {
          orderId: lineItem.orderId,
        },
        include: {
          orderLineItem: true,
        },
      });

      return updatedOrder;
    }),

    getOrder: loggedInProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          orderId: input,
        },
        include: {
          orderLineItem: true,
        },
      });

      if (order?.userId !== ctx.user?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this order",
        });
      }

      return order;
    }
  ),
});
