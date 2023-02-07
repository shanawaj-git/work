import { PrescriptionApiUrls, uploadPrescription } from '../prescription';
import { configureAPIClient, getAPIClientInstance } from '../client';

describe('Prescription APIs', () => {
  beforeAll(() => {
    configureAPIClient({});
  });

  describe('uploadPrescription()', () => {
    let apiClientPostSpy;
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

    beforeEach(() => {
      apiClientPostSpy = jest.spyOn(getAPIClientInstance(), 'post');
    });

    afterEach(() => {
      apiClientPostSpy.mockRestore();
    });

    it('should upload the prescription image to the cms api', async () => {
      const mockResponse = {
        data: {
          id: 3,
          firstName: 'Nissar',
          lastName: 'Akber',
          status: 'New',
          createdAt: '2022-09-20T06:46:13.551Z',
          updatedAt: '2022-09-20T06:46:13.551Z',
        },
      };
      apiClientPostSpy.mockResolvedValue(mockResponse);

      const response = await uploadPrescription(fakeFile);
      expect(response.id).toBeDefined();
    });

    it('should ensure the image file is sent to the api', async () => {
      const mockResponse = {
        data: {
          id: 3,
          firstName: 'Nissar',
          lastName: 'Akber',
          status: 'New',
          createdAt: '2022-09-20T06:46:13.551Z',
          updatedAt: '2022-09-20T06:46:13.551Z',
        },
      };
      apiClientPostSpy.mockResolvedValue(mockResponse);

      const response = await uploadPrescription(fakeFile);
      const formData = new FormData();
      formData.append('image', fakeFile);
      expect(apiClientPostSpy).toBeCalledWith(
        PrescriptionApiUrls.UPLOAD_PRESCRIPTION,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      expect(response.id).toBeDefined();
    });
  });
});
