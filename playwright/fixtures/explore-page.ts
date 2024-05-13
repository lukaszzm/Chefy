import type { Page } from "@playwright/test";

import { routes } from "@/config/routes";

export class ExplorePage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(routes.explore);
  }

  async waitForToast(message: string) {
    const toastMessage = this.page.getByText(message);
    await toastMessage.waitFor({ state: "visible" });
  }

  async getRecipeTitle() {
    const title = await this.page.getByRole("heading").last().textContent();

    if (!title) {
      throw new Error("Could not find recipe title");
    }

    return title;
  }

  async likeRecipe(title: string) {
    const recipetitle = this.page.getByRole("heading", { name: title });

    await this.page.getByLabel(`Like ${title}`, { exact: true }).click();

    await recipetitle.waitFor({ state: "detached" });
  }

  async dislikeRecipe(title: string) {
    const recipetitle = this.page.getByRole("heading", { name: title });

    await this.page.getByLabel(`Dislike ${title}`, { exact: true }).click();

    await recipetitle.waitFor({ state: "detached" });
  }
}
