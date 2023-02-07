import { APIClientOptions, AuthDataKeys } from '../types';

const storeAuthData = (user, jwt) => {
  sessionStorage.setItem(AuthDataKeys.User, JSON.stringify(user));
  sessionStorage.setItem(AuthDataKeys.Jwt, jwt);
};

const clearAuthData = () => {
  sessionStorage.removeItem(AuthDataKeys.User);
  sessionStorage.removeItem(AuthDataKeys.Jwt);
};

const getJwt = () => sessionStorage.getItem(AuthDataKeys.Jwt);

export const responseErrorInterceptor = options => error => {
  if (error.response.status === 401 || error.response.status === 403) {
    clearAuthData();
    options.onUnauthorizedAccess();
  }
  throw error;
};

export const responseInterceptor = options => response => {
  if (response.config.url === options.loginUrl && response.status === 200) {
    const { user, jwt } = response.data;
    storeAuthData(user, jwt);
    options.onSuccessfulAuthentication({
      user,
      jwt,
    });
  }
  return response;
};

export const requestInterceptor = config => {
  const headers = { ...config.headers };
  if (!config.isPublicUrl) {
    const jwt = getJwt();
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
  }
  return { ...config, headers };
};
// Do something before request is sent

export const addInterceptors = (client, options: APIClientOptions) => {
  client.interceptors.response.use(
    responseInterceptor(options),
    responseErrorInterceptor(options),
  );
  client.interceptors.request.use(requestInterceptor);
};
