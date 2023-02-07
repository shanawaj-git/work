import React from 'react';
import { render, fireEvent, getByTestId, wait } from 'react-testing-library';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-test-renderer';

import appConfigs from 'configs/applicationConfig.json';
import { AuthErrorCode, AuthMutations } from 'features/auth/api/graphql';
import OTPInput from '../index';

const { OTP_LENGTH, RESEND_OTP_DELAY_IN_SECONDS } = appConfigs;

describe('<OTPInput />', () => {
  // eslint-disable-next-line no-global-assign
  window = Object.assign(window, {
    visualViewport: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  });

  const phoneNumber = '0123456789';
  const referrer = '/prescriptions/123456798';
  const mockLocation = {
    state: {
      phoneNumber,
      referrer,
    },
  };

  const otpVerficationInput = { phoneNumber, otp: '123456' };

  let mockHistory;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
  });

  afterEach(() => {
    mockHistory = null;
  });

  // eslint-disable-next-line react/prop-types
  const MockOtpInput = ({ locale }) => (
    <BrowserRouter>
      <IntlProvider locale={locale}>
        <MockedProvider>
          <OTPInput location={mockLocation} />
        </MockedProvider>
      </IntlProvider>
    </BrowserRouter>
  );

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<MockOtpInput locale="en" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('redirects to phone-login screen when phoneNumber is missing in the route params', () => {
    const OtpInputCmp = () => (
      <IntlProvider locale="en">
        <MockedProvider>
          <OTPInput
            location={{
              ...mockLocation,
              state: {
                phoneNumber: '',
              },
            }}
          />
        </MockedProvider>
      </IntlProvider>
    );

    const dummyPhoneLoginContent = 'Dummy phone login page content';
    const PhoneLoginCmp = () => dummyPhoneLoginContent;

    const { container } = render(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={OtpInputCmp} />
          <Route exact path="/phone-login" component={PhoneLoginCmp} />
        </Switch>
      </BrowserRouter>,
    );

    expect(container.textContent).toBe(dummyPhoneLoginContent);
  });

  it(`OTP input length should be a fixed length (${OTP_LENGTH})`, () => {
    act(() => {
      render(<MockOtpInput locale="en" />);
    });
    const input = document.querySelector('.MuiInputBase-input');
    const inputNumber = '123456';
    fireEvent.change(input, { target: { value: `${inputNumber}` } });
    expect(input.value).toEqual(`${inputNumber}`);
  });
  it(`OPT input should not have more than ${OTP_LENGTH} digits`, () => {
    act(() => {
      render(<MockOtpInput locale="en" />);
    });
    const input = document.querySelector('.MuiInputBase-input');
    const inputNumber = '12345678';
    fireEvent.change(input, { target: { value: `${inputNumber}` } });
    expect(input.value).toEqual('');
  });
  it(`OTP input  should be numbers Only`, () => {
    act(() => {
      render(<MockOtpInput locale="en" />);
    });
    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, { target: { value: `hi i am number` } });
    expect(input.value).toBe('');
  });
  it('Timer should count down and localstorage should updated', () => {
    act(() => {
      render(<MockOtpInput locale="en" />);
    });
    const localStorageCounterVal = window.localStorage.getItem(
      'otp.resend.seconds.remaining',
    );
    expect(localStorageCounterVal).toBe(RESEND_OTP_DELAY_IN_SECONDS);
  });
  it('Button should be disabled before input change and OTP length matches', () => {
    act(() => {
      render(<MockOtpInput locale="en" />);
    });
    const nextBtn = document.querySelector('[data-testid="nextButton"]');
    expect(nextBtn.getAttribute('disabled')).toEqual('');
    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, { target: { value: '123456' } });
    expect(nextBtn.getAttribute('disabled')).toBeNull();
  });
  it(`App loads with initial counter of ${RESEND_OTP_DELAY_IN_SECONDS}`, () => {
    // eslint-disable-next-line no-shadow
    const { container } = render(<MockOtpInput locale="en" />);
    const countValue = getByTestId(container, 'counter-value');
    expect(countValue.textContent).toBe(
      `Resend in ${RESEND_OTP_DELAY_IN_SECONDS}s`,
    );
  });
  it('Timer Rest', async () => {
    render(<MockOtpInput locale="en" />);
    jest.runAllTimers();
    const resendLink = document.querySelector('.resend-link-text');
    expect(resendLink.textContent).toBe(`Resend`);
  });

  it('restarts the timer after a successful OTP is resent', async () => {
    const otpInput = { phoneNumber };
    const mocks = [
      {
        request: {
          query: AuthMutations.GenerateOTP,
          variables: { input: otpInput },
        },
        result: { data: { generateOTP: { success: true, error: null } } },
      },
    ];

    render(
      <BrowserRouter>
        <IntlProvider locale="en">
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );
    jest.runAllTimers();
    const resendLink = document.querySelector('[data-testid="resend-link"]');
    fireEvent.click(
      resendLink,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      const counterAfterTimeEllapsed = document.querySelector(
        '[data-testid="counter-value"]',
      );
      expect(counterAfterTimeEllapsed.textContent).toBe(
        `Resend in ${RESEND_OTP_DELAY_IN_SECONDS}s`,
      );
    });
  });

  it('displays error and resend option is enabled after resend otp failed with a specific reason', async () => {
    const otpInput = { phoneNumber };
    const mocks = [
      {
        request: {
          query: AuthMutations.GenerateOTP,
          variables: { input: otpInput },
        },
        result: {
          data: {
            generateOTP: {
              success: false,
              error: { code: AuthErrorCode.MaxAttemptsExceeded },
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.error.maxAttemptsExceeded';

    const messages = {
      [errorMsgCode]: 'Some error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );
    jest.runAllTimers();
    const resendLink = document.querySelector('[data-testid="resend-link"]');
    fireEvent.click(
      resendLink,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="resend-error-text"]').textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));

      expect(document.querySelector('.resend-link-text').textContent).toBe(
        `Resend`,
      );
    });
  });

  it('displays the generic error and resend option is enabled after resend otp failed with an unknown reason', async () => {
    const otpInput = { phoneNumber };
    const mocks = [
      {
        request: {
          query: AuthMutations.GenerateOTP,
          variables: { input: otpInput },
        },
        result: {
          data: {
            generateOTP: {
              success: false,
              error: { code: 'auth.err.unknownReason' },
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );
    jest.runAllTimers();
    const resendLink = document.querySelector('[data-testid="resend-link"]');
    fireEvent.click(
      resendLink,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="resend-error-text"]').textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));

      expect(document.querySelector('.resend-link-text').textContent).toBe(
        `Resend`,
      );
    });
  });

  it('displays the generic error and resend option is enabled after resend otp failed with missing error code', async () => {
    const otpInput = { phoneNumber };
    const mocks = [
      {
        request: {
          query: AuthMutations.GenerateOTP,
          variables: { input: otpInput },
        },
        result: {
          data: {
            generateOTP: {
              success: false,
              error: {},
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );
    jest.runAllTimers();
    const resendLink = document.querySelector('[data-testid="resend-link"]');
    fireEvent.click(
      resendLink,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="resend-error-text"]').textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));

      expect(document.querySelector('.resend-link-text').textContent).toBe(
        `Resend`,
      );
    });
  });

  it('displays the generic error and resend option is enabled after resend otp failed for unknown reason', async () => {
    const otpInput = { phoneNumber };
    const mocks = [
      {
        request: {
          query: AuthMutations.GenerateOTP,
          variables: { input: otpInput },
        },
        error: new Error('An error occurred'),
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );
    jest.runAllTimers();
    const resendLink = document.querySelector('[data-testid="resend-link"]');
    fireEvent.click(
      resendLink,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="resend-error-text"]').textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));

      expect(document.querySelector('.resend-link-text').textContent).toBe(
        `Resend`,
      );
    });
  });

  it('redirects to the prescription details page after a successful OTP verfication', async () => {
    const mocks = [
      {
        request: {
          query: AuthMutations.ValidateOTP,
          variables: { input: otpVerficationInput },
        },
        result: { data: { validateOTP: { success: true, error: null } } },
      },
    ];

    render(
      <BrowserRouter>
        <IntlProvider locale="en">
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} history={mockHistory} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );

    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, {
      target: { value: `${otpVerficationInput.otp}` },
    });

    const verifyButton = document.querySelector('[data-testid="nextButton"]');
    fireEvent.click(
      verifyButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(mockHistory.push).toBeCalledWith({
        // TODO: get the prescriptionId passed here
        pathname: '/prescriptions/123456798',
      });
    });
  });

  it('displays the specific errorvafter validate otp failed with a specific reason', async () => {
    const mocks = [
      {
        request: {
          query: AuthMutations.ValidateOTP,
          variables: { input: otpVerficationInput },
        },
        result: {
          data: {
            validateOTP: {
              success: false,
              error: { code: AuthErrorCode.InvalidCredentials },
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.error.invalidCredentials';

    const messages = {
      [errorMsgCode]: 'Some error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );

    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, {
      target: { value: `${otpVerficationInput.otp}` },
    });

    const verifyButton = document.querySelector('[data-testid="nextButton"]');
    fireEvent.click(
      verifyButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="validation-error-text"]')
          .textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));
    });
  });

  it('displays the generic error after validate otp failed with an unknown reason', async () => {
    const mocks = [
      {
        request: {
          query: AuthMutations.ValidateOTP,
          variables: { input: otpVerficationInput },
        },
        result: {
          data: {
            validateOTP: {
              success: false,
              error: { code: 'auth.err.unknownReason' },
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );

    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, {
      target: { value: `${otpVerficationInput.otp}` },
    });

    const verifyButton = document.querySelector('[data-testid="nextButton"]');
    fireEvent.click(
      verifyButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="validation-error-text"]')
          .textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));
    });
  });

  it('displays the generic error after validate otp failed with missing error code', async () => {
    const mocks = [
      {
        request: {
          query: AuthMutations.ValidateOTP,
          variables: { input: otpVerficationInput },
        },
        result: {
          data: {
            validateOTP: {
              success: false,
              error: {},
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );

    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, {
      target: { value: `${otpVerficationInput.otp}` },
    });

    const verifyButton = document.querySelector('[data-testid="nextButton"]');
    fireEvent.click(
      verifyButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="validation-error-text"]')
          .textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));
    });
  });

  it('displays the generic error after validate otp failed for unknown reason', async () => {
    const mocks = [
      {
        request: {
          query: AuthMutations.ValidateOTP,
          variables: { input: otpVerficationInput },
        },
        error: new Error('An error occurred'),
      },
    ];

    const errorMsgCode = 'phoneLogin.genericAPIError';

    const messages = {
      [errorMsgCode]: 'Sample generic error message',
    };

    render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <OTPInput location={mockLocation} />
          </MockedProvider>
        </IntlProvider>
      </BrowserRouter>,
    );

    const input = document.querySelector('.MuiInputBase-input');
    fireEvent.change(input, {
      target: { value: `${otpVerficationInput.otp}` },
    });

    const verifyButton = document.querySelector('[data-testid="nextButton"]');
    fireEvent.click(
      verifyButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    jest.runAllTimers();

    await wait(() => {
      expect(
        document.querySelector('[data-testid="validation-error-text"]')
          .textContent,
      ).toEqual(expect.stringContaining(messages[errorMsgCode]));
    });
  });
});
