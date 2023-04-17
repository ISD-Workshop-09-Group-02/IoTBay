import { FastifyInstance } from "fastify";
import fastifyPassport from "@fastify/passport";
import * as controllers from "../controllers";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import { userSchema } from "../schema";

export default async function authRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    schema: {
      body: loginSchema,
      response: {
        200: userSchema,
      },
      operationId: "login",
      tags: ["Authentication"],
    },
    url: "/login",
    preValidation: [
      fastifyPassport.authenticate("local", {
        authInfo: false,
        session: true,
      }),
    ],
    handler: controllers.login,
  });

  fastify.route({
    method: "POST",
    url: "/logout",
    schema: {
      operationId: "logout",
      tags: ["Authentication"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    handler: controllers.logout,
  });

  fastify.route({
    schema: {
      body: registerSchema,
      response: {
        201: userSchema,
      },
      operationId: "register",
      tags: ["Authentication"],
    },
    method: "POST",
    url: "/register",
    handler: controllers.register,
  });
}
