import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { AuthErrorCode, AuthMutations } from 'features/auth/api/graphql';
import PhoneLogin from '../index';

let container = null;

const referrer = '/prescriptions/123456798';
const mockLocation = {
  state: {
    referrer,
  },
};

const WrappedPhoneLogin = () => (
  <IntlProvider locale="en">
    <MockedProvider>
      <PhoneLogin />
    </MockedProvider>
  </IntlProvider>
);

describe('<PhoneLogin />', () => {
  const phoneNumber = '971526234727';

  // eslint-disable-next-line no-global-assign
  window = Object.assign(window, {
    visualViewport: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  });

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.restoreAllMocks();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<WrappedPhoneLogin />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should add "971" before local numbers with leading zeros', () => {
    act(() => {
      render(<WrappedPhoneLogin />, container);
    });

    // get a hold of the input element, and trigger some clicks on it
    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: '0526234727' } });

    expect(input.value).toEqual('971526234727');
  });

  it('should add "971" before local numbers without leading zero', () => {
    act(() => {
      render(<WrappedPhoneLogin />, container);
    });

    // get a hold of the input element, and trigger some clicks on it
    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: '526234727' } });

    expect(input.value).toEqual('971526234727');
  });

  it('should not accept non numeric values', () => {
    act(() => {
      render(<WrappedPhoneLogin />, container);
    });

    // get a hold of the input element, and trigger some clicks on it
    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: 'xxxx$' } });

    expect(input.value).toEqual('');
  });

  it('should not accept more than 12 chars', () => {
    act(() => {
      render(<WrappedPhoneLogin />, container);
    });

    // get a hold of the input element, and trigger some clicks on it
    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: '1234567891011213213' } });

    expect(input.value).toEqual('');
  });

  it('should open terms and conditions when clicking on the T&Cs link', () => {
    act(() => {
      render(<WrappedPhoneLogin />, container);
    });

    // get a hold of the input element, and trigger some clicks on it
    const termsAndConditionsLink = document.querySelector(
      '[data-testid="termsAndConditionsLink"]',
    );

    const overlay = document.querySelector('.MuiDrawer-modal');

    expect(overlay.classList.contains('MuiModal-hidden')).toEqual(true);

    act(() => {
      termsAndConditionsLink.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });

    expect(overlay.classList.contains('MuiModal-hidden')).toEqual(false);

    const backdrop = document.querySelector('.MuiBackdrop-root');

    // simulate clicking on the overlay to dismiss it
    act(() => {
      backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(overlay.getAttribute('aria-hidden')).toEqual('true');
  });

  it('should redirect to otp-input screen once OTP generation is successful', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en">
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} location={mockLocation} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(mockHistory.push).toBeCalledWith({
      pathname: 'otp-input',
      state: { phoneNumber, referrer: '/prescriptions/123456798' },
    });
  });

  it('should display specific error once OTP generation has failed with specific reason', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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
              error: { code: AuthErrorCode.AwaitingResendDelay },
            },
          },
        },
      },
    ];

    const errorMsgCode = 'phoneLogin.error.awaitingResendDelay';

    const messages = {
      [errorMsgCode]: 'Some error message',
    };

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error code once OTP generation has failed with unknown reason', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error code once OTP generation has failed with missing error code', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error once OTP generation has failed for unknown reason', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error code once OTP generation has failed with unknown reason', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error code once OTP generation has failed with missing error code', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });

  it('should display generic error once OTP generation has failed for unknown reason', async () => {
    const mockHistory = {
      push: jest.fn(),
    };

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

    act(() => {
      render(
        <IntlProvider locale="en" messages={messages}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <PhoneLogin history={mockHistory} />
          </MockedProvider>
        </IntlProvider>,

        container,
      );
    });

    const input = document.querySelector('.MuiInputBase-input');

    fireEvent.change(input, { target: { value: phoneNumber } });

    const button = document.querySelector('[data-testid="login-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    expect(
      document.querySelector('[data-testid="error-text"] > p').innerHTML,
    ).toEqual(expect.stringContaining(messages[errorMsgCode]));
  });
});
