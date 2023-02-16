import { expect, Locator, Page } from '@playwright/test';
import { delay } from '../utils/helpers';

export class BasketModal {
  readonly page: Page;
  readonly deleteButton: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.locator('//button[text()=" Видалити "]');
    this.totalPrice = page.locator('//div[@class="cart-receipt__sum-price"]/span');
  }

  async productActionsButton(index: number) {
    return this.page.locator('//button[@id="cartProductActions0"]').nth(index);
  }

  async menuButton(index: number) {
    return this.page
      .locator('//button[@class="button button--white button--small popup-menu__toggle popup-menu__toggle--context"]')
      .nth(index);
  }

  async getItemCost(index: number) {
    return this.page.locator('//p[@data-testid="cost"]').nth(index).innerText();
  }

  async getItemName(index: number) {
    return this.page.locator('//a[@data-testid="title"]').nth(index).innerText();
  }

  async formatNumber(number: any) {
    return (number = Number(await number.replace(/\s+/g, '').slice(0, 4)));
  }

  async getTotalPrice() {
    return await this.formatNumber(await this.totalPrice.innerText());
  }

  async verifyTotalPrice() {
    await delay(1000);
    let totalPrice: any;
    let firstItemPrice: any;
    let secondItemPrice: any;
    totalPrice = await this.formatNumber(await this.totalPrice.innerText());
    firstItemPrice = await this.formatNumber(await this.getItemCost(0));
    secondItemPrice = await this.formatNumber(await this.getItemCost(1));
    expect(totalPrice).toEqual(firstItemPrice + secondItemPrice);
  }

  async verifyNewTotalPrice(secondItemName: any) {
    await delay(1000);
    let newTotalPrice: any;
    secondItemName = await this.formatNumber(await this.getItemCost(0));
    newTotalPrice = await this.formatNumber(await this.totalPrice.innerText());
    expect(newTotalPrice).toEqual(secondItemName);
  }

  async verifyProductName(numOfProduct: number, nameFromProductPage: string) {
    expect(await this.getItemName(numOfProduct)).toEqual(nameFromProductPage);
  }

  async removeItem(indexOfItem: number) {
    await (await this.productActionsButton(indexOfItem)).click();
    await this.deleteButton.click();
  }
}
