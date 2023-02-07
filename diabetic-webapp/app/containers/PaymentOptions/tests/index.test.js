import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { fireEvent, render, wait } from 'react-testing-library';

import mockStripe from 'tests/utils/mockStripe';
import { OrderStatus, PaymentType } from 'apis/types';
import * as ordersApi from 'apis/orders';

// eslint-disable-next-line import/first
import PaymentOptions from '../index';

jest.mock('@stripe/react-stripe-js', () => mockStripe());

const mockOrderId = '1000';

const mockOrder = {
  id: mockOrderId,
  amount: 123.33,
  currency: 'AED',
  status: OrderStatus.RequirePayment,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    orderId: mockOrderId,
  }),
}));

describe('<PaymentOptions />', () => {
  // eslint-disable-next-line no-global-assign
  window = Object.assign(window, {
    visualViewport: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  });

  // eslint-disable-next-line no-unused-vars
  let mockHistory;
  let fetchOrderDetailsSpy;
  let confirmPaymentSpy;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    fetchOrderDetailsSpy = jest
      .spyOn(ordersApi, 'fetchOrderDetails')
      .mockResolvedValue(mockOrder);
    confirmPaymentSpy = jest
      .spyOn(ordersApi, 'confirmPayment')
      .mockResolvedValue(mockOrder);
  });

  afterEach(() => {
    mockHistory = null;
    fetchOrderDetailsSpy.mockRestore();
    confirmPaymentSpy.mockRestore();
  });

  // eslint-disable-next-line react/prop-types
  const MockPaymentOptions = ({ locale, search = '' }) => (
    <BrowserRouter>
      <IntlProvider locale={locale}>
        <PaymentOptions history={mockHistory} location={{ search }} />
      </IntlProvider>
    </BrowserRouter>
  );

  const mockClickElement = dataTestId => {
    const button = document.querySelector(`[data-testid="${dataTestId}"]`);

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
  };

  it('should render and match the snapshot', async () => {
    const {
      container: { firstChild },
    } = render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should render the loader while api calls are in progress', async () => {
    const {
      container: { firstChild },
    } = render(<MockPaymentOptions locale="en" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should invoke fetchOrderDetails with the order id', async () => {
    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(fetchOrderDetailsSpy).toBeCalledWith(mockOrderId);
    });
  });

  it('should redirect to payment input screen on selecting Pay online option', async () => {
    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      mockClickElement('option-online-payment');
      expect(mockHistory.push).toBeCalledWith('payments/input');
    });
  });

  it('should invoke confirmPayment api with the orderId and redirect to status page upon cash on delivery option', async () => {
    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      mockClickElement('option-cash-on-delivery');
      expect(confirmPaymentSpy).toBeCalledWith(
        mockOrderId,
        PaymentType.CashOnDelivery,
      );
      expect(mockHistory.push).toBeCalledWith('payments/status');
    });
  });

  it('should invoke confirmPayment api with the orderId and redirect to status page upon cash on delivery option', async () => {
    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      mockClickElement('option-card-on-delivery');
      expect(confirmPaymentSpy).toBeCalledWith(
        mockOrderId,
        PaymentType.CardOnDelivery,
      );
      expect(mockHistory.push).toBeCalledWith('payments/status');
    });
  });

  it('should redirect to status page upon failure of confirmPayment api', async () => {
    confirmPaymentSpy.mockRejectedValue(new Error('Some error'));
    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      mockClickElement('option-cash-on-delivery');
      expect(confirmPaymentSpy).toBeCalledWith(
        mockOrderId,
        PaymentType.CashOnDelivery,
      );
      expect(mockHistory.push).toBeCalledWith('payments/status');
    });
  });

  it('should redirect to the payment status page if the order status is not valid', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      status: OrderStatus.Pending,
    });

    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('payments/status');
    });
  });

  it('should redirect to payment status page when fetchOrderDetails is failed', async () => {
    fetchOrderDetailsSpy.mockRejectedValue(new Error('Some error.'));

    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('payments/status');
    });
  });

  it('should not redirect to status page on Unauthorized error on fetching order details', async () => {
    fetchOrderDetailsSpy.mockRejectedValue({ response: { status: 401 } });

    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(mockHistory.push).not.toBeCalled();
    });
  });

  it('should not redirect to status page on Forbidden error on fetching order details', async () => {
    fetchOrderDetailsSpy.mockRejectedValue({ response: { status: 403 } });

    render(<MockPaymentOptions locale="en" />);
    await wait(() => {
      expect(mockHistory.push).not.toBeCalled();
    });
  });
});
