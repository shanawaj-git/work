import { expect, Locator, Page } from '@playwright/test';
import configData from '../data/config.json';

export class LoginSelectionPage {
  constructor(
    readonly page: Page,
    readonly starturl = configData.splashPageURL,
    readonly url = configData.loginSelectionPageURL,
    readonly diffPixelRatio = configData.DiffPixelRatio,
    readonly pageTitle = page.locator('.title-container > h1'),
    readonly appTitle = page.locator('.title-logo'),
    readonly signInButtonText = page.locator('button > div'),
    readonly signInButton = page.locator('button'),
    readonly startPageImage = page.locator('sc-bdVaJa > img')) {
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async goFromStart() {
    await this.page.goto(this.starturl);
  }

  async proceedTologIn() {
    await this.signInButton.click();
  }
}
