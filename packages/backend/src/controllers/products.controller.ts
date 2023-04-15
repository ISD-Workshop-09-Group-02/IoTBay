import prisma from "../services/prisma.service";

import { FastifyRequest, FastifyReply } from "fastify";

interface IProduct {
  productId: string;
}

// getProduct (GET) /:productId
export const product = async (
  request: FastifyRequest<{
    Params: IProduct;
  }>,
  reply: FastifyReply
) => {
  const { productId } = request.params;

  if (!productId) {
    return reply.badRequest("No productId provided");
  }

  const product = await prisma.product.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      image: true,
      category: true,
      categoryId: true,
    },
  });

  if (!product) {
    return reply.notFound("Product not found");
  }

  return reply.status(200).send(product);
};

// getProducts (GET) /
export const products = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await prisma.product.findMany({
    select: {
      productId: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      image: true,
      category: true,
      categoryId: true,
    },
  });

  if (!products) {
    return reply.notFound("Products not found");
  }

  return reply.status(200).send(products);
};

// createProduct (POST) /
// deleteProduct (DELETE) /
// deleteProducts (DELETE) /
// updateProduct (PUT) /
