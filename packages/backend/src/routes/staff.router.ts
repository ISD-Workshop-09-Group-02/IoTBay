import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isAdmin, isLoggedIn, isStaff } from "../helpers/auth";
import { UserCollectionSchemaRef, UserSchemaRef } from "../schema";
import { CreateStaffRecordSchemaRef, StaffSchemaRef } from "../schema/staff.schema";

export default async function staffRouter(fastify: FastifyInstance) {
  fastify.route({
    schema: {
      params: StaffSchemaRef,
      response: {
        200: UserSchemaRef,
      },
      operationId: "promote",
      tags: ["Staff"],
    },
    preValidation: [isLoggedIn, isAdmin],
    method: "GET",
    url: "/promote/:userId",
    handler: controllers.promote,
  });

  fastify.route({
    schema: {
      params: StaffSchemaRef,
      response: {
        200: UserSchemaRef,
      },
      operationId: "demote",
      tags: ["Staff"],
    },
    preValidation: [isLoggedIn, isAdmin],
    method: "GET",
    url: "/demote/:userId",
    handler: controllers.demote,
  });

  fastify.route({
    schema: {
      params: StaffSchemaRef,
      response: {
        200: UserSchemaRef,
      },
      operationId: "getStaff",
      tags: ["Staff"],
    },
    preValidation: [isLoggedIn],
    method: "GET",
    url: "/getStaff/:userId",
    handler: controllers.getStaff,
  });

  fastify.route({
    schema: {
      body: CreateStaffRecordSchemaRef,
      response: {
        200: UserSchemaRef,
      },
      operationId: "CreateStaffRecord",
      tags: ["Staff"],
    },
    preValidation: [isLoggedIn],
    method: "POST",
    url: "/createStaff/",
    handler: controllers.createStaffRecord,
  });

  
}
