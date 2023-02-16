import { test } from '@playwright/test';
import { MainPage } from '../page-objects/main.page';
import { ProductPage } from '../page-objects/product.page';

test('Verify if item search work correctly', async ({ page }) => {
  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);

  await test.step('Open marketplace main page. Verify url.', async () => {
    await mainPage.openMainPageUrl();
    await mainPage.checkPageUrl('https://rozetka.com.ua/ua/');
  });

  await test.step('Search by the item name. Verify items', async () => {
    await mainPage.searchItem('SSD')
    await productPage.verifySDDItemsOnPage();
  });
});
