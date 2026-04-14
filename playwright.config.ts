import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    trace: 'on-first-retry',
    viewport: { width: 1420, height: 1000 },
  launchOptions: {
    args: ['--force-device-scale-factor=0.7']
  },
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
         viewport: { width: 1420, height: 1000 }, // your desired resolution
      launchOptions: {
        args: ['--start-maximized'],
      },},
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
         },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    
  ],
});
