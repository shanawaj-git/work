module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', '5ad59e314c9139b1e88f78b654f05c72'),
  },
});
