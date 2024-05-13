import { test as base, expect } from "playwright/fixtures/auth-worker";
import { ExplorePage } from "playwright/fixtures/explore-page";
import { LikesPage } from "playwright/fixtures/likes-page";
import { SettingsPage } from "playwright/fixtures/settings-page";

type PageFixtures = {
  explorePage: ExplorePage;
  likesPage: LikesPage;
  settingsPage: SettingsPage;
};

const test = base.extend<PageFixtures>({
  explorePage: async ({ page }, use) => {
    const explorePage = new ExplorePage(page);

    await explorePage.goto();

    await use(explorePage);

    await explorePage.page.close();
  },
  likesPage: async ({ page }, use) => {
    const likesPage = new LikesPage(page);

    await likesPage.goto();

    await use(likesPage);

    await likesPage.page.close();
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.goto();

    await use(settingsPage);

    await settingsPage.page.close();
  },
});

export { expect, test };
