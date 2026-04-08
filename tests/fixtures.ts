import {test as base} from "@playwright/test";
import type {Page} from "@playwright/test";

/**
 * Shared Playwright test instance: import `test` / `expect` from here in every spec
 * instead of `@playwright/test` so these fixtures apply everywhere.
 *
 * `otterPage` is worker-scoped: one context + page per worker, reused by every test
 * in this worker that lists `{ otterPage }` (including across multiple spec files).
 * Use `workers: 1` in config if you need a single shared page for the whole run.
 *
 * Worker-scoped fixtures must be declared in the second generic of `extend` so
 * TypeScript knows they exist on `test(...)`.
 */
export const test = base.extend<{}, {otterPage: Page}>({
  otterPage: [
    async ({browser}, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://otter.ai/");
      await use(page);
      await context.close();
    },
    {scope: "worker"},
  ],
});

export {expect} from "@playwright/test";
