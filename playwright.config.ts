import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 50 * 1000,
  expect: {
    timeout: 50000,
  },
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['line'], ['allure-playwright']],
  use: {
    actionTimeout: 0,
    baseURL: 'https://rozetka.com.ua/ua/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    viewport: { width: 1440, height: 720 },
    video: 'retain-on-failure',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  },
};

export default config;
