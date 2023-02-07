import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import HomePage from '../index';

describe('<HomePage />', () => {
  beforeEach(() => {
    window.MutationObserver = require('@sheerun/mutationobserver-shim');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render and match the snapshot for tab 0', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot for tab 1', () => {
    const { container, rerender } = render(
      <IntlProvider locale="en">
        <HomePage index={1} />
      </IntlProvider>,
    );

    rerender(
      <IntlProvider locale="en">
        <HomePage index={1} />
      </IntlProvider>,
    );

    const { firstChild } = container;
    expect(firstChild).toMatchSnapshot();
  });
});
