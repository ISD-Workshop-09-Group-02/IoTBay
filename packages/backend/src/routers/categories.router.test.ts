import {
  CreateTRPCProxyClient,
  TRPCClientRuntime,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import { beforeAll, describe, expect, test } from "vitest";
import { AppRouter } from "./root.router";
import fetchCookie from "fetch-cookie";
import SuperJSON from "superjson";
import { faker } from "@faker-js/faker";

let trpcClient: CreateTRPCProxyClient<AppRouter>;

beforeAll(async () => {
  trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://127.0.0.1:3000/api/trpc",
        fetch: fetchCookie(fetch),
      }),
    ],
    transformer: SuperJSON,
  });
});

test("login as staff", async () => {
  const loginMutation = trpcClient.auth.login.mutate({
    email: "staff@example.com",
    password: "password",
  });

  expect(loginMutation).resolves.toBeDefined();
});

const testCategory = faker.commerce.department();
const newTestCategory = faker.commerce.department();

test("should create a new category", async () => {
  const category = await trpcClient.categories.create.mutate(testCategory);

  expect(category).toBeDefined();
});

test("should update a category", async () => {
  const category = await trpcClient.categories.update.mutate({
    oldName: testCategory,
    newName: newTestCategory,
  });

  expect(category).toBeDefined();
});

test("should delete a category", async () => {
  const category = await trpcClient.categories.delete.mutate(newTestCategory);

  expect(category).toBeDefined();
});
