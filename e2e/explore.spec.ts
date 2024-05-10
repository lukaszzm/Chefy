import { routes } from "@/config/routes";
import { expect, test } from "playwright/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("Explore", () => {
  test("Should change recipe after dislike", async ({ page }) => {
    await page.goto(routes.explore);

    const firstTitle = await page.getByRole("heading").last().textContent();
    const firstElement = page.getByRole("heading", { name: firstTitle ?? "COULD_NOT_FIND" });

    const dislikeButton = page.getByLabel(`Dislike ${firstTitle}`).last();
    await dislikeButton.click();

    await firstElement.waitFor({ state: "detached" });
    const secondElement = page.getByRole("heading").last();

    await expect(secondElement).not.toHaveText(firstTitle ?? "COULD_NOT_FIND");
  });

  test("Should change recipe after like", async ({ page }) => {
    await page.goto(routes.explore);

    const firstTitle = await page.getByRole("heading").last().textContent();
    const firstElement = page.getByRole("heading", { name: firstTitle ?? "COULD_NOT_FIND" });

    const likeButton = page.getByLabel(`Like ${firstTitle}`).last();
    await likeButton.click();

    await firstElement.waitFor({ state: "detached" });
    const secondElement = page.getByRole("heading").last();

    await expect(secondElement).not.toHaveText(firstTitle ?? "COULD_NOT_FIND");
  });

  test("Should add recipe to likes", async ({ page }) => {
    await page.goto(routes.explore);

    const recipeTitle = await page.getByRole("heading").last().textContent();

    const likeButton = page.getByLabel(`Like ${recipeTitle}`).last();
    await likeButton.click();

    await page.goto(routes.likes);
    const likeTitle = page.getByRole("heading", { name: recipeTitle ?? "COULD_NOT_FIND" });

    await expect(likeTitle).toBeVisible();
  });
});
