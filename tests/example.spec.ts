import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://playwright.dev/');
    await use(page);
    await page.context().close();
  },
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  //await expect(page.getByRole('link', { name: 'API Reference' })).toBeVisible();
});
