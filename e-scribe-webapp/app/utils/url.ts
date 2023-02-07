export const getReferrer = (location): string => {
  return location?.state?.referrer || '';
};

export const StrapiConstants = {
  DEFAULT_BASE_URL: '/cms',
  CONTEXT_PATH_STATIC_ASSETS: '/static/assets',
  SEARCH_PARAM_LOCALE: 'locale',  
};

export const getMediaURL = ({ locale }: any, fileName: string): string => {
   const { DEFAULT_BASE_URL, CONTEXT_PATH_STATIC_ASSETS, SEARCH_PARAM_LOCALE } = StrapiConstants;
   return `${process.env.STRAPI_BASE_URL || DEFAULT_BASE_URL}${CONTEXT_PATH_STATIC_ASSETS}/${fileName}?${SEARCH_PARAM_LOCALE}=${locale}`;
}
