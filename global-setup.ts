import { chromium } from "@playwright/test";

async function globalSetup(config: any) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(baseURL!);
    await page.goto('https://rozetka.com.ua/');
    await page.context().storageState({ path: storageState });
    await browser.close();
  }
  
  export default globalSetup;