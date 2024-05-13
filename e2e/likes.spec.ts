import { routes } from "@/config/routes";
import { slugRoute } from "@/utils/slug-route";
import { expect, test } from "playwright/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("Likes", () => {
  test("Should redirect to recipe page after click on Details", async ({ page, like, likesPage }) => {
    await likesPage.clickDetails(like.title);

    await page.waitForURL(slugRoute(routes.like, { id: like.id }));

    const recipeTitle = page.getByRole("heading", { name: like.title });
    const recipeInstructions = page.getByText(like.instructions);

    await expect(recipeTitle).toBeVisible();
    await expect(recipeInstructions).toBeVisible();
  });

  test("Should download PDF file after click on Generate PDF", async ({ page, like, likesPage }) => {
    const expectedFileName = `${like.title}_Chefy.pdf`;

    await likesPage.clickDownloadPDF(like.title);

    const download = await page.waitForEvent("download");

    expect(download.suggestedFilename()).toBe(expectedFileName);
  });

  test("Should remove recipe from likes after click on Delete", async ({ page, like, likesPage }) => {
    const recipeTitle = page.getByRole("heading", { name: like.title });

    await likesPage.clickDelete(like.title);

    await expect(recipeTitle).toBeHidden();
  });
});
