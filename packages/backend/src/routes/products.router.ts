import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { ProductSchemaRef } from "../schema";

/*
  getProduct (GET) /:productId
  getProducts (GET) /
  createProduct (POST) /
  deleteProduct (DELETE) /
  deleteProducts (DELETE) /
  updateProduct (PUT) /
*/

export default async function productsRouter(fastify: FastifyInstance) {
  // getProduct (GET) /:productId
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
    // preValidation: [isLoggedIn, isStaff],
    handler: controllers.product,
  });

  /*

  // getProducts (GET) /
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: {
        type: "object",
        properties: {},
      },
      operationId: "getProducts",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });

  // createProduct (POST) /
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: {
        type: "object",
        properties: {
          name: { type: "string" },
          price: { type: "number" },
          stock: { type: "number" },
          description: { type: "string" },
          categories: { type: "array" },
          images: { type: "string" },
        },
      },
      operationId: "createProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "POST",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });

  // deleteProduct (DELETE) /
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
      operationId: "deleteProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });

  // deleteProducts (DELETE) /
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
      operationId: "deleteProducts",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });

  // updateProduct (PUT) /
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
      operationId: "updateProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "PUT",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.products,
  });

  */
}
