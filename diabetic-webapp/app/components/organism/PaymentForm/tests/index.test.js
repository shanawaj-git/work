import React from 'react';
import mockStripe from 'tests/utils/mockStripe';
import { IntlProvider } from 'react-intl';

import { fireEvent, render, wait } from 'react-testing-library';

let mockedStripe;
jest.mock('@stripe/react-stripe-js', () => {
  mockedStripe = mockStripe();
  return mockedStripe;
});
// eslint-disable-next-line import/first
import PaymentForm from '..';

describe('<PaymentForm />', () => {
  const mockReturnUrl = 'https://test.return.url';
  const mockClientSecret = 'a_dummy_client_secret';

  const ContainedPaymentForm = () => (
    <IntlProvider locale="en">
      <PaymentForm returnUrl={mockReturnUrl} clientSecret={mockClientSecret} />
    </IntlProvider>
  );

  it('should render the payment form and match the snapshot', async () => {
    const {
      container: { firstChild },
    } = render(<ContainedPaymentForm locale="en" />);
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  const mockClickContinueButton = () => {
    const button = document.querySelector('[data-testid="continueButton"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
  };

  it('should invoke stripe confirmPayment on click of continue', async () => {
    const stripe = mockedStripe.useStripe();
    render(<ContainedPaymentForm locale="en" />);
    mockClickContinueButton();

    await wait(() => {
      expect(stripe.confirmPayment).toBeCalledWith(
        expect.objectContaining({
          confirmParams: {
            return_url: mockReturnUrl,
          },
        }),
      );
    });
  });
});
