import {
  ApolloClient,
  NormalizedCacheObject,
  HttpLink,
  concat,
  ServerError,
  ApolloLink,
} from '@apollo/client';
import { ErrorHandler, onError } from '@apollo/client/link/error';
import SubModule from 'utils/constants/env';
import { cache } from './graphQLCache';
export const LOGIN_SELECTION_PATH = '/login-selection';

export const globalErrorHandler = (history): ErrorHandler => ({
  networkError,
}) => {
  if (networkError && (networkError as ServerError).statusCode === 401) {
    const referrer = location.pathname;
    history.push({
      pathname: LOGIN_SELECTION_PATH,
      state: { referrer },
    });
  }
};

const apolloClientGlobalErrorHandler = history =>
  onError(globalErrorHandler(history));

export const DEFAULT_URL = '/api/graphql';

const DefaultApiUrls = {
  [SubModule.AUTHENTICATION]: '/auth/api/graphql',
  [SubModule.PRESCRIPTION]: '/prescriptions/api/graphql',
};

let configureGraphQLClient;
// TODO: Will be removed and replaced by the gateway
const PROXY_LINK = ApolloLink.split(
  operation => operation.getContext().module === SubModule.AUTHENTICATION,
  new HttpLink({
    uri: process.env.AUTH_API_URL || DefaultApiUrls.authentication,
  }),
  new HttpLink({
    uri: process.env.PRESCRIPTIONS_API_URL || DefaultApiUrls.prescription,
  }),
);
configureGraphQLClient = (history): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache,
    link: concat(apolloClientGlobalErrorHandler(history), PROXY_LINK),
  });

export { configureGraphQLClient };
