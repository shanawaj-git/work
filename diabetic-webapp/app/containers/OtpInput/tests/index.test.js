import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-test-renderer';
import * as authApis from 'apis/auth';
import appConfigs from 'configs/applicationConfig.json';
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

  // eslint-disable-next-line no-unused-vars
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
          <OTPInput location={mockLocation} history={mockHistory} />
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
  describe('OTP Validation Integration', () => {
    let validateOTPSpy;

    beforeEach(() => {
      validateOTPSpy = jest.spyOn(authApis, 'validateOTP');
    });

    afterEach(() => {
      validateOTPSpy.mockRestore();
    });

    const mockClickNextButton = () => {
      const button = document.querySelector('[data-testid="nextButton"]');

      fireEvent.click(
        button,

        new MouseEvent('click', {
          bubbles: true,

          cancelable: true,
        }),
      );
    };

    const mockEnterOtp = otp => {
      const input = document.querySelector('.MuiInputBase-input');
      fireEvent.change(input, { target: { value: otp } });
    };

    const dummyJwt = 'a-dummy-jwt-string';
    const dummyUser = { id: 1, firstName: 'a-dummy-user' };
    const dummyOtp = '123456';
    const dummyResponse = {
      jwt: dummyJwt,
      user: dummyUser,
    };
    const mockResendOtpSuccessResponse = {
      success: true,
    };
    const mockResendOtpErrorResponse = {
      status: 403,
      name: 'ForbiddenError',
      message: 'auth.otp.max.fail',
    };

    it('should redirect to educational screen screen once OTP validation is successful', async () => {
      act(() => {
        render(<MockOtpInput locale="en" />);
      });

      validateOTPSpy.mockResolvedValue(dummyResponse);
      mockEnterOtp(dummyOtp);
      mockClickNextButton();
      jest.runAllTimers();
      await wait(() => {
        expect(validateOTPSpy).toBeCalledWith(phoneNumber, dummyOtp);
        expect(mockHistory.push).toBeCalledWith(referrer);
      });
    });

    it('dispalys invalid OTP error once OTP validation is failed with InvalidOTP error', async () => {
      act(() => {
        render(<MockOtpInput locale="en" />);
      });

      validateOTPSpy.mockRejectedValue(
        new Error(authApis.AuthApiErrors.InvalidOTP),
      );
      mockEnterOtp(dummyOtp);
      mockClickNextButton();
      jest.runAllTimers();
      await wait(() => {
        expect(mockHistory.push).not.toBeCalled();
        expect(
          document.querySelector('[data-testid="validation-error-text"] > p')
            .innerHTML,
        ).toEqual(expect.stringContaining('The entered OTP is invalid'));
      });
    });

    it('dispalys expired OTP error once OTP validation is failed with ExpiredOTP error', async () => {
      act(() => {
        render(<MockOtpInput locale="en" />);
      });

      validateOTPSpy.mockRejectedValue(
        new Error(authApis.AuthApiErrors.ExpiredOTP),
      );
      mockEnterOtp(dummyOtp);
      mockClickNextButton();
      jest.runAllTimers();
      await wait(() => {
        expect(
          document.querySelector('[data-testid="validation-error-text"] > p')
            .innerHTML,
        ).toEqual(expect.stringContaining('The entered OTP is expired'));
      });
    });

    it('dispalys a generic error once OTP validation is failed with an unknown error', async () => {
      act(() => {
        render(<MockOtpInput locale="en" />);
      });

      validateOTPSpy.mockRejectedValue(new Error('unnown error'));
      mockEnterOtp(dummyOtp);
      mockClickNextButton();
      jest.runAllTimers();
      await wait(() => {
        expect(mockHistory.push).not.toBeCalled();
        expect(
          document.querySelector('[data-testid="validation-error-text"] > p')
            .innerHTML,
        ).toEqual(expect.stringContaining('Sorry, something went wrong'));
      });
    });
    describe('Resend OTP ', () => {
      beforeEach(() => {
        validateOTPSpy = jest.spyOn(authApis, 'generateOTP');
      });

      afterEach(() => {
        validateOTPSpy.mockRestore();
      });

      it('restarts the timer after a successful OTP is resent', async () => {
        validateOTPSpy.mockResolvedValue(mockResendOtpSuccessResponse);

        render(
          <BrowserRouter>
            <IntlProvider locale="en">
              <MockedProvider addTypename={false}>
                <OTPInput location={mockLocation} />
              </MockedProvider>
            </IntlProvider>
          </BrowserRouter>,
        );
        jest.runAllTimers();
        const resendLink = document.querySelector(
          '[data-testid="resend-link"]',
        );
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
        validateOTPSpy.mockRejectedValue(mockResendOtpErrorResponse);
        const errorMsgCode = 'auth.error.otp.limit';

        const messages = {
          [errorMsgCode]: 'Sorry, something went wrong',
        };
        render(
          <BrowserRouter>
            <IntlProvider locale="en" messages={messages}>
              <MockedProvider addTypename={false}>
                <OTPInput location={mockLocation} />
              </MockedProvider>
            </IntlProvider>
          </BrowserRouter>,
        );
        jest.runAllTimers();
        const resendLink = document.querySelector(
          '[data-testid="resend-link"]',
        );
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
            document.querySelector('[data-testid="resend-error-text"]')
              .textContent,
          ).toEqual(expect.stringContaining(messages[errorMsgCode]));

          expect(document.querySelector('.resend-link-text').textContent).toBe(
            `Resend`,
          );
        });
      });
      it('displays the generic error and resend option is enabled after resend otp failed with an unknown reason', async () => {
        validateOTPSpy.mockRejectedValue(mockResendOtpErrorResponse);
        const errorMsgCode = 'auth.otp.max.fail';

        const messages = {
          [errorMsgCode]: 'Sorry, something went wrong',
        };

        render(
          <BrowserRouter>
            <IntlProvider locale="en" messages={messages}>
              <MockedProvider addTypename={false}>
                <OTPInput location={mockLocation} />
              </MockedProvider>
            </IntlProvider>
          </BrowserRouter>,
        );
        jest.runAllTimers();
        const resendLink = document.querySelector(
          '[data-testid="resend-link"]',
        );
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
            document.querySelector('[data-testid="resend-error-text"]')
              .textContent,
          ).toEqual(expect.stringContaining(messages[errorMsgCode]));

          expect(document.querySelector('.resend-link-text').textContent).toBe(
            `Resend`,
          );
        });
      });

      it('displays the generic error and resend option is enabled after resend otp failed with missing error code', async () => {
        validateOTPSpy.mockRejectedValue(mockResendOtpErrorResponse);
        const errorMsgCode = 'auth.otp.max.fail';

        const messages = {
          [errorMsgCode]: 'Sorry, something went wrong',
        };

        render(
          <BrowserRouter>
            <IntlProvider locale="en" messages={messages}>
              <MockedProvider addTypename={false}>
                <OTPInput location={mockLocation} />
              </MockedProvider>
            </IntlProvider>
          </BrowserRouter>,
        );
        jest.runAllTimers();
        const resendLink = document.querySelector(
          '[data-testid="resend-link"]',
        );
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
            document.querySelector('[data-testid="resend-error-text"]')
              .textContent,
          ).toEqual(expect.stringContaining(messages[errorMsgCode]));

          expect(document.querySelector('.resend-link-text').textContent).toBe(
            `Resend`,
          );
        });
      });

      it('displays the generic error and resend option is enabled after resend otp failed for unknown reason', async () => {
        validateOTPSpy.mockRejectedValue(mockResendOtpErrorResponse);
        const errorMsgCode = 'auth.otp.max.fail';

        const messages = {
          [errorMsgCode]: 'Sorry, something went wrong',
        };
        render(
          <BrowserRouter>
            <IntlProvider locale="en" messages={messages}>
              <MockedProvider addTypename={false}>
                <OTPInput location={mockLocation} />
              </MockedProvider>
            </IntlProvider>
          </BrowserRouter>,
        );
        jest.runAllTimers();
        const resendLink = document.querySelector(
          '[data-testid="resend-link"]',
        );
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
            document.querySelector('[data-testid="resend-error-text"]')
              .textContent,
          ).toEqual(expect.stringContaining(messages[errorMsgCode]));

          expect(document.querySelector('.resend-link-text').textContent).toBe(
            `Resend`,
          );
        });
      });
    });
  });
});
