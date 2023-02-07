import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import fetch from "cross-fetch";

interface GetClientType {
  token?: undefined | string;
  link: string;
}
const getClient = ({ token = undefined, link }: GetClientType) => {
  const httpLink = new HttpLink({
    fetch,
    uri: link,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
};

const client = getClient({
  link: `${process.env.NEXT_PUBLIC_STRAPI_SERVICE}/graphql`,
});

export default client;

export const autoFixClient = getClient({
  link: `${process.env.NEXT_PUBLIC_AUTOFIX_SERVICE}/graphql`,
});
