import { PaymentType } from 'apis/types';
import { configureAPIClient, getAPIClientInstance } from '../client';
import {
  OrderApiErrors,
  initializeOrder,
  fetchOrderDetails,
  OrdersApiUrls,
  confirmPayment,
} from '../orders';

describe('Orders APIs ', () => {
  beforeAll(() => {
    configureAPIClient({});
  });

  let apiClientPostSpy;
  let apiClientGetSpy;
  let apiClientPutSpy;

  beforeEach(() => {
    apiClientPostSpy = jest.spyOn(getAPIClientInstance(), 'post');
    apiClientGetSpy = jest.spyOn(getAPIClientInstance(), 'get');
    apiClientPutSpy = jest.spyOn(getAPIClientInstance(), 'put');
  });

  afterEach(() => {
    apiClientPostSpy.mockRestore();
    apiClientGetSpy.mockRestore();
    apiClientPutSpy.mockRestore();
  });

  describe('initializeOrder()', () => {
    it('invokes the post method with correct arguments and resolves based on the response', async () => {
      const dummyResponse = {
        id: 2,
        schedule: '2022-09-30T09:30:00.000Z',
        amount: 'null',
        currency: 'AED',
        status: 'Pending',
        address: {
          id: 2,
          flatOrVillaNumber: '800',
          buildingOrVilla: 'The Offices 4',
          street: 'One Central',
          area: 'DWTC',
          directions: 'We Work',
          latitude: 25.219955694703355,
          longitude: 55.2855488821971,
        },
        prescription: {
          id: 2,
          firstName: 'first',
          lastName: 'last',
          status: 'New',
        },
      };

      const dummyRequest = {
        prescriptionNumber: 2,
        address: {
          flatOrVillaNumber: 800,
          buildingOrVilla: 'The Offices 4',
          street: 'One Central',
          area: 'DWTC',
          directions: 'We Work',
          latitude: 25.219955694703355,
          longitude: 55.2855488821971,
        },
        schedule: '2022-09-30T09:30:00.000Z',
      };

      apiClientPostSpy.mockResolvedValue(dummyResponse);
      const resp = await initializeOrder(dummyRequest);

      expect(apiClientPostSpy).toBeCalledWith(
        OrdersApiUrls.ORDERS_INITIALIZE,
        dummyRequest,
      );
      expect(resp).toEqual(dummyResponse.data);
    });

    it('it rejects with OrderApiErrors.PrescriptionNotFound error when the api responds with 404', async () => {
      const dummyRequest = {
        prescriptionNumber: 2,
        address: {
          flatOrVillaNumber: 800,
          buildingOrVilla: 'The Offices 4',
          street: 'One Central',
          area: 'DWTC',
          directions: 'We Work',
          latitude: 25.219955694703355,
          longitude: 55.2855488821971,
        },
        schedule: '2022-09-30T09:30:00.000Z',
      };
      const dummyError = { response: { status: 404 } };
      apiClientPostSpy.mockRejectedValue(dummyError);
      await expect(initializeOrder(dummyRequest)).rejects.toThrow(
        OrderApiErrors.PrescriptionNotFound,
      );
    });
    it('it rejects with OrderApiErrors.OrderAlreadyExists error when the api responds with 409', async () => {
      const dummyError = { response: { status: 409 } };
      apiClientPostSpy.mockRejectedValue(dummyError);
      await expect(initializeOrder()).rejects.toThrow(
        OrderApiErrors.OrderAlreadyExists,
      );
    });
  });

  describe('fetchOrderDetails()', () => {
    const mockOrderId = '1000';

    const mockPayment = {
      id: 1234,
      paymentType: 'Visa',
      maskedCardNumber: 'xxxxxxxxxxxx1234',
      status: 'REQUIRE_CAPTURE',
      providerMetadata: {
        secret: 'some dummy secret',
      },
      createdAt: '2022-10-20T11:17:43.561Z',
    };

    const mockOrder = {
      id: mockOrderId,
      amount: 123.33,
      currency: 'AED',
      status: 'Require Payment',
      payment: mockPayment,
    };

    it('should invoke the api get correct url and return the resolve on success', async () => {
      apiClientGetSpy.mockResolvedValue({
        data: {
          ...mockOrder,
        },
      });
      expect(await fetchOrderDetails(mockOrderId)).toEqual(mockOrder);
      expect(apiClientGetSpy).toBeCalledWith(
        OrdersApiUrls.orderDetails(mockOrderId),
      );
    });

    it('should reject on rejection from api client', async () => {
      const error = new Error('Some error.');
      apiClientGetSpy.mockRejectedValue(error);
      await expect(fetchOrderDetails(mockOrderId)).rejects.toEqual(error);
    });
  });

  describe('confirmPayment()', () => {
    const mockOrderId = '1000';

    const mockPayment = {
      id: 1234,
      paymentType: 'Visa',
      maskedCardNumber: 'xxxxxxxxxxxx1234',
      status: 'REQUIRE_CAPTURE',
      providerMetadata: {
        secret: 'some dummy secret',
      },
      createdAt: '2022-10-20T11:17:43.561Z',
    };

    it('should invoke the api get correct url and return the resolved value on success', async () => {
      apiClientPutSpy.mockResolvedValue({
        data: {
          ...mockPayment,
        },
      });
      expect(await confirmPayment(mockOrderId)).toEqual(mockPayment);
      expect(apiClientPutSpy).toBeCalledWith(
        OrdersApiUrls.confirmPayment(mockOrderId),
      );
    });

    it('should invoke the api with correct url and payment method when provided', async () => {
      apiClientPutSpy.mockResolvedValue({
        data: {
          ...mockPayment,
        },
      });
      expect(
        await confirmPayment(mockOrderId, PaymentType.CashOnDelivery),
      ).toEqual(mockPayment);
      expect(apiClientPutSpy).toBeCalledWith(
        OrdersApiUrls.confirmPayment(mockOrderId),
        { paymentMethod: PaymentType.CashOnDelivery },
      );
    });

    it('should reject on rejection from api client', async () => {
      const error = new Error('Some error.');
      apiClientPutSpy.mockRejectedValue(error);
      await expect(confirmPayment(mockOrderId)).rejects.toEqual(error);
    });
  });
});
