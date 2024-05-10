import { routes } from "@/config/routes";
import { slugRoute } from "@/utils/slug-route";
import { expect, test } from "playwright/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("Likes", () => {
  test("Should redirect to recipe page after click on Details", async ({ page, like }) => {
    const dropdownMenuLabel = `Open menu for ${like.title}`;

    await page.goto(routes.likes);

    const dropdownMenuButton = page.getByLabel(dropdownMenuLabel);
    await dropdownMenuButton.click();

    const detailsButton = page.getByRole("menuitem", { name: "Details" });
    await detailsButton.click();

    await page.waitForURL(slugRoute(routes.like, { id: like.id }));

    const recipeTitle = page.getByRole("heading", { name: like.title });
    const recipeInstructions = page.getByText(like.instructions);

    await expect(recipeTitle).toBeVisible();
    await expect(recipeInstructions).toBeVisible();
  });

  test("Should download PDF file after click on Generate PDF", async ({ page, like }) => {
    const expectedFileName = `${like.title}_Chefy.pdf`;
    const dropdownMenuLabel = `Open menu for ${like.title}`;

    await page.goto(routes.likes);

    const dropdownMenuButton = page.getByLabel(dropdownMenuLabel);
    await dropdownMenuButton.click();

    const generatePDFButton = page.getByRole("menuitem", { name: "Download PDF" });
    await generatePDFButton.click();

    const download = await page.waitForEvent("download");

    expect(download.suggestedFilename()).toBe(expectedFileName);
  });

  test("Should remove recipe from likes after click on Delete", async ({ page, like }) => {
    const dropdownMenuLabel = `Open menu for ${like.title}`;

    await page.goto(routes.likes);

    const recipeTitle = page.getByRole("heading", { name: like.title });

    const dropdownMenuButton = page.getByLabel(dropdownMenuLabel);
    await dropdownMenuButton.click();

    const deleteButton = page.getByRole("menuitem", { name: "Delete" });
    await deleteButton.click();

    await expect(recipeTitle).toBeHidden();
  });
});
