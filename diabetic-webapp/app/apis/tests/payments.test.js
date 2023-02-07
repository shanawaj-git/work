import { configureAPIClient, getAPIClientInstance } from '../client';
import { initializePayment, Urls } from '../payments';

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

describe('Payments APIs ', () => {
  beforeAll(() => {
    configureAPIClient({});
  });

  let apiClientPostSpy;

  beforeEach(() => {
    apiClientPostSpy = jest.spyOn(getAPIClientInstance(), 'post');
  });

  afterEach(() => {
    apiClientPostSpy.mockRestore();
  });

  describe('initializePayment()', () => {
    it('invokes the post method with correct arguments and resolves based on the response', async () => {
      const orderId = '1001';
      apiClientPostSpy.mockResolvedValue({
        data: mockPayment,
      });
      const resp = await initializePayment(orderId);

      expect(apiClientPostSpy).toBeCalledWith(Urls.PAYMENTS_INITIALIZE, {
        orderId,
      });
      expect(resp).toEqual(mockPayment);
    });

    it('it rejects with theerror when the api call is failed', async () => {
      const dummyError = new Error('Some error');
      apiClientPostSpy.mockRejectedValue(dummyError);
      await expect(initializePayment('1234')).rejects.toEqual(dummyError);
    });
  });
});
