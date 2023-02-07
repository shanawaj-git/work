import { fireEvent, render } from 'react-testing-library';

import { IntlProvider } from 'react-intl';
import React from 'react';
import { act } from 'react-test-renderer';
import DeliveryIntroduction from '../index';
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/review-prescription',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
}));

const WrappedDeliveryIntroduction = () => (
  <IntlProvider locale="en">
    <DeliveryIntroduction />
  </IntlProvider>
);
const NAVIGATION_ARGS = { pathname: 'address-selection' };
describe('<WrappedDeliveryIntroduction />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<WrappedDeliveryIntroduction />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should go to next screen when iUnderstand button is clicked', () => {
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
      const tree = render(
        <IntlProvider locale="en">
          <DeliveryIntroduction history={mockHistory} {...props} />
        </IntlProvider>,
      );
      const iUnderstandButton = tree.getByTestId('iUnderstand-btn');
      fireEvent.click(
        iUnderstandButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
      expect(mockHistory.push).toBeCalledWith(NAVIGATION_ARGS);
    });
  });
  it('should open modal when hyperlink(why must i be present in person?) is clicked', () => {
    const tree = render(<WrappedDeliveryIntroduction />);
    const linkElement = tree.getByTestId('modal-link');

    fireEvent.click(linkElement);
    tree.rerender(<WrappedDeliveryIntroduction />);
    tree.getByTestId('modal');

    const buttonElement = tree.getByTestId('close-button');
    expect(buttonElement).toBeDefined();
    expect(tree.container).toMatchSnapshot();
  });
  it('should close model when back-button is clicked', async () => {
    const tree = render(<WrappedDeliveryIntroduction />);
    const linkElement = tree.getByTestId('modal-link');
    expect(linkElement).toBeTruthy();
    fireEvent.click(linkElement);
    tree.rerender(<WrappedDeliveryIntroduction />);
    const modalElement = tree.getByTestId('modal');
    expect(modalElement).toBeTruthy();

    const backButton = tree.getByTestId('close-button');
    expect(backButton).toBeDefined();
    fireEvent(
      backButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    tree.rerender(<WrappedDeliveryIntroduction />);
    expect(tree.getByTestId('modal-link')).toBeTruthy();
  });
});
