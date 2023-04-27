import localStrategy from "./strategies/local.strategy";
import { User } from "@prisma/client";

import path from "path";
import fastifyPassport from "@fastify/passport";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import prisma from "./services/prisma.service";

import authRouter from "./routes/auth.router";
import usersRouter from "./routes/users.router";
import categoriesRouter from "./routes/categories.router";
import productsRouter from "./routes/products.router";

import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  LoginSchema,
  RegisterSchema,
  UserCollectionSchema,
  UserSchema,
  CategorySchema,
  CategoryCollectionSchema,
  GetCategoryParamsSchema,
  CreateCategoryBodySchema,
  DeleteCategoryParamsSchema,
  DeleteCategoriesBodySchema,
  UpdateCategoryParamsSchema,
  UpdateCategoryBodySchema,
  ProductsSchema,
  ProductsCollectionSchema,
} from "./schema";
import { env } from "./utils";
// Load environment variables
config();

// Get the root folder of the project
const root = path.join(fileURLToPath(import.meta.url), "../..");

// Get the public folder where the client is
const publicRoot = path.join(root, "public");

// declare the server
const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// Register nice error messages
await server.register(await import("@fastify/sensible"));

// Register swagger (api viewer)
await server.register(await import("@fastify/swagger"), {
  openapi: {
    servers: [
      { url: "http://localhost:3000", description: "Development server" },
      {
        url: "https://isd.sebasptsch.dev",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        sessionid: {
          type: "apiKey",
          name: "sessionid",
          in: "cookie",
        },
      },
      schemas: {
        UserSchema,
        UserCollectionSchema,
        LoginSchema,
        RegisterSchema,
        CategorySchema,
        CategoryCollectionSchema,
        GetCategoryParamsSchema,
        CreateCategoryBodySchema,
        DeleteCategoryParamsSchema,
        DeleteCategoriesBodySchema,
        UpdateCategoryParamsSchema,
        UpdateCategoryBodySchema,
        ProductsSchema,
        ProductsCollectionSchema,
      },
    },
    info: {
      title: "IoTBay API",
      version: "0.1.0",
      description: "IoTBay API",
    },
  },
  refResolver: {
    buildLocalReference(json, baseUri, fragment, i) {
      return json.$id?.toString() || `my-fragment-${i}`;
    },
  },
});

// Register schemas to swagger
server.addSchema(UserSchema);
server.addSchema(UserCollectionSchema);
server.addSchema(LoginSchema);
server.addSchema(RegisterSchema);
server.addSchema(CategorySchema);
server.addSchema(CategoryCollectionSchema);
server.addSchema(GetCategoryParamsSchema);
server.addSchema(CreateCategoryBodySchema);
server.addSchema(DeleteCategoryParamsSchema);
server.addSchema(DeleteCategoriesBodySchema);
server.addSchema(UpdateCategoryParamsSchema);
server.addSchema(UpdateCategoryBodySchema);
server.addSchema(ProductsSchema);
server.addSchema(ProductsCollectionSchema);

await server.register(await import("@fastify/swagger-ui"), {
  routePrefix: "/docs",
});

await server.register(await import("@fastify/cookie"));

// Setup Session
await server.register(await import("@fastify/session"), {
  cookieName: "sessionid",
  secret: env.getOrThrow<string>("SESSION_SECRET"),
  cookie: {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
});

// Serve Static Files (Client)
await server.register(await import("@fastify/static"), {
  root: publicRoot,
  wildcard: false,
});

// Initialise Passport for Authentication
await server.register(fastifyPassport.initialize());
await server.register(fastifyPassport.secureSession());

// Register the local strategy (username and password) login
fastifyPassport.use("local", localStrategy);

// This is used to serialize the user into the session e.g. get userId and put it in the session
fastifyPassport.registerUserSerializer(
  async (user: Omit<User, "password">, request) => user.userId
);

// This is used to deserialize the user from the session e.g. get userId from session and get user from database
fastifyPassport.registerUserDeserializer(async (userId: string, request) => {
  const { password, ...user } = await prisma.user.findUniqueOrThrow({
    where: { userId },
  });
  return user;
});

// Register the auth router
await server.register(authRouter, { prefix: "/api/auth" });

// Register the users router
await server.register(usersRouter, { prefix: "/api/users" });

// Register the products router
await server.register(productsRouter, { prefix: "/api/products" });

// Register the categories router
await server.register(categoriesRouter, { prefix: "/api/categories" });

// If there's no route, send the index.html file
await server.setNotFoundHandler((req, res) => {
  res.sendFile("index.html");
});

// Set the server to listen on port 3000
await server.listen({ port: 3000, host: "0.0.0.0" });

// Log the server address
console.log(
  `Server listening on ${server
    .addresses()
    .map(
      (address) =>
        `\r\n ${address.family} - http://${address.address}:${address.port}`
    )
    .join("\n")}`
);
