import { AuthDataKeys } from 'apis/types';
import {
  addInterceptors,
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from '../addInterceptors';

describe('Add API Client Interceptors', () => {
  describe('addInterceptors', () => {
    it('adds request and response interceptors to the client', () => {
      const mockClient = {
        interceptors: {
          request: {
            use: jest.fn(),
          },
          response: {
            use: jest.fn(),
          },
        },
      };
      addInterceptors(mockClient);
      expect(mockClient.interceptors.response.use).toBeCalledWith(
        expect.any(Function),
        expect.any(Function),
      );
      expect(mockClient.interceptors.request.use).toBeCalledWith(
        expect.any(Function),
      );
    });
  });

  const dummyJwt = 'a-dummy-jwt-string';
  const dummyUser = { id: 1, firstName: 'a-dummy-user' };

  describe('requestInterceptor', () => {
    it('adds Authorization header for non public url requests', () => {
      const dummyConfig = {
        isPublicUrl: false,
      };
      sessionStorage.setItem(AuthDataKeys.Jwt, dummyJwt);
      const newConfig = requestInterceptor(dummyConfig);

      expect(newConfig.headers).toEqual({
        Authorization: `Bearer ${dummyJwt}`,
      });
      sessionStorage.clear();
    });

    it('doesnot add Authorization header for public url requests', () => {
      const dummyConfig = {
        isPublicUrl: true,
      };
      sessionStorage.setItem(AuthDataKeys.Jwt, dummyJwt);
      const newConfig = requestInterceptor(dummyConfig);

      expect(newConfig.headers).toEqual({});
      sessionStorage.clear();
    });

    it('doesnot add Authorization header for non public url requests when jwt is not found in session storage', () => {
      const dummyConfig = {};
      sessionStorage.removeItem(AuthDataKeys.Jwt);
      const newConfig = requestInterceptor(dummyConfig);

      expect(newConfig.headers).toEqual({});
    });
  });

  describe('responseInterceptor', () => {
    const dummyLoginUrl = '/dummy/login/url';
    const dummyConfig = {
      url: dummyLoginUrl,
    };

    it('saves the auth data into session storage and calls onSuccessfulAuthentication on successful login', () => {
      const dummyResponse = {
        status: 200,
        data: {
          jwt: dummyJwt,
          user: dummyUser,
        },
        config: dummyConfig,
      };

      const options = {
        loginUrl: dummyLoginUrl,
        onSuccessfulAuthentication: jest.fn(),
      };

      sessionStorage.clear();

      responseInterceptor(options)(dummyResponse);

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(dummyJwt);
      expect(JSON.parse(sessionStorage.getItem(AuthDataKeys.User))).toEqual(
        dummyUser,
      );
      expect(options.onSuccessfulAuthentication).toBeCalledWith({
        user: dummyUser,
        jwt: dummyJwt,
      });

      sessionStorage.clear();
    });

    it('does not save the auth data into session storage and call onSuccessfulAuthentication on unsuccessful login', () => {
      const dummyResponse = {
        status: 400,
        config: dummyConfig,
      };

      const options = {
        loginUrl: dummyLoginUrl,
        onSuccessfulAuthentication: jest.fn(),
      };

      sessionStorage.clear();

      responseInterceptor(options)(dummyResponse);

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(null);
      expect(sessionStorage.getItem(AuthDataKeys.User)).toBe(null);
      expect(options.onSuccessfulAuthentication).not.toBeCalled();

      sessionStorage.clear();
    });

    it('it does not process the response for non-login urls', () => {
      const dummyResponse = {
        status: 200,
        data: {
          jwt: dummyJwt,
          user: dummyUser,
        },
        config: { url: '/some/other/url' },
      };

      const options = {
        loginUrl: dummyLoginUrl,
        onSuccessfulAuthentication: jest.fn(),
      };

      sessionStorage.clear();

      responseInterceptor(options)(dummyResponse);

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(null);
      expect(sessionStorage.getItem(AuthDataKeys.User)).toBe(null);
      expect(options.onSuccessfulAuthentication).not.toBeCalled();

      sessionStorage.clear();
    });
  });

  describe('responseErrorInterceptor', () => {
    it('clears the auth data from the session storage and invokes onUnauthorizedAccess on 401 error response', () => {
      const mockError = new Error();
      mockError.response = { status: 401 };

      const options = {
        onUnauthorizedAccess: jest.fn(),
      };

      sessionStorage.setItem(AuthDataKeys.Jwt, dummyJwt);
      sessionStorage.setItem(AuthDataKeys.User, JSON.stringify(dummyUser));

      expect(() => responseErrorInterceptor(options)(mockError)).toThrow(
        mockError,
      );

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(null);
      expect(sessionStorage.getItem(AuthDataKeys.User)).toBe(null);
      expect(options.onUnauthorizedAccess).toBeCalled();
    });

    it('clears the auth data from the session storage and invokes onUnauthorizedAccess on 403 error response', () => {
      const mockError = new Error();
      mockError.response = { status: 403 };

      const options = {
        onUnauthorizedAccess: jest.fn(),
      };

      sessionStorage.setItem(AuthDataKeys.Jwt, dummyJwt);
      sessionStorage.setItem(AuthDataKeys.User, JSON.stringify(dummyUser));

      expect(() => responseErrorInterceptor(options)(mockError)).toThrow(
        mockError,
      );

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(null);
      expect(sessionStorage.getItem(AuthDataKeys.User)).toBe(null);
      expect(options.onUnauthorizedAccess).toBeCalled();
    });

    it('does not clear the auth data from the session storage on non 401 error response', () => {
      const mockError = new Error();
      mockError.response = { status: 400 };

      const options = {
        onUnauthorizedAccess: jest.fn(),
      };

      sessionStorage.setItem(AuthDataKeys.Jwt, dummyJwt);
      sessionStorage.setItem(AuthDataKeys.User, JSON.stringify(dummyUser));

      expect(() => responseErrorInterceptor(options)(mockError)).toThrow(
        mockError,
      );

      expect(sessionStorage.getItem(AuthDataKeys.Jwt)).toBe(dummyJwt);
      expect(sessionStorage.getItem(AuthDataKeys.User)).toBe(
        JSON.stringify(dummyUser),
      );
      expect(options.onUnauthorizedAccess).not.toBeCalled();
      sessionStorage.clear();
    });
  });
});
