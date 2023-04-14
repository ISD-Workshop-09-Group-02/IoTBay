import prisma from "../services/prisma.service";

import { FastifyRequest, FastifyReply } from "fastify";

// getProduct (GET) /:productId
export const product = async (
  request: FastifyRequest<{ Params: { productId: string } }>,
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
      // price: true,
      // stock: true,
      // description: true,
      // image: true,
      // category: true,
      // OrderLineItem: true,
      // Category: true,
      // categoryId: true,
    },
  });

  if (!product) {
    return reply.notFound("Product not found");
  }

  return reply.status(200).send(product);
};

// getProducts (GET) /
// createProduct (POST) /
// deleteProduct (DELETE) /
// deleteProducts (DELETE) /
// updateProduct (PUT) /
