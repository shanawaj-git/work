import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { act } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { unmountComponentAtNode } from 'react-dom';

jest.mock('@unleash/proxy-client-react', () => ({
  ...jest.requireActual('@unleash/proxy-client-react'),
  useFlag: jest.fn(),
}));
const PHONE_LOGIN = { pathname: 'phone-login', state: { referrer: '' } };
// eslint-disable-next-line import/first
import LoginSelection from '..';

describe('<LoginSelection />', () => {
  let useFlagMock = null;
  let container = null;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    useFlagMock = require('@unleash/proxy-client-react').useFlag;

    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.restoreAllMocks();
  });

  it('should render and match the snapshot when UAE pass option enabled', () => {
    useFlagMock.mockReturnValue(true);
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <LoginSelection />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot when UAE pass option disabled', () => {
    useFlagMock.mockReturnValue(false);
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <LoginSelection />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should move to PHONE_LOGIN upon clicking the phone login section', () => {
    useFlagMock.mockReturnValue(false);
    const mockHistory = {
      push: jest.fn(),
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <LoginSelection history={mockHistory} />
        </IntlProvider>,
        container,
      );
    });

    const button = document.querySelector('.mobile-option-button');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
    expect(mockHistory.push).toBeCalledWith(PHONE_LOGIN);
  });
});
