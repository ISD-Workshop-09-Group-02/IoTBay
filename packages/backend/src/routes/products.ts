import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { UserCollectionSchemaRef, UserSchemaRef } from "../schema";

/*
  CreateProduct
  ViewAllProduct
  ViewProduct
  DeleteProduct
  DeleteProducts
  UpdateProduct
*/

export default async function productsRouter(fastify: FastifyInstance) {
  fastify.route({
    schema: {
      response: {
        200: ProductsSchemaRef,
      },
      operationId: "getProducts",
      tags: ["Products"],
    },
    method: "GET",
    url: "",
    handler: controllers.products,
  });

  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: {
        type: "object",
        properties: {
          productId: { type: "string" },
        },
      },
      operationId: "getProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });


}
