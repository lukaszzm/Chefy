import { routes } from "@/config/routes";
import { expect, test } from "playwright/fixtures";

test.describe("Explore", () => {
  test("Should change recipe after dislike", async ({ page }) => {
    await page.goto(routes.explore);

    const firstTitle = await page.getByRole("heading").last().textContent();

    const dislikeButton = page.getByLabel("Dislike recipe").last();
    await dislikeButton.click();

    // Wait for the animation to finish
    await page.waitForTimeout(500);

    const secondTitle = await page.getByRole("heading").last().textContent();

    expect(firstTitle).not.toBe(secondTitle);
  });

  test("Should change recipe after like", async ({ page }) => {
    await page.goto(routes.explore);

    const firstTitle = await page.getByRole("heading").last().textContent();

    const dislikeButton = page.getByLabel("Like recipe").last();
    await dislikeButton.click();

    // Wait for the animation to finish
    await page.waitForTimeout(500);

    const secondTitle = await page.getByRole("heading").last().textContent();

    expect(firstTitle).not.toBe(secondTitle);
  });

  test("Should add recipe to likes", async ({ page }) => {
    await page.goto(routes.explore);

    const recipeTitle = await page.getByRole("heading").last().textContent();

    if (!recipeTitle) {
      throw new Error("No recipe title found");
    }

    const likeButton = page.getByLabel("Like recipe").last();
    await likeButton.click();

    await page.goto(routes.likes);
    const likeTitle = page.getByRole("heading", { name: recipeTitle });

    expect(likeTitle).toBeVisible();
  });
});
