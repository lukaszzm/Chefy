/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { hash } from "bcrypt";

import { randomUUID } from "crypto";

import { routes } from "@/config/routes";
import { createLikeRecipe, deleteLikeRecipe, getFirstRecipe } from "@/lib/db/queries/recipe";
import { createUserWithPreferences, deleteUser } from "@/lib/db/queries/user";
import type { Recipe, User } from "@/types";

type WorkerFixtures = {
  account: User;
  like: Recipe;
};

const createTestAccount = async () => {
  const id = randomUUID();
  const password = "E2Etest12345!";

  const hashedPassword = await hash(password, 8);

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

const removeTestAccount = async (id: string) => {
  await deleteUser(id);
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
    async ({}, use) => {
      const account = await createTestAccount();

      await use(account);

      await removeTestAccount(account.id);
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

  page: async ({ page, account }, use) => {
    const { email, password } = account;

    await page.goto(routes.signIn);
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);

    await use(page);
  },
});
export { expect } from "@playwright/test";
