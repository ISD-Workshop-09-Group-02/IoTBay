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

  let productMappedWithDate = products.map((product) => {
    return {
      ...product,
      lastUpdated: "2021-05-01T00:00:00.000Z",
    };
  });

  return reply.status(200).send(productMappedWithDate);
};

interface ICreateProduct {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
  // categoryId: string;
}

// createProduct (POST) /
export const createProduct = async (
  request: FastifyRequest<{ Body: ICreateProduct }>,
  reply: FastifyReply
) => {
  const {
    name,
    price,
    stock,
    description,
    image,
    category,
    // categoryId,
  } = request.body;

  if (
    !name ||
    !price ||
    !stock ||
    !description ||
    !image ||
    !category
    // !categoryId ||
  ) {
    return reply.badRequest("Missing fields");
  }

  const productExists = await prisma.product.findMany({
    where: {
      name,
      price,
      stock,
      description,
      image,
      category,
      // categoryId,
    },
  });

  if (productExists.length > 0) {
    return reply.badRequest("Product already exists");
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      stock,
      description,
      image,
      // categoryId,
      category,
    },
    select: {
      productId: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      image: true,
      category: true,
      // categoryId: true,
    },
  });

  if (!product) {
    return reply.notFound("Product not found");
  }

  return reply.status(200).send(product);
};

// deleteProduct (DELETE) /
export const deleteProduct = async (
  request: FastifyRequest<{
    Params: IProduct;
  }>,
  reply: FastifyReply
) => {
  const { productId } = request.params;

  if (!productId) {
    return reply.badRequest("No productId provided");
  }

  const findProduct = await prisma.product.findMany({
    where: {
      productId,
    },
  });

  if (findProduct.length === 0) {
    return reply.notFound("Product not found");
  }

  const product = await prisma.product.delete({
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
      // categoryId: true,
    },
  });

  return reply.status(200).send(product);
};

interface IDeleteProducts {
  products: string[];
}

// deleteProducts (DELETE) /
export const deleteProducts = async (
  request: FastifyRequest<{
    Body: IDeleteProducts;
  }>,
  response: FastifyReply
) => {
  const { products } = request.body;

  if (!products) {
    return response.badRequest("No products provided");
  }

  // Find all products that exist with productId
  const findProducts = await prisma.product.findMany({
    where: {
      productId: {
        in: products,
      },
    },
    select: {
      productId: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      image: true,
      category: true,
      // categoryId: true,
    },
  });

  if (findProducts.length !== products.length) {
    return response.badRequest("Some products do not exist");
  }

  const deletedProducts = await prisma.product.deleteMany({
    where: {
      productId: {
        in: products,
      },
    },
  });

  if (!deletedProducts.count || deletedProducts.count === 0) {
    return response.notFound("Products not found");
  }

  return response.status(200).send(findProducts);
};

// updateProduct (PUT) /:productId
export const updateProduct = async (
  request: FastifyRequest<{
    Params: IProduct;
    Body: ICreateProduct;
  }>,
  reply: FastifyReply
) => {
  const { productId } = request.params;
  const { name, price, stock, description, image, category } = request.body;

  if (!productId) {
    return reply.badRequest("No productId provided");
  }

  if (
    !name ||
    !price ||
    !stock ||
    !description ||
    !image ||
    !category
    // !categoryId ||
  ) {
    return reply.badRequest("Missing fields");
  }

  const findProductById = await prisma.product.findMany({
    where: {
      productId,
    },
  });

  if (findProductById.length === 0) {
    return reply.notFound("Product not found");
  }

  const product = await prisma.product.update({
    where: {
      productId,
    },
    data: {
      name,
      price,
      stock,
      description,
      image,
      category,
      // categoryId,
    },
    select: {
      productId: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      image: true,
      category: true,
      // categoryId: true,
    },
  });

  if (!product) {
    return reply.notFound("Product not found");
  }

  return reply.status(200).send(product);
};
