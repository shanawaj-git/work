import React from 'react';

import { fireEvent, render } from 'react-testing-library';
import { act } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import EducationalScreen from '../index';

const PRESCRIPTION_UPLOAD = { pathname: 'prescription-upload', state: {} };
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/educational-screen',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
}));

describe('<EducationalScreen/>', () => {
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
        <EducationalScreen {...props} />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should skip the carousel if the skip button is clicked', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const mockLocation = {
      search: '',
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <EducationalScreen history={mockHistory} {...props} />
        </IntlProvider>,
      );
      const skipButton = document.querySelector('.Mui-disabled > div > button');
      fireEvent.click(
        skipButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
      expect(mockHistory.push).toBeCalledWith(PRESCRIPTION_UPLOAD);
    });
  });

  it('should render the next content of carousel when Next button is clicked', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const mockLocation = {
      search: '',
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <EducationalScreen history={mockHistory} {...props} />
        </IntlProvider>,
      );

      const nextButton = document.querySelector(
        '.MuiMobileStepper-root > button:nth-child(3)',
      );

      fireEvent.click(
        nextButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      const caroselComponet = document.querySelector(
        '.react-swipeable-view-container',
      );

      expect(caroselComponet).toBeDefined();
    });
  });
});
