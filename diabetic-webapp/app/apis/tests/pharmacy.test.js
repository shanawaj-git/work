import { fetchPharmacyDetails, PharmacyApiUrls } from '../pharmacy';
import { configureAPIClient, getAPIClientInstance } from '../client';

const mockDeliveryHours = {
  workinghours: {
    '0': null,
    '1': ['09:30:00', '11:00:00', '12:00:00', '17:00:00'],
    '2': ['09:30:00', '17:00:00'],
    '3': ['09:30:00', '13:00:00'],
    '4': ['09:30:00', '12:00:00', '13:00:00', '17:00:00'],
    '5': ['09:30:00', '17:00:00'],
    '6': null,
  },
  holidays: ['2015-05-04', '*-05-25'],
};

const mockPharmacyDetails = {
  pharmacyName: 'MPC',
  supportContactNumber: '8008080',
  deliveryHours: mockDeliveryHours,
  scheduleWindowDays: 7,
};

describe('Pharmacy APIs ', () => {
  beforeAll(() => {
    configureAPIClient({});
  });

  let apiClientGetSpy;

  beforeEach(() => {
    apiClientGetSpy = jest.spyOn(getAPIClientInstance(), 'get');
  });

  afterEach(() => {
    apiClientGetSpy.mockRestore();
  });

  describe('fetchPharmacyDetails()', () => {
    it('invokes the get method and resolves based on the response', async () => {
      apiClientGetSpy.mockResolvedValue({
        data: {
          data: {
            attributes: mockPharmacyDetails,
          },
        },
      });
      const resp = await fetchPharmacyDetails();

      expect(apiClientGetSpy).toBeCalledWith(PharmacyApiUrls.PHARMACY_DETAILS);
      expect(resp).toEqual(mockPharmacyDetails);
    });

    it('it rejects with theerror when the api call is failed', async () => {
      const dummyError = new Error('Some error');
      apiClientGetSpy.mockRejectedValue(dummyError);
      await expect(fetchPharmacyDetails()).rejects.toEqual(dummyError);
    });
  });
});
