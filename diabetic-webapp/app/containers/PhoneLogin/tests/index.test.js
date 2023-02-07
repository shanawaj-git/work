import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { act } from 'react-test-renderer';
import PhoneLogin from '../index';
import * as authApis from '../../../apis/auth';

let container = null;

const referrer = '/prescriptions/123456798';
const mockLocation = {
  state: {
    referrer,
  },
};

const WrappedPhoneLogin = () => (
  <IntlProvider locale="en">
    <PhoneLogin />
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

  describe('OTP Generation', () => {
    let generateOTPSpy;

    beforeEach(() => {
      generateOTPSpy = jest.spyOn(authApis, 'generateOTP');
    });

    afterEach(() => {
      generateOTPSpy.mockRestore();
    });

    const mockClickLoginButton = () => {
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
    };

    it('should redirect to otp-input screen once OTP generation is successful', async () => {
      const mockHistory = {
        push: jest.fn(),
      };

      act(() => {
        render(
          <IntlProvider locale="en">
            <PhoneLogin history={mockHistory} location={mockLocation} />
          </IntlProvider>,

          container,
        );
      });

      generateOTPSpy.mockResolvedValue({ success: true });
      mockClickLoginButton();
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
      expect(mockHistory.push).toBeCalledWith({
        pathname: 'otp-input',
        state: { phoneNumber, referrer: '/prescriptions/123456798' },
      });
    });

    it('dispalys user not found error once OTP generation is failed with unknow user error', async () => {
      const mockHistory = {
        push: jest.fn(),
      };

      act(() => {
        render(
          <IntlProvider locale="en">
            <PhoneLogin history={mockHistory} location={mockLocation} />
          </IntlProvider>,

          container,
        );
      });

      generateOTPSpy.mockRejectedValue(
        new Error(authApis.AuthApiErrors.UnknownUser),
      );
      mockClickLoginButton();
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
      expect(mockHistory.push).not.toBeCalled();
      expect(
        document.querySelector('[data-testid="error-text"] > p').innerHTML,
      ).toEqual(
        expect.stringContaining('The mobile number is not registered with us.'),
      );
    });

    it('dispalys generic error once OTP generation is failed with unknow reason', async () => {
      const mockHistory = {
        push: jest.fn(),
      };

      act(() => {
        render(
          <IntlProvider locale="en">
            <PhoneLogin history={mockHistory} location={mockLocation} />
          </IntlProvider>,

          container,
        );
      });

      generateOTPSpy.mockRejectedValue(new Error('Some error'));
      mockClickLoginButton();
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
      expect(mockHistory.push).not.toBeCalled();
      expect(
        document.querySelector('[data-testid="error-text"] > p').innerHTML,
      ).toEqual(expect.stringContaining('Sorry, something went wrong'));
    });
  });
});
