module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        process.env.HOST_DOMAIN,
        process.env.DIABETIC_WEBAPP_HOST_DOMAIN,
        ...(process.env.ADDITIONAL_CORS_DOMAINS ? process.env.ADDITIONAL_CORS_DOMAINS.split(' ') : []),
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      includeUnparsed: true,
    },
  },
  'strapi::session',
  'strapi::favicon',
  {
    resolve: "src/middlewares/stripe-webhook-middleware.js",
    config: {},
  },
  'strapi::public',
];
