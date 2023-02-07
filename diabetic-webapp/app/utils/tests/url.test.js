import { getMediaURL, StrapiConstants } from '../url';
const MOCKED_LOCALE = {
  intl: {
    locale: 'en',
  },
};
describe('getMediaURL', () => {
  it('should return media url using default base url', () => {
    const FILE_NAME = 'logo.png';
    const { intl } = MOCKED_LOCALE;
    const {
      DEFAULT_BASE_URL,
      CONTEXT_PATH_STATIC_ASSETS,
      SEARCH_PARAM_LOCALE,
    } = StrapiConstants;
    const TARGET = `${DEFAULT_BASE_URL}${CONTEXT_PATH_STATIC_ASSETS}/${FILE_NAME}?${SEARCH_PARAM_LOCALE}=${
      intl.locale
    }`;
    expect(getMediaURL(intl, FILE_NAME)).toEqual(TARGET);
  });

  it('should return media url using Strapi base url from the environment', () => {
    const FILE_NAME = 'logo.png';
    const { intl } = MOCKED_LOCALE;
    const { CONTEXT_PATH_STATIC_ASSETS, SEARCH_PARAM_LOCALE } = StrapiConstants;
    const STRAPI_BASE_URL = 'https://dummy.strapi.host';
    const TARGET = `${STRAPI_BASE_URL}${CONTEXT_PATH_STATIC_ASSETS}/${FILE_NAME}?${SEARCH_PARAM_LOCALE}=${
      intl.locale
    }`;
    process.env.STRAPI_BASE_URL = STRAPI_BASE_URL;
    expect(getMediaURL(intl, FILE_NAME)).toEqual(TARGET);
    delete process.env.STRAPI_BASE_URL;
  });
});
