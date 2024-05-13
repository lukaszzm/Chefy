import type { Page } from "@playwright/test";

import { routes } from "@/config/routes";

export class LikesPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(routes.likes);
  }

  async openDropdownMenu(title: string) {
    const dropdownMenuLabel = `Open menu for ${title}`;
    const dropdownMenuButton = this.page.getByLabel(dropdownMenuLabel);
    await dropdownMenuButton.click();
  }

  async clickDetails(title: string) {
    await this.openDropdownMenu(title);

    const detailsButton = this.page.getByRole("menuitem", { name: "Details" });
    await detailsButton.click();
  }

  async clickDownloadPDF(title: string) {
    await this.openDropdownMenu(title);

    const downloadPDFButton = this.page.getByRole("menuitem", { name: "Download PDF" });
    await downloadPDFButton.click();
  }

  async clickDelete(title: string) {
    await this.openDropdownMenu(title);

    const deleteButton = this.page.getByRole("menuitem", { name: "Delete" });
    await deleteButton.click();
  }
}
