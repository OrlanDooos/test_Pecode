import { expect, Locator, Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly usersDropdownMenu: Locator;
  readonly categoryMenuButton: Locator;
  readonly basketButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMenuButton = page.locator('//button[@id="fat-menu"]');
    this.basketButton = page.locator('//li[@class="header-actions__item header-actions__item--cart"]');
    this.searchInput = page.locator('//input[@class="search-form__input ng-untouched ng-pristine ng-valid"]');
    this.searchButton = page.locator('//button[text()=" Знайти "]');
  }

  async openMainPageUrl() {
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page.locator('//a[@href="https://rozetka.com.ua/ua/"]').click();
  }

  async searchItem(itemName: string) {
    await this.searchInput.fill(itemName);
    await this.searchButton.click();
  }

  async openBasket() {
    await this.basketButton.click();
  }

  async openCategory(categoryName: string) {
    await this.page.locator(`//a[text()="${categoryName}"]`).nth(1).click();
  }

  async selectSubcategoryInList(categoryName: string) {
    await this.page.locator(`//a[text()=" ${categoryName} "]`).click();
  }

  async focusOnCategory(categoryName: string) {
    await this.page.locator(`//a[text()="${categoryName}"]`).nth(1).focus();
  }

  async selectSubcategoryInMenu(subcategoryName: string) {
    await this.page.locator(`//a[@class="menu__link" and text()=" ${subcategoryName} "]`).click();
  }

  async checkPageUrl(pageUrl: string) {
    await expect(this.page).toHaveURL(pageUrl);
  }

  async openCategoryMenu() {
    await this.categoryMenuButton.click();
  }
}
