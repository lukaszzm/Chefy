import { routes } from "@/config/routes";
import { setUserDefaultPreferences } from "@/lib/db/queries/user";
import { expect, test } from "playwright/fixtures";

test.describe("Settings", () => {
  test.afterEach(async ({ user }) => {
    await setUserDefaultPreferences(user.id);
  });

  test("Should be able to update password and sign in with new password", async ({ settingsPage, page, account }) => {
    const email = account.email;
    const currentPassword = account.password;
    const newPassword = "new-password";

    await page.getByLabel("Current Password").fill(currentPassword);
    await page.getByLabel("New Password").fill(newPassword);
    await page.getByRole("button", { name: "Update Password" }).click();

    await settingsPage.waitForToast("Password updated successfully");

    const signOutButton = page.getByRole("button", { name: "Sign Out" });
    await signOutButton.click();

    const signOutConfirm = page.getByRole("button", { name: "Sign Out" });
    await signOutConfirm.click();

    await page.waitForURL(routes.signIn);

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(newPassword);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);

    // back to the original password
    await page.goto(routes.settings);
    await page.getByLabel("Current Password").fill(newPassword);
    await page.getByLabel("New Password").fill(currentPassword);
    await page.getByRole("button", { name: "Update Password" }).click();

    await settingsPage.waitForToast("Password updated successfully");

    await signOutButton.click();
    await signOutConfirm.click();

    await page.waitForURL(routes.signIn);

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(currentPassword);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForURL(routes.explore);
    const pageTitle = await page.title();

    expect(pageTitle).toBe("Explore recipes | Chefy");
  });

  test("Should be able to remove all preferences and see no suggestions", async ({ settingsPage, page }) => {
    await settingsPage.gotoPreferencesTab();
    await settingsPage.toggleAllPreferences();

    await page.getByRole("button", { name: "Update Categories" }).click();
    await settingsPage.waitForToast("Preferred categories updated successfully");

    await page.getByRole("button", { name: "Update Areas" }).click();
    await settingsPage.waitForToast("Preferred areas updated successfully");

    await page.goto(routes.explore);

    const noSuggestionsText = page.getByText("No recipes found.");

    await expect(noSuggestionsText).toBeVisible();
  });

  test("Should be able to select preferences and see correct suggestions", async ({ settingsPage, page }) => {
    const selectedCategory = "Seafood";
    const selectedArea = "Thai";

    await settingsPage.gotoPreferencesTab();
    await settingsPage.toggleAllPreferences();

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
