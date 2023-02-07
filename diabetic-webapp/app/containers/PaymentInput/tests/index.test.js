import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { render, wait } from 'react-testing-library';

import mockStripe from 'tests/utils/mockStripe';
import { OrderStatus, PaymentStatus } from 'apis/types';
import * as ordersApi from 'apis/orders';
import * as paymentsApi from 'apis/payments';

// eslint-disable-next-line import/first
import PaymentInput, { SEARCH_PARAM_CONFIRMATION } from '../index';

jest.mock('@stripe/react-stripe-js', () => mockStripe());

const mockOrderId = '1000';

const mockPayment = {
  id: 1234,
  paymentType: 'Visa',
  maskedCardNumber: 'xxxxxxxxxxxx1234',
  status: PaymentStatus.PaymentMethodRequired,
  providerMetadata: {
    client_secret: 'some dummy secret',
  },
  createdAt: '2022-10-20T11:17:43.561Z',
};

const mockOrder = {
  id: mockOrderId,
  amount: 123.33,
  currency: 'AED',
  status: OrderStatus.RequirePayment,
  payment: mockPayment,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    orderId: mockOrderId,
  }),
}));

describe('<PaymentInput />', () => {
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
  let initializePaymentSpy;
  let confirmPaymentSpy;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    fetchOrderDetailsSpy = jest
      .spyOn(ordersApi, 'fetchOrderDetails')
      .mockResolvedValue(mockOrder);

    initializePaymentSpy = jest
      .spyOn(paymentsApi, 'initializePayment')
      .mockResolvedValue(mockPayment);
    confirmPaymentSpy = jest
      .spyOn(ordersApi, 'confirmPayment')
      .mockResolvedValue(mockPayment);
  });

  afterEach(() => {
    mockHistory = null;
    fetchOrderDetailsSpy.mockRestore();
    initializePaymentSpy.mockRestore();
    confirmPaymentSpy.mockRestore();
  });

  // eslint-disable-next-line react/prop-types
  const MockPaymentInput = ({ locale, search = '' }) => (
    <BrowserRouter>
      <IntlProvider locale={locale}>
        <PaymentInput history={mockHistory} location={{ search }} />
      </IntlProvider>
    </BrowserRouter>
  );

  it('should render and match the snapshot', async () => {
    const {
      container: { firstChild },
    } = render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should render the loader while api calls are in progress', async () => {
    const {
      container: { firstChild },
    } = render(<MockPaymentInput locale="en" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should invoke fetchOrderDetails with the order id', async () => {
    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(fetchOrderDetailsSpy).toBeCalledWith(mockOrderId);
    });
  });

  it('should redirect to the payment status page if the order status is not valid', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      status: OrderStatus.Pending,
    });

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should redirect to the payment status page if the payment details status is not valid', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      payment: {
        ...mockOrder.payment,
        status: PaymentStatus.Processing,
      },
    });

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should invoke initializePayment api with the orderId if payment is not initialized', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      payment: null,
    });

    render(<MockPaymentInput locale="en" />);
    await wait(async () => {
      await wait(() => {
        expect(initializePaymentSpy).toBeCalledWith(mockOrderId);
      });
    });
  });

  it('should invoke initializePayment api with the orderId if providerMetadata is not initialized', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      payment: {
        ...mockPayment,
        providerMetadata: null,
      },
    });

    render(<MockPaymentInput locale="en" />);
    await wait(async () => {
      await wait(() => {
        expect(initializePaymentSpy).toBeCalledWith(mockOrderId);
      });
    });
  });

  it('should invoke confirmPayment api with the orderId and redirect to status page upon confirmation', async () => {
    render(
      <MockPaymentInput locale="en" search={`?${SEARCH_PARAM_CONFIRMATION}`} />,
    );
    await wait(() => {
      expect(confirmPaymentSpy).toBeCalledWith(mockOrderId);
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should show appropriate error when fetchOrderDetails is failed', async () => {
    fetchOrderDetailsSpy.mockRejectedValue(new Error('Some error.'));

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should show appropriate error when initializePayment is failed', async () => {
    fetchOrderDetailsSpy.mockResolvedValue({
      ...mockOrder,
      payment: null,
    });
    initializePaymentSpy.mockRejectedValue(new Error('Some error'));

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should show appropriate error when confirmPayment is failed', async () => {
    confirmPaymentSpy.mockRejectedValue(new Error('Some error'));

    render(
      <MockPaymentInput locale="en" search={`?${SEARCH_PARAM_CONFIRMATION}`} />,
    );
    await wait(() => {
      expect(mockHistory.push).toBeCalledWith('status');
    });
  });

  it('should not redirect to status page on Unauthorized error on fetching order details', async () => {
    fetchOrderDetailsSpy.mockRejectedValue({ response: { status: 401 } });

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).not.toBeCalled();
    });
  });

  it('should not redirect to status page on Forbidden error on fetching order details', async () => {
    fetchOrderDetailsSpy.mockRejectedValue({ response: { status: 403 } });

    render(<MockPaymentInput locale="en" />);
    await wait(() => {
      expect(mockHistory.push).not.toBeCalled();
    });
  });
});
