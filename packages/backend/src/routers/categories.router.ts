import { z } from "zod";
import { t } from "../trpc";
import { publicProcedure, staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";

export const categoryRouterDefinition = t.router({
  category: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const category = await ctx.prisma.productCategory.findUnique({
      where: {
        categoryId: input,
      },
    });

    if (!category) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Category not found",
      });
    }

    return category;
  }),

  categories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.productCategory.findMany();

    return categories;
  }),

  create: staffProcedure
    .input(z.string().describe("name"))
    .mutation(async ({ ctx, input }) => {
      const name = input;

      const category = await ctx.prisma.productCategory.create({
        data: {
          name,
        },
      });

      return category;
    }),

  delete: staffProcedure
    .input(z.string().describe("categoryId"))
    .mutation(async ({ ctx, input }) => {
      const categoryId = input;

      const existingCategory = await ctx.prisma.productCategory.findUnique({
        where: {
          categoryId,
        },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category not found",
        });
      }

      const category = await ctx.prisma.productCategory.delete({
        where: {
          categoryId,
        },
      });

      return category;
    }),

  deleteMany: staffProcedure
    .input(z.array(z.string()).describe("categoryIds"))
    .mutation(async ({ ctx, input }) => {
      const categoryIds = input;

      const existingCategories = await ctx.prisma.productCategory.findMany({
        where: {
          categoryId: {
            in: categoryIds,
          },
        },
      });

      if (!existingCategories.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Categories not found",
        });
      }

      const categories = await ctx.prisma.productCategory.deleteMany({
        where: {
          categoryId: {
            in: categoryIds,
          },
        },
      });

      return categories;
    }),

  update: staffProcedure
    .input(
      z.object({
        categoryId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { categoryId, name } = input;

      const existingCategory = await ctx.prisma.productCategory.findUnique({
        where: {
          categoryId,
        },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category not found",
        });
      }

      const category = await ctx.prisma.productCategory.update({
        where: {
          categoryId,
        },
        data: {
          name,
        },
      });

      return category;
    }),
});
