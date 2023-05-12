import { z } from "zod";
import { t } from "../trpc";
import { publicProcedure, staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";

export const productsRouterDefinition = t.router({
  /**
   * Get a product
   */
  product: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUnique({
      where: {
        productId: input,
      },
    });

    if (!product) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product not found",
      });
    }

    return product;
  }),

  /**
   * Get all products
   */
  products: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();

    return products;
  }),

  /**
   * Create a product
   */
  create: staffProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number().gte(0),
        stock: z.number().int(),
        image: z.string(),
        description: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, price, stock, image, description, category } = input;

      const product = await ctx.prisma.product.create({
        data: {
          name,
          price,
          stock,
          image,
          description,
          category,
        },
      });

      return product;
    }),

  /**
   * Delete a product
   */
  delete: staffProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUnique({
      where: {
        productId: input,
      },
    });

    if (!product) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product not found",
      });
    }

    return ctx.prisma.product.delete({
      where: {
        productId: input,
      },
    });
  }),

  /**
   * Delete many products
   */
  deleteMany: staffProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          productId: {
            in: input,
          },
        },
      });

      if (!products) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product not found",
        });
      }

      return ctx.prisma.product.deleteMany({
        where: {
          productId: {
            in: input,
          },
        },
      });
    }),

    /**
     * Update a product
     */
  update: staffProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string().optional(),
        price: z.number().gte(0).optional(),
        stock: z.number().int().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, name, price, stock, image, description, category } =
        input;

      const product = await ctx.prisma.product.findUnique({
        where: {
          productId,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product not found",
        });
      }

      return ctx.prisma.product.update({
        where: {
          productId,
        },
        data: {
          name,
          price,
          stock,
          image,
          description,
          category,
        },
      });
    }),
});
