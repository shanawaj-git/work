const forward = jest.fn();
const operation = {
  setContext: jest.fn(),
};

const link = `${process.env.NEXT_PUBLIC_STRAPI_SERVICE}/graphql`;
let _link = "";
jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  ApolloLink: jest.fn().mockImplementation((e) => {
    return e(operation, forward);
  }),
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  concat: jest.fn().mockImplementationOnce((e, a) => {
    _link = a.options.uri;
  }),
}));

describe("Apollo Client", () => {
  test("authMiddleware : should enter apollo middleware", () => {
    require("../index");
    expect(forward).toBeCalled();
  });

  test("should call apollo client with given url", () => {
    expect(link).toBe(_link);
  });
});

export {};
