const { initCustomControllers } = require("../controllers/auth-otp");

const CONTEXT_AUTH_OTP = "/otp";

const generateOtpRoute = {
  method: "POST",
  path: CONTEXT_AUTH_OTP,
  handler: "user.generateOtp",
  config: { auth: false },
};

const initCustomRoutes = (plugin) => {
  initCustomControllers(plugin);
  plugin.routes["content-api"].routes.push(generateOtpRoute);
};

module.exports = {
  initCustomRoutes,
};
