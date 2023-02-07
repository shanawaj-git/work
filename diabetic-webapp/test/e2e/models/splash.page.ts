import { expect, Locator, Page } from '@playwright/test';
import configData from '../data/config.json';

export class SplashPage {
  constructor(
    readonly page: Page,
    readonly url = configData.splashPageURL,
    readonly diffPixelRatio = configData.DiffPixelRatio,
    readonly startPageImage = page.locator('sc-bdVaJa > img')) {
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
