const CONTEXT_PATH_ORDERS_INITIALIZE = "/orders/initialize";
const CONTEXT_PATH_PAYMENT_STATUS = "/orders/:orderId/payments/confirmation";

module.exports = {
  routes: [
    {
      method: "POST",
      path: CONTEXT_PATH_ORDERS_INITIALIZE,
      handler: "order.initialize",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: CONTEXT_PATH_PAYMENT_STATUS,
      handler: "order.confirmPayment",
      config: {
        policies: [],
      },
    },
  ],
};