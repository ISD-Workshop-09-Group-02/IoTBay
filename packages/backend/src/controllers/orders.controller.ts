  import prisma from "../services/prisma.service";
  
  import { FastifyRequest, FastifyReply } from "fastify";
  
  export const createOrder = async (
    request: FastifyRequest<{ Body: CreateOrderBodySchemaType }>,
    reply: FastifyReply
  ) => {
    const {OrderLineItem, orderItem, date, total, userId } = request.body;
  
   
    const order = await prisma.order.create({
      data: {
        quantity,
        price,
        customer: { connect: { id: userId } },
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        customer: true,
        date_created: true,
      },
    });
  
    if (!order) {
      return reply.internalServerError("Failed to create order");
    }
  
    return reply.status(201).send(order);
  };
  

  
  // addProductToOrder (POST) /:orderId/add-product
  export const addProductToOrder = async (
    request: FastifyRequest<{
      Params: GetOrderParamsSchemaType;
      Body: AddProductToOrderBodySchemaType;
    }>,
    reply: FastifyReply
  ) => {
    const { orderId } = request.params;
    const { productId, quantity } = request.body;
  
    const order = await prisma.order.findUnique({
      where: {
        orderId,
      },
    }); 
  
    if (!order) {
      return reply.notFound("Order not found");
    }
  
    const product = await prisma.product.findUnique({
      where: {
        productId,
      },
    });
  
    if (!product) {
      return reply.notFound("Product not found");
    }
  
    if (product.quantity < quantity) {
      return reply.badRequest("Insufficient quantity of product available");
    }
  
    const orderItem = await prisma.orderItem.create({
      data: {
        quantity,
        product: {
          connect: {
            productId,
          },
        },
        order: {
          connect: {
            orderId,
          },
        },
      },
      include: {
        product: true,
      },
    });
  
    if (!orderItem) {
      return reply.internalServerError("Failed to add product to order");
    }
  
    // Update product quantity
    const updatedProduct = await prisma.product.update({
      where: {
        productId,
      },
      data: {
        quantity: product.quantity - quantity,
      },
    });
  
    return reply.status(201).send(orderItem);
  };
  