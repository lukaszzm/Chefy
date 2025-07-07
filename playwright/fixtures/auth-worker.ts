/* eslint-disable react-hooks/rules-of-hooks */
// TODO: FIX E2E Tests
import { test as base } from "@playwright/test";

import { routes } from "@/config/routes";
import { createLikeRecipe, deleteLikeRecipe, getFirstRecipe } from "@/lib/db/queries/recipe";
import { createUserWithPreferences, deleteUser } from "@/lib/db/queries/user";
import type { Recipe, User, Account } from "@/types";
import db from "@/lib/db";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";

interface WorkerFixtures {
  user: User;
  account: Account;
  like: Recipe;
}

const createTestUser = async () => {
  const id = randomUUID();
  const password = "E2Etest12345!";

  const ctx = await auth.$context;
  const hashedPassword = await ctx.password.hash(password);

  const payload = {
    id: id,
    email: `e2e_${id}@e2e.com`,
    name: `e2e_${id}`,
    password: hashedPassword,
  };

  await createUserWithPreferences(payload);

  return {
    ...payload,
    password,
  };
};

const removeTestUser = async (userId: string) => {
  await deleteUser(userId);
};

const getAccountDetailsByUserId = async (userId: string) => {
  return db.query.account
    .findFirst({
      where: (account, { eq }) => eq(account.userId, userId),
    })
    .execute();
};

const createTestLike = async (userId: string) => {
  const recipe = await getFirstRecipe();

  if (!recipe) {
    throw new Error("Data not found");
  }

  await createLikeRecipe(userId, recipe.id);

  return recipe;
};

async function removeTestLike(userId: string, recipeId: string) {
  await deleteLikeRecipe(userId, recipeId);
}

export const test = base.extend<object, WorkerFixtures>({
  account: [
    async (_, use) => {
      const user = await createTestUser();
      const account = await getAccountDetailsByUserId(user.id);

      if (!account) {
        throw new Error("Account not found for the created user");
      }

      await use({ ...user, ...account });

      await removeTestUser(account.id);
    },
    { scope: "worker" },
  ],

  like: [
    async ({ account }, use) => {
      const recipe = await createTestLike(account.id);

      await use(recipe);

      await removeTestLike(account.id, recipe.id);
    },
    { scope: "worker" },
  ],

  page: async ({ page, account, user }, use) => {
    if (!account.password) {
      throw new Error("Account password is required for authentication");
    }

    const credentials = {
      email: user.email,
      password: account.password,
    };

    await page.goto(routes.signIn);
    await page.getByLabel("Email").fill(credentials.email);
    await page.getByLabel("Password").fill(credentials.password);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);

    await use(page);
  },
});
export { expect } from "@playwright/test";
