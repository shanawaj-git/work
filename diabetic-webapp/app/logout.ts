export const LOGIN_SELECTION_PATH = '/phone-login';

export const logout = history => {
  // eslint-disable-next-line no-restricted-globals
  const referrer = location.pathname;
  history.push({
    pathname: LOGIN_SELECTION_PATH,
    state: { referrer },
  });
};
