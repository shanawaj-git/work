import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'e2e.env' });
const expectTimeout = parseInt(process.env.EXPECT_TIMEOUT, 10);

const config: PlaywrightTestConfig = {

  testDir: process.env.TEST_DIR,


  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: expectTimeout
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: process.env.REPORTER_OUTPUT_FOLDER, open: 'never' }],
    ['junit', { outputFile: 'results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Test against mobile viewports. */
    {
      name: process.env.PROJECT_CHROME_M,
      use: {
        ...devices[process.env.PROJECT_CHROME_M_DEVICE],
      },
    },
    {
      name: process.env.PROJECT_SAFARI_M,
      use: {
        ...devices[process.env.PROJECT_SAFARI_M_DEVICE],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: process.env.OUTPUT_DIR,
};

export default config;
