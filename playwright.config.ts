import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 30 * 1000,
  globalSetup: require.resolve('./global-setup'),
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'my-report' }],
    [
      './node_modules/@testomatio/reporter/lib/adapter/playwright.js',
      {
        apiKey: process.env.TESTOMATIO,
      },
    ],
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'https://rozetka.com.ua/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    viewport: { width: 1440, height: 720 },
    video: 'retain-on-failure',
    storageState: 'state.json',
  },
};

export default config;
