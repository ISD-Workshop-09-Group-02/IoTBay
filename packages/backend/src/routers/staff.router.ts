import { t } from "../trpc";
import { z } from "zod";
import { staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";

export const staffRouterDefinition = t.router({
  /**
   * Create a new staff user from an existing account
   */
  activate: staffProcedure
    .input(
      z.object({
        userId: z.string(),
        position: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { password, ...user } = await ctx.prisma.user.update({
        where: {
          userId: input.userId,
        },
        data: {
          userType: "staff",
          staffDetails: {
            create: {
              position: input.position,
              isActivated: true,
            },
          },
        },
        include: {
          staffDetails: true,
        },
      });

      return user;
    }),
  /**
   * Remove a staff user from an existing account
   */
  deactivate: staffProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { password, ...user } = await ctx.prisma.user.update({
        where: {
          userId: input,
        },
        data: {
          userType: "customer",
          staffDetails: {
            update: {
              isActivated: false,
            },
          },
        },
        include: {
          staffDetails: true,
        },
      });

      return user;
    }),
  /**
   * Get all staff users and their staff details
   */
  staff: staffProcedure
    .input(
      z
        .object({
          position: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findMany({
        where: {
          userType: "staff",
          staffDetails: {
            position: input?.position,
          },
        },
        include: {
          staffDetails: true,
        },
      });
    }),
  /**
   * Create a new staff user from blank
   */
  create: staffProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        position: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const password = await argon2.hash(input.password);

      const { password: _, ...user } = await ctx.prisma.user.create({
        data: {
          userType: "staff",
          staffDetails: {
            create: {
              position: input.position,
              isActivated: true,
            },
          },
          email: input.email,
          password,
          name: input.name,
          phone: input.phone,
          address: input.address,
        },
        include: {
          staffDetails: true,
        },
      });
        return user;
    }),

  delete: staffProcedure.input(z.string().describe("userId")).mutation(async ({ctx, input}) => {
    // the userId from the input
    const userId = input;

    // Delete the user
    const {password, ...user} = await ctx.prisma.user.delete({
      where: {
        userId: userId,
      },
      include: {
        staffDetails: true,
      }
    });

    // Return the deleted user
    return user
  }) ,
});

// export const deleteStaff = async (
//     request: FastifyRequest<{ Params: StaffSchemaType  }>,
//     reply: FastifyReply
//   ) => {
//     const userId = request.params.userId;

//     const user = await prisma.user.delete({
//       where: {
//         userId: userId,
//       },
//     });

//     return reply.status(200).send(user);
//   };