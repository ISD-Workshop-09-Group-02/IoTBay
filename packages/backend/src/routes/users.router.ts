import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { UpdateUserParamsSchemaRef, UpdateUserParamsSchemaType, UpdateUserSchema, UpdateUserSchemaRef, UpdateUserSchemaType, UserCollectionSchemaRef, UserSchemaRef } from "../schema";

export default async function usersRouter(fastify: FastifyInstance) {
  fastify.route({
    schema: {
      response: {
        200: UserSchemaRef,
      },
      operationId: "getMe",
      tags: ["Users"],
    },
    method: "GET",
    url: "/me",
    handler: controllers.me,
  });

  fastify.route({
    schema: {
      response: {
        200: UserSchemaRef,
      },
      params: {
        type: "object",
        properties: {
          userId: { type: "string" },
        },
      },
      operationId: "getUser",
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/:userId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.users,
  });

  fastify.route({
    schema: {
      response: {
        200: UserCollectionSchemaRef,
      },
      operationId: "getUsers",
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.users,
  });

  fastify.route({
    schema: {
      response: {
        200: UserSchemaRef,
      },
      body: UpdateUserSchemaRef,
      params: UpdateUserParamsSchemaRef,
      operationId: "updateUser",
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    
    },
    url: "/:userId",
    method: "PATCH",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.updateUser,

  })

  fastify.route({
    schema: {
      response: {
        200: UserSchemaRef,
      },
      operationId: "updateMe",
      body: UpdateUserSchemaRef,
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    url: "/me",
    method: "PATCH",
    preValidation: [isLoggedIn],
    handler: controllers.updateMe,
  });
}
