import prisma from "../services/prisma.service";

import { FastifyRequest, FastifyReply } from "fastify";

// getCategory (GET) /:categoryId

interface ICategoryRouteParams {
  categoryId: string;
}

/**
 * Get a category by its categoryId
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns The category with the given categoryId
 */
export const category = async (
  request: FastifyRequest<{ Params: ICategoryRouteParams }>,
  reply: FastifyReply
) => {
  const { categoryId } = request.params;

  const category = await prisma.productCategory.findUnique({
    where: {
      categoryId,
    },
    select: {
      categoryId: true,
      name: true,
    }
  });

  if(!category) {
    return reply.notFound("Category not found");
  }

  return reply.status(200).send(category);
};

// getCategories (GET) /

// createCategory (POST) /

// deleteCategory (DELETE) /
// deleteCategories (DELETE) /

// updateCategory (PUT) /
