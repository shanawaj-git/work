import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import padding from 'utils/styles';
import SplashScreen from '../index';
import { LogoImage } from '../styledComponents';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/login-selection',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

describe('<SplashScreen />', () => {
  it('should render and match the snapshot', () => {
    const mockLocation = {
      search: '',
    };
    const props = {
      location: mockLocation,
    };
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <SplashScreen {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('<LogoImage/>', () => {
    const {
      container: { firstChild },
    } = render(<LogoImage alt="Logo" style={padding('en', '10px')} />);

    expect(firstChild).toMatchSnapshot();
  });

  jest.useFakeTimers();

  it('should move to the next screen after timer elapsed', () => {
    const mockLocation = {
      search: '',
    };
    const props = {
      history: {
        push: jest.fn(),
      },
      location: mockLocation,
    };
    const redirect = {
      pathname: '/phone-login',
      state: { referrer: '/educational-screen' },
    };
    render(
      <IntlProvider locale="en">
        <SplashScreen {...props} />
      </IntlProvider>,
    );
    expect(props.history.push).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(redirect);
  });

  it.skip('should navigate to  page if query params is passed', async () => {
    const referrer = 'prescriptions/123456798';
    const search = `?redirect=${referrer}`;
    const redirect = {
      pathname: 'prescriptions/123456798',
      state: { referrer: 'prescriptions/123456798' },
    };
    const mockLocation = {
      search,
    };
    const props = {
      history: {
        push: jest.fn(),
      },
      location: mockLocation,
    };
    render(
      <IntlProvider locale="en">
        <SplashScreen {...props} />
      </IntlProvider>,
    );
    jest.runAllTimers();
    expect(props.history.push).toHaveBeenCalledWith(redirect);
  });
});
