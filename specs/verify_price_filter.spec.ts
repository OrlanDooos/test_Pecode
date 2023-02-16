// import { test } from '@playwright/test';
// import { MainPage } from '../page-objects/main.page';
// import { ProductPage } from '../page-objects/product.page';

// test('Verify if the price filter work correctly', async ({ page }) => {
//   const mainPage = new MainPage(page);
//   const productPage = new ProductPage(page);

//   await test.step('Open marketplace main page. Verify url.', async () => {
//     await page.goto('/', { waitUntil: 'load' });
//     await mainPage.checkPageUrl('https://rozetka.com.ua/ua/');
//   });

//   await test.step('Open subcategory page. Select product. Use some filters, set price. Verify price.', async () => {
//     await mainPage.openCategoryMenu();
//     await mainPage.focusOnCategory('Ноутбуки та комп’ютери');
//     await mainPage.selectSubcategoryInMenu('SSD');
//     await productPage.selectProductBrand('Kingston');
//     await productPage.setPrice('1000', '3000');
//     await productPage.selectCapacityOfDisk('480 - 512');
//     await productPage.verifyPriceFilter();
//   });
// });
