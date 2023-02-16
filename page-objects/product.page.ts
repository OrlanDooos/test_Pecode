import { expect, Locator, Page } from '@playwright/test';
import { delay } from '../utils/helpers';

export class ProductPage {
  readonly page: Page;
  readonly lowerPriceInput: Locator;
  readonly higherPriceInput: Locator;
  readonly namesSSDItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lowerPriceInput = page.locator('//div[@class="slider-filter__inner"]/input[1]');
    this.higherPriceInput = page.locator('//div[@class="slider-filter__inner"]/input[2]');
    this.namesSSDItems = page.locator(
      '//span[@class="goods-tile__title" and (contains(text(),"GB") or contains(text(),"TB") or contains(text(),"SSD"))]',
    );
  }

  async verifySDDItemsOnPage() {
    await delay(1000);
    let countOfItems: number;
    countOfItems = await this.namesSSDItems.count();
    expect(countOfItems).toEqual(60);
  }

  async itemPrice(index: number) {
    return this.page.locator('//span[@class="goods-tile__price-value"]').nth(index);
  }

  async getItemPrice(positionOfItem: number) {
    return (await this.itemPrice(positionOfItem)).innerText();
  }

  async buyButton(index: number) {
    return this.page.locator('//button[@aria-label="Купити"]').nth(index);
  }

  async getProductName(index: number) {
    return this.page.locator('//span[@class="goods-tile__title"]').nth(index).innerText();
  }

  async selectProductBrand(brandName: string) {
    await this.page.locator(`//a[@data-id="${brandName}"]`).click();
  }

  async selectCapacityOfDisk(capacity: string) {
    await delay(1000);
    await this.page.locator(`//a[@data-id="${capacity} ГБ"]`).click();
  }

  async setPrice(lowerPrice: string, higherPrice: string) {
    await delay(1000);
    await this.lowerPriceInput.fill(lowerPrice);
    await this.higherPriceInput.fill(higherPrice);
    await this.page.locator('//button[@type="submit"]').click();
  }

  async verifyPriceFilter() {
    await delay(1000);
    let countOfElements = await this.page.locator('//p[@class="ng-star-inserted"]').count();
    for (let i = 0; countOfElements !== i; i++) {
      let notFromatedPrice: any;
      let formatedPrice: number;
      notFromatedPrice = await (await this.itemPrice(i)).innerText();
      formatedPrice = Number(await notFromatedPrice.replace(/\s+/g, '').slice(0, 4));
      expect(formatedPrice).toBeGreaterThanOrEqual(1000);
      expect(formatedPrice).toBeLessThanOrEqual(3000);
    }
  }

  async addItemToBasket(positionOfItem: number) {
    await delay(1000);
    await (await this.buyButton(positionOfItem)).click();
  }
}
