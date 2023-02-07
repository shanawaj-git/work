const CONTEXT_PATH_PAYMENT_INITIALIZE = "/payments/initialize";

module.exports = {
  routes: [
    {
      method: "POST",
      path: CONTEXT_PATH_PAYMENT_INITIALIZE,
      handler: "payment.initialize",
      config: {
        policies: [],
      },
    },

  ],
};