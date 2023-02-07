import axios from 'axios';

import { configureAPIClient, getAPIClientInstance } from '..';
import * as environmentConfig from '../../../configs/environmentConfig';

describe('API Client', () => {
  describe('getAPIClientInstance()', () => {
    it('throws error when invoke before the client is configured', () => {
      expect(() => getAPIClientInstance()).toThrow(
        'API Client is not intialized',
      );
    });

    it('it returns the instance when the client is configured', () => {
      configureAPIClient({});
      expect(getAPIClientInstance()).toBeDefined();
    });
  });

  describe('configureAPIClient()', () => {
    let axiosCreateSpy;
    let envConfigGetSpy;
    beforeEach(() => {
      axiosCreateSpy = jest.spyOn(axios, 'create');
      envConfigGetSpy = jest.spyOn(environmentConfig, 'getEnvironmentConfig');
    });
    afterEach(() => {
      axiosCreateSpy.mockRestore();
      envConfigGetSpy.mockRestore();
    });

    it('it passes the default base url to the axios.create methodvwhen not set in the env', () => {
      const originalAPiBaseUrl = process.env.API_BASE_URL;
      delete process.env.API_BASE_URL;
      configureAPIClient({});
      expect(axiosCreateSpy).toBeCalledWith({
        baseURL: 'http://localhost:1337',
        timeout: 30000,
      });
      process.env.API_BASE_URL = originalAPiBaseUrl; // restoring the actual value if any
    });

    it('it passes the base url set in the environment config to the axios.create method', () => {
      const API_BASE_URL = 'https://example.com';
      envConfigGetSpy.mockReturnValue({
        API_BASE_URL,
      });
      configureAPIClient({});
      expect(axiosCreateSpy).toBeCalledWith({
        baseURL: API_BASE_URL,
        timeout: 30000,
      });
    });
  });
});
