import { Routes } from "@/config/routes";
import { resetUserReactions } from "@/lib/db/queries/user";
import { expect, test } from "playwright/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("Discover", () => {
  test.afterEach(async ({ user }) => {
    await resetUserReactions(user.id);
  });

  test("Should change recipe after dislike", async ({ discoverPage }) => {
    const firstRecipeTitle = await discoverPage.getRecipeTitle();

    await discoverPage.dislikeRecipe(firstRecipeTitle);

    const secondRecipeTitle = await discoverPage.getRecipeTitle();

    expect(secondRecipeTitle).not.toBe(firstRecipeTitle);
  });

  test("Should change recipe after like", async ({ discoverPage }) => {
    const firstRecipeTitle = await discoverPage.getRecipeTitle();

    await discoverPage.likeRecipe(firstRecipeTitle);

    const secondRecipeTitle = await discoverPage.getRecipeTitle();

    expect(secondRecipeTitle).not.toBe(firstRecipeTitle);
  });

  test("Should add recipe to likes", async ({ discoverPage, page }) => {
    const recipeTitle = await discoverPage.getRecipeTitle();

    await discoverPage.likeRecipe(recipeTitle);

    await page.goto(Routes.Likes);

    const likeTitle = page.getByRole("heading", { name: recipeTitle });

    await expect(likeTitle).toBeVisible();
  });
});
