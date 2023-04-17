import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { CategoryCollectionSchemaRef, CategorySchemaRef } from "../schema";

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
    // preValidation: [isLoggedIn, isStaff],
    handler: controllers.category,
  });

  // getCategories (GET) /
  fastify.route({
    schema: {
      response: {
        200: CategoryCollectionSchemaRef,
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
    url: "/",
    // preValidation: [isLoggedIn, isStaff],
    handler: controllers.categories,
  });

  // createCategory (POST) /
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
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
    url: "/",
    // preValidation: [isLoggedIn, isStaff],
    handler: controllers.createCategory,
  });

  // deleteCategory (DELETE) /:categoryId AND deleteCategories (DELETE) /
  // TO FIX LATER IDK WHY IT'S HALF WORKING

  interface DeleteCategoryRequest extends FastifyRequest {
    Params: {
      categoryId: string;
    };
    Body: {
      categoryIds: string[];
    };
  }

  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      // params: {
      //   type: "object",
      //   properties: {
      //     categoryId: { type: "string" },
      //   },
      //   required: [],
      // },
      // body: {
      //   type: "object",
      //   properties: {
      //     categoryIds: { type: "array", items: { type: "string" } },
      //   },
      //   required: [],
      // },
      operationId: "deleteCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:categoryId?",
    // preValidation: [isLoggedIn, isStaff],
    handler: (
      request: FastifyRequest<DeleteCategoryRequest>,
      reply: FastifyReply
    ) => {
      console.log(request.params.categoryId);
      if (request.params.categoryId && request.body.categoryIds) {
        return reply.badRequest(
          "Either categoryId or categoryIds is required, not both"
        );
      } else if (request.params.categoryId) {
        console.log("deleteCategory");
        controllers.deleteCategory(request, reply);
      } else if (request.body.categoryIds) {
        console.log("deleteCategories");
        controllers.deleteCategories(request, reply);
      } else {
        return reply.badRequest("Either categoryId or categoryIds is required");
      }
    },
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
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
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
    // preValidation: [isLoggedIn, isStaff],
    handler: controllers.updateCategory,
  });
}
