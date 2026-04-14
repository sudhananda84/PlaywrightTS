import {test as base, expect, chromium} from "@playwright/test";
import type {Page} from "@playwright/test";

/**
 * Shared Playwright test instance: import `test` / `expect` from here in every spec
 * instead of `@playwright/test` so these fixtures apply everywhere.
 *
 * `otterPage` is worker-scoped: one context + page per worker, reused by every test
 * in this worker that lists `{ otterPage }` (including across multiple spec files).
 * Use `workers: 1` in config if you need a single shared page for the whole run.
 *
 * Worker-scoped fixtures are typed in the **second** `extend<>` parameter
 * (`extend<{}, { otterPage: Page }>`); the first is for test-scoped fixtures only.
 */
export const test = base.extend<{}, {mainPage: Page}>({
  mainPage: [
    async ({}, use) => {
      const browser = await chromium.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // <-- your system browser path
        args: ['--disable-blink-features=AutomationControlled']

      });
      const context = await browser.newContext({
        javaScriptEnabled:true,
        permissions:['geolocation']
      });
      await context.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false
  });
});
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      const { windowId } = await session.send('Browser.getWindowForTarget');

      await session.send('Browser.setWindowBounds', {
        windowId,
        bounds: { windowState: 'maximized' }
      });
      await page.goto("https://owasp.org/"); 
      const value = await page.evaluate(() => navigator.webdriver);
      console.log("navigator.webdriver =", value);
     // await page.pause();
      await page.click(".nav-button>a[href*=store]");
      await page.waitForTimeout(10000);
      await page.waitForLoadState("load");
      await expect(page.locator("//a[@aria-label='Link to Zazzle home page']"), "store page is not opened after clicking on store button").toBeVisible({timeout:10000});
      await use(page);
      await context.close();
    },
    {scope: "worker"},
  ],
});

export {expect} from "@playwright/test";
