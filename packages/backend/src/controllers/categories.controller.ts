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
    },
  });

  if (!category) {
    return reply.notFound("Category not found");
  }

  return reply.status(200).send(category);
};

// getCategories (GET) /
export const categories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const categories = await prisma.productCategory.findMany({
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (categories.length === 0) {
    return reply.notFound("No categories found");
  }

  return reply.status(200).send(categories);
};

interface ICreateCategory {
  name: string;
}

// createCategory (POST) /
export const createCategory = async (
  request: FastifyRequest<{ Body: ICreateCategory }>,
  reply: FastifyReply
) => {
  const { name } = request.body;

  // Check if category already exists

  const categoryExists = await prisma.productCategory.findFirst({
    where: {
      name,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (categoryExists) {
    return reply.badRequest("Category already exists");
  }

  const category = await prisma.productCategory.create({
    data: {
      name,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!category) {
    return reply.internalServerError("Failed to create category");
  }

  return reply.status(201).send(category);
};

// deleteCategory (DELETE) /
// deleteCategories (DELETE) /

// updateCategory (PUT) /
