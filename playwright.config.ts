import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
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
    headless: true,
    locale: 'ua-UA',
    timezoneId: 'Europe/Kiev',
    geolocation: { longitude: 50.450001, latitude: 30.523333 },
    viewport: { width: 1440, height: 720 },
    video: 'retain-on-failure',
    storageState: 'state.json',
  },
};

export default config;
