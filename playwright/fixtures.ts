import { test as baseTest } from "@playwright/test";
import dotenv from "dotenv";

import fs from "fs";
import path from "path";

import { routes } from "@/config/routes";
import { testAccount } from "playwright/helpers/account";

dotenv.config({ override: true });
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export * from "@playwright/test";
export const test = baseTest.extend<object, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const page = await browser.newPage({ storageState: undefined, baseURL: baseUrl });

      const account = await testAccount.create();

      await page.goto(routes.signIn);
      await page.getByLabel("Email").fill(account.email);
      await page.getByLabel("Password").fill(account.password);
      await page.getByRole("button", { name: "Sign in" }).click();

      await page.waitForURL(routes.explore);

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});

test.afterAll(testAccount.clean);
