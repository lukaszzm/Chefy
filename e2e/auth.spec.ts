import test, { expect } from "@playwright/test";

import { routes } from "@/config/routes";
import { deleteUserByMail, getUserByMail } from "@/lib/db/queries/user";

const E2E_NEW_USER = {
  email: `not-exist-${process.env.E2E_EMAIL}`,
  name: process.env.E2E_NAME!,
  password: process.env.E2E_PASSWORD!,
} as const;

test.describe("Authentication", () => {
  test.beforeAll(async () => {
    const existedUser = await getUserByMail(E2E_NEW_USER.email);

    if (existedUser) {
      await deleteUserByMail(E2E_NEW_USER.email);
    }
  });

  test("Should redirect to sign in page", async ({ page }) => {
    await page.goto(routes.explore);

    await expect(page).toHaveURL(routes.signIn);
  });

  test("Should sign up, automatically sign in and sign out", async ({ page }) => {
    await page.goto(routes.signUp);

    await page.getByLabel("Name").fill(E2E_NEW_USER.name);
    await page.getByLabel("Email").fill(E2E_NEW_USER.email);
    await page.getByLabel("Password").fill(E2E_NEW_USER.password);

    await page.getByRole("button", { name: "Create An Account" }).click();

    await page.waitForURL(routes.explore);

    await page.getByRole("button", { name: "Sign Out" }).click();

    // confirmation dialog
    await page.getByRole("button", { name: "Sign Out" }).click();

    await expect(page).toHaveURL(routes.signIn);
  });

  test.afterAll(async () => {
    await deleteUserByMail(E2E_NEW_USER.email);
  });
});
