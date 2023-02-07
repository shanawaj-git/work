import { AuthApiErrors, AuthApiUrls, generateOTP, validateOTP } from '../auth';
import { configureAPIClient, getAPIClientInstance } from '../client';

describe('Auth APIs', () => {
  beforeAll(() => {
    configureAPIClient({});
  });

  describe('generateOTP()', () => {
    let apiClientPostSpy;
    const mobileNumber = '971123456789';

    beforeEach(() => {
      apiClientPostSpy = jest.spyOn(getAPIClientInstance(), 'post');
    });

    afterEach(() => {
      apiClientPostSpy.mockRestore();
    });

    it('invokes the post method with correct arguments and resolves based on the response', async () => {
      const dummyResp = { status: 200, data: { success: true } };
      apiClientPostSpy.mockResolvedValue(dummyResp);
      const resp = await generateOTP(mobileNumber);

      expect(apiClientPostSpy).toBeCalledWith(
        AuthApiUrls.GENERATE_OTP,
        {
          mobileNumber,
        },
        {
          isPublicUrl: true,
        },
      );
      expect(resp).toEqual(dummyResp.data);
    });

    it('it rejects with AuthApiErrors.UnknownUser error when the api responds with 404', async () => {
      const dummyErr = { response: { status: 404 } };
      apiClientPostSpy.mockRejectedValue(dummyErr);
      expect(generateOTP()).rejects.toThrow(AuthApiErrors.UnknownUser);
    });
    it('it rejects with AuthApiErrors.WaitToRegenerateOTP error when the api responds with 403', async () => {
      const dummyErr = {
        response: {
          status: 403,
          data: {
            error: {
              status: 403,
              name: 'ForbiddenError',
              message: 'Wait to generate otp',
              details: {
                errorKey: 'auth.error.otp.wait',
              },
            },
          },
        },
      };
      apiClientPostSpy.mockRejectedValue(dummyErr);
      await expect(generateOTP()).rejects.toThrow(
        AuthApiErrors.WaitToRegenerateOTP,
      );
    });

    it('it rejects with api error message when the api responds with an unknown error', async () => {
      const errMessage = 'Some unknown error';
      apiClientPostSpy.mockRejectedValue(new Error(errMessage));
      expect(generateOTP()).rejects.toThrow(errMessage);
    });
  });

  describe('validateOTP()', () => {
    let apiClientPostSpy;
    const mobileNumber = '971123456789';
    const dummyOtp = '123456';

    beforeEach(() => {
      apiClientPostSpy = jest.spyOn(getAPIClientInstance(), 'post');
    });

    afterEach(() => {
      apiClientPostSpy.mockRestore();
    });

    it('invokes the post method with correct arguments and resolves based on the response', async () => {
      const dummyResp = {
        status: 200,
        data: {
          jwt: 'dummy-jwt-string',
          user: { id: 1, firstName: 'dummy-user' },
        },
      };
      apiClientPostSpy.mockResolvedValue(dummyResp);
      const resp = await validateOTP(mobileNumber, dummyOtp);

      expect(apiClientPostSpy).toBeCalledWith(
        AuthApiUrls.VALIDATE_OTP,
        {
          identifier: mobileNumber,
          password: dummyOtp,
        },
        {
          isPublicUrl: true,
        },
      );
      expect(resp).toEqual(dummyResp.data);
    });

    it('it rejects with AuthApiErrors.InvalidOTP error when the api responds with 400', async () => {
      const dummyErr = { response: { status: 400 } };
      apiClientPostSpy.mockRejectedValue(dummyErr);
      expect(validateOTP()).rejects.toThrow(AuthApiErrors.InvalidOTP);
    });

    it('it rejects with AuthApiErrors.ExpiredOTP error when the api responds with 403', async () => {
      const dummyErr = {
        response: {
          status: 403,
          data: {
            error: {
              status: 403,
              name: 'ForbiddenError',
              message: 'OTP Expired',
              details: {
                errorKey: 'auth.otp.expired',
              },
            },
          },
        },
      };
      apiClientPostSpy.mockRejectedValue(dummyErr);
      expect(validateOTP()).rejects.toThrow(AuthApiErrors.ExpiredOTP);
    });
    it('it rejects with AuthApiErrors.MaxFailedAttempt error when the api responds with 403', async () => {
      const dummyErr = {
        response: {
          status: 403,
          data: {
            error: {
              status: 403,
              name: 'ForbiddenError',
              message: 'OTP Expired',
              details: {
                errorKey: 'auth.error.otp.limit',
              },
            },
          },
        },
      };
      apiClientPostSpy.mockRejectedValue(dummyErr);
      expect(validateOTP()).rejects.toThrow(AuthApiErrors.MaxFailedAttempt);
    });

    it('it rejects with api error message when the api responds with an unknown error', async () => {
      const errMessage = 'Some unknown error';
      apiClientPostSpy.mockRejectedValue(new Error(errMessage));
      expect(validateOTP()).rejects.toThrow(errMessage);
    });
  });
});
