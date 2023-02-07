const PROXY_DEFAULT_URL = 'https://escribe-apim.azure-api.net/unleash/proxy/';

export const getUnleashConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'staging': {
      return {
        // TODO: To be added after deployment of staging
      };
    }
    case 'production': {
      // TODO: Add the unleash proxy url after its hosted
      return {
        url: process.env.UNLEASH_PROXY_URL || PROXY_DEFAULT_URL,
        clientKey: 'proxy-secret',
        refreshInterval: 15,
        appName: 'dev',
      };
    }
    default: {
      return {
        url: process.env.UNLEASH_PROXY_URL || PROXY_DEFAULT_URL,
        clientKey: 'proxy-secret',
        refreshInterval: 15,
        appName: 'dev',
      };
    }
  }
};
