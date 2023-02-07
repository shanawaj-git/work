import { expect, Locator, Page } from '@playwright/test';
import testData from '../data/auth.page.data.json';
import configData from '../data/config.json';

export class AuthPage {
  constructor(
    readonly page: Page,
    readonly url = configData.authenticationPageURL,
    readonly diffPixelRatio = configData.DiffPixelRatio,
    readonly correctPhoneNumber = testData.correctPhoneNumber,
    readonly incorrectPhoneNumberText = testData.incorrectPhoneNumberText,
    readonly incorrectPhoneNumberNonDigits = testData.incorrectPhoneNumberNonDigits,
    readonly incorrectPhoneNumber11digits = testData.incorrectPhoneNumber11digits,
    readonly incorrectPhoneNumber13digits = testData.incorrectPhoneNumber13digits,
    readonly noCountryCodePhoneNumber9digitsCorrect = testData.noCountryCodePhoneNumber9digitsCorrect,
    readonly noCountryCodePhoneNumber9digitsIncorrect = testData.noCountryCodePhoneNumber9digitsIncorrect,
    readonly pageTitle = page.locator('text=What’s your mobile number?'),
    readonly mobileNumberText = page.locator('label:has-text("Mobile number")'),
    readonly mobileNumberField = page.locator('#mui-1'),
    readonly termsAcceptanceText = page.locator('text=By tapping next, you agree to the'),
    readonly termsButton = page.locator('[data-testid="termsAndConditionsLink"]'),
    readonly termsTitle = page.locator('.MuiModal-root > .MuiPaper-root > .styledComponents__Container-sc-1pcpfy0-0 > div > div:nth-child(1)'),
    readonly nextButton = page.locator('[data-testid=login-btn]'),
    readonly errorMessage = page.locator('.sc-ifAKCX > .MuiTypography-root'),
    readonly mainScreen = page.locator('.MuiBackdrop-root')) {
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async enterCorrectPhoneNumber() {
    await this.mobileNumberField.type(this.correctPhoneNumber);
  }

  async logIn() {
    await this.mobileNumberField.type(this.correctPhoneNumber);
    await this.nextButton.click();
  }

  // TODO
  async enterIncorrectPhoneNumberText() {
    /** Trying but not succeeding in entering letters into the mobile number field */

    await this.mobileNumberField.type(this.incorrectPhoneNumberText);
    await expect(this.mobileNumberField).not.toHaveValue(this.incorrectPhoneNumberText);
  }

  // TODO
  async enterIncorrectPhoneNumberNonDigit() {
    await this.mobileNumberField.type(this.incorrectPhoneNumberNonDigits);
    await expect(this.mobileNumberField).toHaveValue(this.incorrectPhoneNumberNonDigits);
  }

  // TODO
  async enterIncorrectPhoneNumber11digits() {
    await this.mobileNumberField.type(this.incorrectPhoneNumber11digits);
    await expect(this.mobileNumberField).toHaveValue(this.incorrectPhoneNumber11digits);
  }

  // TODO
  async enterIncorrectPhoneNumber13digits() {
    await this.mobileNumberField.type(this.incorrectPhoneNumber13digits);
    await expect(this.mobileNumberField).not.toHaveValue(this.incorrectPhoneNumber13digits);
  }

  // TODO
  async enterCorrectPhoneNumberWithoutCountryCode() {
    await this.mobileNumberField.type(this.noCountryCodePhoneNumber9digitsCorrect);
    await expect(this.mobileNumberField).toHaveValue(this.correctPhoneNumber);
  }

  // TODO
  async enterIncorrectPhoneNumberWithoutCountryCode() {
    await this.mobileNumberField.type(this.noCountryCodePhoneNumber9digitsIncorrect);
    await expect(this.mobileNumberField).toHaveValue(this.noCountryCodePhoneNumber9digitsIncorrect);
  }

  async openTermsAndConditions() {
    await expect(this.termsButton).toBeVisible();
    await this.termsButton.click();
  }

  async closeTermsAndConditions() {
    await this.mainScreen.click();
    await expect(this.nextButton).toBeVisible();
  }

  async verifyNoErrorMessage() {
    await expect(this.errorMessage).not.toBeVisible();
  }

}
