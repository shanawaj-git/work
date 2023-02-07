import { APIClientOptions } from 'apis/types';
import axios from 'axios';
import { addInterceptors } from './addInterceptors';
import * as environmentConfig from '../../configs/environmentConfig';

let httpClient;
// eslint-disable-next-line no-unused-vars
const configureAPIClient = (options: APIClientOptions) => {
  // TODO: intercept response and add callback support for login, auth failed
  httpClient = axios.create({
    baseURL:
      environmentConfig.getEnvironmentConfig().API_BASE_URL ||
      'http://localhost:1337',
    timeout: 30000, // 30 seconds
    // TODO: pass Authorization once login is implemented
  });
  addInterceptors(httpClient, options);
  return httpClient;
};

const getAPIClientInstance = () => {
  if (!httpClient) {
    throw new Error('API Client is not intialized');
  }
  return httpClient;
};

export { configureAPIClient, getAPIClientInstance, APIClientOptions };
