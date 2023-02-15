import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 30 * 1000,
  globalSetup: require.resolve("./global-setup"),
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    // ['./node_modules/@testomatio/reporter/lib/adapter/playwright.js', {
    // apiKey: 'gmlc6f57dmqp',
    // }]
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'https://rozetka.com.ua/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    viewport: { width: 1440, height: 720 },
    video: 'retain-on-failure',
    storageState: "state.json",
  },
};

export default config;
