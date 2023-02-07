const { setupStrapi, tearDown } = require('./helpers/strapi');

jest.setTimeout(20000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await tearDown();
});

it('strapi is defined', () => {
  expect(strapi.server).toBeDefined();
});
