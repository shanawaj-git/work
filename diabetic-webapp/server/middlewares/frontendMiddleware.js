/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  require('dotenv').config();
  const isProd = process.env.NODE_ENV === 'production';

  app.get('/config', (_req, res) =>
    res.json({
      API_BASE_URL: process.env.API_BASE_URL,
      STRIPE_UI_KEY: process.env.STRIPE_UI_KEY,
      WOOS_MAP_KEY: process.env.WOOS_MAP_KEY,
      GOOGLE_PLACES_KEY: process.env.GOOGLE_PLACES_KEY,
      GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    }),
  );

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
