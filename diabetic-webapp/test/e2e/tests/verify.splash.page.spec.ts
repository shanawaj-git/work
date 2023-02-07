import { expect, test } from '@playwright/test';
import { SplashPage } from '../models/splash.page';
import { LoginSelectionPage } from '../models/login.selection.page';

test.beforeEach(async ({ page }) => {
  const splashPage = new SplashPage(page);
  await splashPage.goto();
});

test('Should make transition from splash to login selection page', async ({ page }) => {
  const loginSelectionPage = new LoginSelectionPage(page);

  // Verify that transition is made automatically from the Splash page to the Login selection page
  await page.waitForURL(loginSelectionPage.url);
});

test.describe('Visual comparison', () => {
  test('Splash page test', async ({ page }) => {
    const splashPage = new SplashPage(page);
    const pixelRatio = splashPage.diffPixelRatio;

    await page.waitForLoadState('load');
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: pixelRatio });
  });
});
