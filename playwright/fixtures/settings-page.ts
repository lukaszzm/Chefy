import type { Page } from "@playwright/test";

import { routes } from "@/config/routes";
import { getAllAreas } from "@/lib/db/queries/area";
import { getAllCategories } from "@/lib/db/queries/category";

export class SettingsPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(routes.settings);
  }

  async gotoPreferencesTab() {
    const preferencesTab = this.page.getByRole("tab", { name: "Preferences" });
    await preferencesTab.click();
  }

  async waitForToast(message: string) {
    const toastMessage = this.page.getByText(message);
    await toastMessage.waitFor({ state: "visible" });
  }

  async uncheckAllPreferences() {
    const categories = await getAllCategories();

    for (const category of categories) {
      const categorySelect = this.page.getByText(category.name);
      await categorySelect.click();
    }

    const areas = await getAllAreas();

    for (const area of areas) {
      const areaSelect = this.page.getByText(area.name);
      await areaSelect.click();
    }
  }
}
