import { routes } from "@/config/routes";
import { expect, test } from "playwright/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("Explore", () => {
  test("Should change recipe after dislike", async ({ explorePage }) => {
    const firstRecipeTitle = await explorePage.getRecipeTitle();

    await explorePage.dislikeRecipe(firstRecipeTitle);

    const secondRecipeTitle = await explorePage.getRecipeTitle();

    expect(secondRecipeTitle).not.toBe(firstRecipeTitle);
  });

  test("Should change recipe after like", async ({ explorePage }) => {
    const firstRecipeTitle = await explorePage.getRecipeTitle();

    await explorePage.likeRecipe(firstRecipeTitle);

    const secondRecipeTitle = await explorePage.getRecipeTitle();

    expect(secondRecipeTitle).not.toBe(firstRecipeTitle);
  });

  test("Should add recipe to likes", async ({ explorePage, page }) => {
    const recipeTitle = await explorePage.getRecipeTitle();

    await explorePage.likeRecipe(recipeTitle);

    await page.goto(routes.likes);

    const likeTitle = page.getByRole("heading", { name: recipeTitle });

    await expect(likeTitle).toBeVisible();
  });
});
