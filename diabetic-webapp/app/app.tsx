/**
 * app.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import { GlobalTheme } from '@albathanext/design-system';
import { ThemeProvider } from 'styled-components';
// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import { configureAPIClient } from 'apis/client';
import { logout } from 'logout';
import { AuthApiUrls } from 'apis/auth';
import { diabeticTheme, APP_THEME_NAME } from './themes/theme';
import configureStore from './configureStore';
// Import i18n messages
import { translationMessages } from './i18n';
import { initEnvironmentConfig } from './configs/environmentConfig';

GlobalTheme.setTheme({ name: APP_THEME_NAME, theme: diabeticTheme });

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const AppRoot = ({ messages }: { messages: Object }) => {
  const [initialized, setInitialized] = useState(false);

  const init = async () => {
    await initEnvironmentConfig();
    await configureAPIClient({
      onSuccessfulAuthentication: () => {},
      onUnauthorizedAccess: logout.bind(this, history),
      loginUrl: AuthApiUrls.VALIDATE_OTP,
    });
    setInitialized(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <DesignSystemThemeProvider>
            {initialized && <App />}
          </DesignSystemThemeProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  );
};

const render = messages => {
  ReactDOM.render(<AppRoot messages={messages} />, MOUNT_NODE);
};

const DesignSystemThemeProvider = ({ children }: { children: any }) => {
  const [theme] = useState<any>(GlobalTheme.getActiveTheme().theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
