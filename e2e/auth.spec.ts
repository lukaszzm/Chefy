import test, { expect } from "@playwright/test";

import { routes } from "@/config/routes";
import { deleteUserByMail, getUserByMail } from "@/lib/db/queries/user";

const testUser = {
  email: process.env.E2E_EMAIL ?? "",
  name: process.env.E2E_NAME ?? "",
  password: process.env.E2E_PASSWORD ?? "",
} as const;

test.describe("Authentication", () => {
  test.beforeAll(async () => {
    const existedUser = await getUserByMail(testUser.email);

    if (existedUser) {
      await deleteUserByMail(testUser.email);
    }
  });

  test("Should redirect to sign in page", async ({ page }) => {
    await page.goto(routes.explore);

    await expect(page).toHaveURL(routes.signIn);
  });

  test("Should sign up, automatically sign in and sign out", async ({ page }) => {
    await page.goto(routes.signUp);

    await page.getByLabel("Name").fill(testUser.name);
    await page.getByLabel("Email").fill(testUser.email);
    await page.getByLabel("Password").fill(testUser.password);

    await page.getByRole("button", { name: "Create An Account" }).click();

    await page.waitForURL(routes.explore);

    await page.getByRole("button", { name: "Sign Out" }).click();

    // confirmation dialog
    await page.getByRole("button", { name: "Sign Out" }).click();

    await expect(page).toHaveURL(routes.home);
  });

  test.afterAll(async () => {
    await deleteUserByMail(testUser.email);
  });
});
