import { test as base, expect } from "playwright/fixtures/auth-worker";
import { DiscoverPage } from "playwright/fixtures/discover-page";
import { LikesPage } from "playwright/fixtures/likes-page";
import { SettingsPage } from "playwright/fixtures/settings-page";

interface PageFixtures {
  discoverPage: DiscoverPage;
  likesPage: LikesPage;
  settingsPage: SettingsPage;
}

const test = base.extend<PageFixtures>({
  discoverPage: async ({ page }, use) => {
    const discoverPage = new DiscoverPage(page);

    await discoverPage.goto();

    await use(discoverPage);

    await discoverPage.page.close();
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
