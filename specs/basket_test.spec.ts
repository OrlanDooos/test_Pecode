import { test } from '@playwright/test';
import { MainPage } from '../page-objects/main.page';
import { ProductPage } from '../page-objects/product.page';
import { BasketModal } from '../page-objects/basket_modal.page';

test('Verify if the basket work correctly', async ({ page }) => {
  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);
  const basketModal = new BasketModal(page);
  let firstItemPrice: any;
  let secondItemPrice: any;
  let oldTotalPrice: any;
  let firstItemName: string;
  let secondItemName: string;

  await test.step('Open marketplace main page. Verify url.', async () => {
    await page.goto('/', { waitUntil: 'load' });
    await mainPage.checkPageUrl('https://rozetka.com.ua/ua/');
  });

  await test.step('Add a few items from the different categories to basket, remember price.', async () => {
    await mainPage.openCategoryMenu();
    await mainPage.focusOnCategory('Ноутбуки та комп’ютери');
    await mainPage.selectSubcategoryInMenu('SSD');
    await productPage.setPrice('1000', '3000');
    await productPage.addItemToBasket(0);
    firstItemName = await productPage.getProductName(0);
    firstItemPrice = await productPage.getItemPrice(0);
    await page.goto('/', { waitUntil: 'load' });
    await mainPage.openCategory('Смартфони, ТВ і електроніка');
    await mainPage.selectSubcategoryInList('Мобільні телефони');
    await productPage.addItemToBasket(0);
    secondItemName = await productPage.getProductName(0);
    secondItemPrice = await productPage.getItemPrice(0);
  });

  await test.step('Open basket, verify items name, total price, delete first item and verify total price again', async () => {
    await mainPage.openBasket();
    oldTotalPrice = await basketModal.getTotalPrice();
    await basketModal.verifyTotalPrice();
    await basketModal.verifyProductName(1, firstItemName);
    await basketModal.verifyProductName(0, secondItemName);
    await basketModal.removeItem(0);
    await basketModal.verifyNewTotalPrice(secondItemPrice);
  });
});
