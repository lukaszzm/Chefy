/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from "@playwright/test";

import { routes } from "@/config/routes";
import { getUserByMail } from "@/lib/db/queries/user";
import type { Recipe, User } from "@/types";
import { E2E_ACCOUNTS, E2EAccount } from "playwright/config/accounts";
import { createTestLike, removeTestLike } from "playwright/utils";

interface WorkerFixtures {
  account: E2EAccount;
  user: User;
  like: Recipe;
}

export const test = base.extend<object, WorkerFixtures>({
  account: [
    async ({}, use) => {
      const parallelIndex = test.info().parallelIndex;
      const account = E2E_ACCOUNTS.at(parallelIndex);

      if (!account) {
        throw new Error(
          "No account found for the current parallel index, try to decrease the number of parallel tests"
        );
      }

      await use(account);
    },
    { scope: "worker" },
  ],
  user: [
    async ({ account }, use) => {
      const user = await getUserByMail(account.email);

      if (!user) {
        throw new Error("User not found in the database, ensure the E2E user exists");
      }

      await use(user);
    },
    { scope: "worker" },
  ],

  like: [
    async ({ user }, use) => {
      const recipe = await createTestLike(user.id);

      await use(recipe);

      await removeTestLike(user.id, recipe.id);
    },
    { scope: "worker" },
  ],

  page: async ({ page, account }, use) => {
    await page.goto(routes.signIn);

    await page.getByLabel("Email").fill(account.email);
    await page.getByLabel("Password").fill(account.password);

    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);

    await use(page);
  },
});

export { expect } from "@playwright/test";
