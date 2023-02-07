import { render, wait } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import React from 'react';
import PaymentStatus from '../index';
import * as orderApis from '../../../apis/orders';
import {
  PaymentSubType,
  PaymentType,
  PaymentStatus as TPaymentStatus,
} from '../../../apis/types';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    orderId: '4',
  }),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/orders/5/payments/status',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
}));

const mockOrderFetchApiResponse = {
  id: '4',
  amount: 3352,
  currency: 'AED',
  status: 'Insurance Approved',
  payment: {
    id: 1,
    paymentType: 'Visa',
    providerMetadata: {
      client_secret:
        'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
    },
    maskedCardNumber: '4923',
    status: 'Succeeded',
    createdAt: '2022-10-20T10:54:25.037Z',
  },
};

describe('<PaymentStatus />', () => {
  let orderApiSpy;

  beforeEach(() => {
    orderApiSpy = jest.spyOn(orderApis, 'fetchOrderDetails');
  });

  afterEach(() => {
    orderApiSpy.mockRestore();
  });
  it('should render and match the snapshot', async () => {
    orderApiSpy.mockResolvedValue(mockOrderFetchApiResponse);

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should render and match the snapshot for pay by Cash On Delivery', async () => {
    orderApiSpy.mockResolvedValue({
      ...mockOrderFetchApiResponse,
      payment: {
        paymentType: PaymentType.CashOnDelivery,
        status: TPaymentStatus.Processing,
      },
    });

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should render and match the snapshot for pay by Card On Delivery', async () => {
    orderApiSpy.mockResolvedValue({
      ...mockOrderFetchApiResponse,
      payment: {
        paymentType: PaymentType.CardOnDelivery,
        status: TPaymentStatus.Processing,
      },
    });

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );
    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should display the failed status message is payment fails', async () => {
    const mockOrderFetchFailedResponse = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Pending',
      payment: {
        id: 1,
        paymentType: PaymentType.Cash,
        paymentSubType: PaymentSubType.Visa,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Failed',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(mockOrderFetchFailedResponse);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentStatus = getByTestId(/payment-status/i).textContent;
      expect(paymentStatus).toContain('Failed');
    });
  });

  it('should be able to contact support if payment fails', async () => {
    const mockOrderFetchFailedResponse = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Pending',
      payment: {
        id: 1,
        paymentType: PaymentType.Cash,
        paymentSubType: PaymentSubType.Visa,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Failed',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(mockOrderFetchFailedResponse);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const contactSupport = getByTestId(/contact-support-phone/i).textContent;
      expect(contactSupport).toBeDefined();
    });
  });

  it('should display failed status message if api fails to fetch order details', async () => {
    orderApiSpy.mockRejectedValue(new Error());
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentStatus = getByTestId(/payment-status/i).textContent;
      expect(paymentStatus).toContain('Failed');
    });
  });

  it('should change the payment icon as Master Card when payment mode is Master Card', async () => {
    const mockMasterCardResponse = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Pending',
      payment: {
        id: 1,
        paymentType: PaymentType.Card,
        paymentSubType: PaymentSubType.Mastercard,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };

    orderApiSpy.mockResolvedValue(mockMasterCardResponse);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId('payment-method-logo-Mastercard');
      expect(paymentLogo).toBeDefined();
    });
  });

  it('should change the payment icon as Apply Pay when payment mode is ApplePay', async () => {
    const applePayCardMock = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Insurance Approved',
      payment: {
        id: 1,
        paymentType: PaymentType.Card,
        paymentSubType: PaymentSubType.ApplePay,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(applePayCardMock);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId(/payment-method-logo-Apple Pay/i);
      expect(paymentLogo).toBeDefined();
    });
  });

  it('should change the payment icon as Google Pay when payment mode is Google Pay', async () => {
    const googlePayMock = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Insurance Approved',
      payment: {
        id: 1,
        paymentType: PaymentType.Card,
        paymentSubType: PaymentSubType.GooglePay,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(googlePayMock);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId(/payment-method-logo-Google Pay/i);
      expect(paymentLogo).toBeDefined();
    });
  });
  it('should change the payment icon as Visa when payment mode is Visa', async () => {
    const visaPayMock = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Insurance Approved',
      payment: {
        id: 1,
        paymentType: PaymentType.Card,
        paymentSubType: PaymentSubType.Visa,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(visaPayMock);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId(/payment-method-logo-Visa/i);
      expect(paymentLogo).toBeDefined();
    });
  });

  it('should change the payment icon as Default when payment mode is Cash', async () => {
    const cashPaymentMock = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Insurance Approved',
      payment: {
        id: 1,
        paymentType: PaymentType.Cash,
        paymentSubType: PaymentSubType.Cash,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(cashPaymentMock);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId('payment-method-logo-Cash');
      expect(paymentLogo).toBeDefined();
    });
  });

  it('should change the payment icon as Default Payment Icon when payment mode is not mentioned', async () => {
    const defaultPayMock = {
      id: '4',
      amount: 3352,
      currency: 'AED',
      status: 'Insurance Approved',
      payment: {
        id: 1,
        paymentType: PaymentType.Wallet,
        paymentSubType: null,
        providerMetadata: {
          client_secret:
            'pi_3LxUnkI3Fb4xUkyy1wKpxW3s_secret_cF5fGRWh51967wIxag3kc4StB',
        },
        maskedCardNumber: '4923',
        status: 'Succeeded',
        createdAt: '2022-10-20T10:54:25.037Z',
      },
    };
    orderApiSpy.mockResolvedValue(defaultPayMock);
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <PaymentStatus />
      </IntlProvider>,
    );

    await wait(() => {
      const paymentLogo = getByTestId('payment-method-logo-null');
      expect(paymentLogo).toBeDefined();
    });
  });
});
