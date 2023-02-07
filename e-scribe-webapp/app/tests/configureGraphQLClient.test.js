/* eslint-disable import/first */
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  ApolloClient: jest.fn(),
  HttpLink: jest.fn(),
  concat: jest.fn(),
}));

import {
  configureGraphQLClient,
  DEFAULT_URL,
  globalErrorHandler,
} from 'configureGraphQLClient';

const LOGIN_SELECTION_PATH = {
  pathname: '/login-selection',
  state: { referrer: '/' },
};

describe('configureGraphQLClient', () => {
  let httpLinkContructorMock;

  const OLD_ENV = process.env;
  let mockHistory;

  beforeEach(() => {
    // eslint-disable-next-line global-require
    // eslint-disable-next-line global-require
    httpLinkContructorMock = require('@apollo/client').HttpLink;
    process.env = { ...OLD_ENV }; // Make a copy
    mockHistory = {
      push: jest.fn(),
    };
  });

  afterEach(() => {
    mockHistory = null;
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('configures the client with url from process.env if provided', () => {
    const API_URL = 'https://some.dummy.endpoint/graphql';
    process.env.API_URL = API_URL;
    configureGraphQLClient(mockHistory);
    expect(httpLinkContructorMock).toBeCalledWith({ uri: API_URL });
  });

  it('configures the client with DEFAULT_URL if not set in process.env', () => {
    configureGraphQLClient(mockHistory);
    expect(httpLinkContructorMock).toBeCalledWith({ uri: DEFAULT_URL });
  });

  describe('globalErrorHandler', () => {
    let globalErrorHandlerInstance;
    beforeEach(() => {
      globalErrorHandlerInstance = globalErrorHandler(mockHistory);
    });
    afterEach(() => {
      globalErrorHandlerInstance = null;
    });

    it('Redirects to login url when API responds with 401 error code', () => {
      globalErrorHandlerInstance({
        networkError: {
          statusCode: 401,
        },
      });
      expect(mockHistory.push).toBeCalledTimes(1);
      expect(mockHistory.push).lastCalledWith(LOGIN_SELECTION_PATH);
    });

    it('does not redirect to login url when API responds with any other error code', () => {
      globalErrorHandlerInstance({
        networkError: {
          statusCode: 400,
        },
      });
      expect(mockHistory.push).toBeCalledTimes(0);
    });

    it('does not redirect to login url for non network errors', () => {
      globalErrorHandlerInstance({
        networkError: undefined,
      });
      expect(mockHistory.push).toBeCalledTimes(0);
    });
  });
});
