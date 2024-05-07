import { test, expect } from "@playwright/test";

test("Should have valid title", async ({ page }) => {
  await page.goto("/");

  const title = await page.title();
  expect(title).toBe("Chefy - Swipe, cook, love!");
});
