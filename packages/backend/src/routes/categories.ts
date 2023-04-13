import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { UserCollectionSchemaRef, UserSchemaRef } from "../schema";

/*
  CreateCategory

  ViewAllCategory
  ViewCategory

  DeleteCategory
  DeleteCategories

  UpdateCategory
*/

export default async function categoriesRouter(fastify: FastifyInstance) {}
