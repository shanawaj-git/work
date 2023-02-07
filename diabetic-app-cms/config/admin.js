module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '166090fc-c4dd-4a88-beb7-9b09165e5676'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
