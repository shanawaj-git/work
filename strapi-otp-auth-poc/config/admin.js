module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3fa1d3d7950cbbe16627b51074e48413'),
  },
});
