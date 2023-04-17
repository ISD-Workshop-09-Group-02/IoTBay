import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { userCollectionSchema, userSchema } from "../schema";

export default async function usersRouter(fastify: FastifyInstance) {
  fastify.route({
    schema: {
      response: {
        200: userSchema,
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
        200: userSchema,
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
    handler: controllers.user,
  });

  fastify.route({
    schema: {
      response: {
        200: userCollectionSchema,
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
}
