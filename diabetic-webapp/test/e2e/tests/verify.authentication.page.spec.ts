import { expect, test } from '@playwright/test';
import { AuthPage } from '../models/authentication.page';

test.beforeEach(async ({ page }) => {
  const authPage = new AuthPage(page);
  await authPage.goto();
});

test('Should display authentication page title', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify that page title is "What’s your mobile number?"
  await expect(authPage.pageTitle).toHaveText('What’s your mobile number?');
});

test('Should display terms and conditions acceptance text', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify that the correct agreement information about accepting the terms and conditions is displayed?"
  await expect(authPage.termsAcceptanceText).toHaveText('By tapping next, you agree to the');
});

test.skip('Should display Terms and Conditions text by clicking the T&C button', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Open Terms and Conditions folder
  await authPage.openTermsAndConditions();

  // Verify Terms and Conditions title (Terms & Conditions)
  await expect(authPage.termsTitle).toHaveText('Terms and conditions:');

  // TODO Verify Terms and Conditions text (Terms & Conditions)

  // Close Terms and Conditions folder
  await authPage.closeTermsAndConditions();
});

test('Next button should be disabled while phone number field is empty', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify mobile number field is empty
  await expect(authPage.mobileNumberField).toBeEmpty();

  // Verify Next button is disabled
  await expect(authPage.nextButton).toBeDisabled();
});

test('Next button should be enabled after correct phone number is entered', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify mobile number field has been populated correctly
  await authPage.enterCorrectPhoneNumber();

  // Verify Next button is disabled
  await expect(authPage.nextButton).toBeEnabled();
});

test('Next button should stay disabled if non digit was entered', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Mobile phone field populated by a dash symbol "-"
  await authPage.enterIncorrectPhoneNumberNonDigit();

  // Verify Next button is disabled
  await expect(authPage.nextButton).toBeDisabled();
});
// TODO
test('Next button should stay disabled if the number with country code has less then 12 digits', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Mobile phone field populated with less then 12 digits
  await authPage.enterIncorrectPhoneNumber11digits();

  // Verify Next button is disabled
  await expect(authPage.nextButton).toBeDisabled();
});

// TODO
test('Should not be possible to enter more then 12 digits', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify that it is not possible to enter more then 12 digits
  await authPage.enterIncorrectPhoneNumber13digits();
});

// TODO
test('Should be possible to enter phone number without country code', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Enter correct mobile phone number without the country code (971)
  await authPage.enterCorrectPhoneNumberWithoutCountryCode();

  // Verify Next button is enabled
  await expect(authPage.nextButton).toBeEnabled();
});

// TODO
test('Next button should stay disabled if entered phone number is without country code and does not start with digit 5', async ({ page }) => {
  const authPage = new AuthPage(page);

  // It is not possible to enter incorrect mobile phone number without the country code (971) (number that doesn't start with digit 5)
  await authPage.enterIncorrectPhoneNumberWithoutCountryCode();

  // Verify Next button is disabled
  await expect(authPage.nextButton).toBeDisabled();
});

test('Should not be possible to enter letters into the mobile number field', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Verify mobile number field has not been populated with letters
  await authPage.enterIncorrectPhoneNumberText();
});

test('Verify that no error message is present durin log in', async ({ page }) => {
  const authPage = new AuthPage(page);

  // Enter mobile number
  await authPage.enterCorrectPhoneNumber();
  await authPage.pageTitle.click();

  // Verify no error message is present
  await authPage.verifyNoErrorMessage();

  // Click next button
  await authPage.nextButton.click();

  // Verify no error message is present
  await authPage.verifyNoErrorMessage();
});

test.describe('Visual comparison', () => {
  test('Authentication page test', async ({ page }) => {
    const authPage = new AuthPage(page);
    const pixelRatio = authPage.diffPixelRatio;

    await authPage.goto();
    await page.waitForLoadState('load');
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: pixelRatio });
  });
});
