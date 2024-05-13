import { routes } from "@/config/routes";
import { expect, test } from "playwright/fixtures";

test.describe("Settings", () => {
  test("Should be able to update password and sign in with new password", async ({ settingsPage, page, account }) => {
    const newPassword = "new-password";

    await page.getByLabel("Current Password").fill(account.password);
    await page.getByLabel("New Password").fill(newPassword);
    await page.getByRole("button", { name: "Update Password" }).click();

    await settingsPage.waitForToast("Password updated successfully");

    const signOutButton = page.getByLabel("Sign Out");
    await signOutButton.click();

    const signOutConfirm = page.getByRole("button", { name: "Sign Out" });
    await signOutConfirm.click();

    await page.waitForURL(routes.home);

    const signInLink = page.getByRole("link", { name: "Sign In" });
    await signInLink.click();

    await page.getByLabel("Email").fill(account.email);
    await page.getByLabel("Password").fill(newPassword);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);
    const pageTitle = await page.title();

    expect(pageTitle).toBe("Chefy - Explore recipes");
  });

  test("Should be able to remove all preferences and see no suggestions", async ({ settingsPage, page }) => {
    await settingsPage.gotoPreferencesTab();

    await settingsPage.uncheckAllPreferences();

    await page.getByRole("button", { name: "Update Categories" }).click();
    await settingsPage.waitForToast("Preferred categories updated successfully");

    await page.getByRole("button", { name: "Update Areas" }).click();
    await settingsPage.waitForToast("Preferred areas updated successfully");

    await page.goto(routes.explore);

    const noSuggestionsText = page.getByText("No recipes found.");

    await expect(noSuggestionsText).toBeVisible();
  });

  test("Should be able to select preferences and see correct suggestions", async ({ settingsPage, page }) => {
    const selectedCategory = "Beef";
    const selectedArea = "British";

    await settingsPage.gotoPreferencesTab();

    await settingsPage.uncheckAllPreferences();

    await page.getByText(selectedCategory).click();
    await page.getByText(selectedArea).click();

    await page.getByRole("button", { name: "Update Categories" }).click();
    await settingsPage.waitForToast("Preferred categories updated successfully");

    await page.getByRole("button", { name: "Update Areas" }).click();
    await settingsPage.waitForToast("Preferred areas updated successfully");

    await page.goto(routes.explore);

    const categoryLabel = page.getByText(selectedCategory).last();
    const areaLabel = page.getByText(selectedArea).last();

    await expect(categoryLabel).toBeVisible();
    await expect(areaLabel).toBeVisible();
  });
});
