/* eslint-disable no-empty-pattern */
import { test as baseTest } from "@playwright/test";

import { routes } from "@/config/routes";
import type { Recipe, User } from "@/types";
import { testAccount } from "playwright/helpers/account";
import { like } from "playwright/helpers/like";

export * from "@playwright/test";
export const test = baseTest.extend<object, { account: User; like: Recipe }>({
  account: [
    async ({}, use) => {
      const account = await testAccount.create();

      await use(account);

      await testAccount.clean(account.id);
    },
    { scope: "worker" },
  ],
  like: [
    async ({ account }, use) => {
      const likedRecipe = await like.create(account.id);

      await use(likedRecipe);

      await like.clean(account.id, likedRecipe.id);
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
