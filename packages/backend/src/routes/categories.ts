import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { CategorySchemaRef } from "../schema";

/*
  getCategory (GET) /:categoryId
  getCategories (GET) /

  createCategory (POST) /

  deleteCategory (DELETE) /
  deleteCategories (DELETE) /

  updateCategory (PUT) /
*/

export default async function categoriesRouter(fastify: FastifyInstance) {
  // getCategory (GET) /:categoryId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {
          categoryId: { type: "string" },
        },
      },
      operationId: "getCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/:categoryId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // getCategories (GET) /
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {},
      },
      operationId: "getCategories",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // createCategory (POST) /
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {},
      },
      operationId: "createCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "POST",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // deleteCategory (DELETE) /:categoryId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {
          categoryId: { type: "string" },
        },
      },
      operationId: "deleteCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:categoryId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // deleteCategories (DELETE) /
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {},
      },
      operationId: "deleteCategories",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // updateCategory (PUT) /:categoryId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: {
        type: "object",
        properties: {
          categoryId: { type: "string" },
        },
      },
      operationId: "updateCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "PUT",
    url: "/:categoryId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });
}
