import { expect, test } from '@playwright/test';
import { LoginSelectionPage } from '../models/login.selection.page';
import { AuthPage } from '../models/authentication.page';

test.beforeEach(async ({ page }) => {
  const loginSelectionPage = new LoginSelectionPage(page);
  await loginSelectionPage.goto();
});

test('Should display login selection page title', async ({ page }) => {
  const loginSelectionPage = new LoginSelectionPage(page);

  // Verify that page title is "Welcome to"
  await expect(loginSelectionPage.pageTitle).toHaveText('Welcome to');
});

test('Sign in button should display "Sign in using mobile number"', async ({ page }) => {
  const loginSelectionPage = new LoginSelectionPage(page);

  // Verify that button with text 'Sign in using mobile number' exists"
  await expect(loginSelectionPage.signInButtonText).toHaveText('Sign in using mobile number');

});

// TODO Verify that button with text 'Sign in using UAE Pass' exists"

test('Should be able to proceed to the authentication page', async ({ page }) => {
  const loginSelectionPage = new LoginSelectionPage(page);
  const authPage = new AuthPage(page);

  // Click on the sign in button
  await loginSelectionPage.proceedTologIn();

  // Verify authentication page was opened and page title is "What’s your mobile number?"
  await expect(authPage.pageTitle).toHaveText('What’s your mobile number?');
});

test.describe('Visual comparison', () => {
  test('Login selection page test', async ({ page }) => {
    const loginSelectionPage = new LoginSelectionPage(page);
    const pixelRatio = loginSelectionPage.diffPixelRatio;

    await loginSelectionPage.goto();
    await page.waitForLoadState('load');
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: pixelRatio });
  });
});
