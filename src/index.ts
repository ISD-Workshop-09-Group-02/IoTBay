import { Authenticator } from "@fastify/passport";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import fastify from "fastify";
import localStrategy from "./auth/strategies/local.strategy";
import { User } from "@prisma/client";
import prisma from "./services/prisma";
import argon2 from "argon2";
import fs from 'fs'
import path from 'path'
import fastifyPassport from '@fastify/passport'
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { LoginDto, LoginDtoType } from "./auth/dtos/LoginDto";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import routes from "./routes";
import { bootstrap } from 'fastify-decorators';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySecureSession, {
  cookieName: "connect.sid",
  key: fs.readFileSync(new URL("../secret_key", import.meta.url)),
  cookie: {
    path: "/"
  }
});

server.register(fastifySwagger)

server.register(fastifySwaggerUi, {
    routePrefix: '/documentation'
})

server.get('/', (req, res) => {
    res.send("Hello")
})
// server.register(fastifyCookie);

// initialize @fastify/passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

// register an example strategy for fastifyPassport to authenticate users using
fastifyPassport.use("local", localStrategy); // you'd probably use some passport strategy f

fastifyPassport.registerUserSerializer(
  async (user: Omit<User, "password">, request) => user.username
);

// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
fastifyPassport.registerUserDeserializer(async (username: string, request) => {
  const { password, ...user } = await prisma.user.findUniqueOrThrow({
    where: { username },
  });
  return user;
});

export type FastifyRoute = Parameters<typeof server.route>[0];

routes.forEach(route => {
  server.route(route)
});

const start = async () => {
  try {
    console.log("Server Started")
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

