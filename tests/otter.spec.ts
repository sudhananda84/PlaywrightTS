import {test as base, expect} from "@playwright/test";

const test = base.extend({
  page: async ({page}, use) => {
    await page.goto("https://otter.ai/");
    await use(page);
    await page.context().close();
  },
});

test("has title", async ({page}) => {
  await expect(page).toHaveTitle(/Otter/);
});

