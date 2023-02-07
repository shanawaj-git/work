"use strict";

/**
 *  payment controller
 */

const OrderStatus = require("../../order/services/OrderStatus");
const { createCoreController } = require("@strapi/strapi").factories;
const paymentProviderService = require("../../../services/payment-provider/payment-provider-service");
const {
  forbiddenError,
} = require("../../../../src/extensions/users-permissions/controllers/auth-otp");
const {
  retrievePaymentUIMetadata,
} = require("../../../services/payment-provider/payment-provider-service");

module.exports = createCoreController("api::payment.payment");

const initializePayment = async (ctx) => {
  const {
    request: {
      body: { orderId },
    },
  } = ctx;
  const order = await fetchOrder(orderId);
  validateOrder(order);
  const payment = order.payment ? order.payment : await createPayment(order);
  return constructResponseForPatient(payment);
};

const createPayment = async (order) => {
  const providerMetadata = await paymentProviderService.initializePayment(
    order
  );

  const payment = strapi.entityService.create("api::payment.payment", {
    data: {
      currency: order.currency,
      providerPaymentId: providerMetadata.id,
      providerMetadata,
      amount: order.amount,
      status: paymentProviderService.mapPaymentStatus(providerMetadata.status),
      correlationId: order.patient.id.toString(),
      order: order.id,
      patient: order.patient.id,
      history: [
        {
          type: paymentProviderService.mapPaymentEvent(providerMetadata.status),
          timeStamp: new Date().toISOString(),
          metadata: providerMetadata,
        },
      ],
    },
    populate: { order: true, patient: true, history: true },
  });
  await updateOrderStatus(order, OrderStatus.RequirePayment);
  return payment;
};

const constructResponseForPatient = ({
  id,
  paymentType,
  paymentSubType,
  status,
  providerMetadata,
  maskedCardNumber,
  createdAt,
}) => ({
  id,
  paymentType,
  paymentSubType,
  status,
  providerMetadata: retrievePaymentUIMetadata(providerMetadata),
  maskedCardNumber,
  createdAt,
});

const validateOrder = (order) => {
  if (
    ![OrderStatus.InsuranceApproved, OrderStatus.RequirePayment].includes(
      order.status
    )
  )
    forbiddenError(
      "Invalid order status for payment initialization",
      "order.payment.error.status"
    );
};

const paymentControllerModule = (module.exports = createCoreController(
  "api::payment.payment",
  ({ strapi }) => ({
    initialize: initializePayment,
  })
));

const fetchOrder = async (id) =>
  await strapi.entityService.findOne("api::order.order", id, {
    populate: {
      payment: {
        populate: { history: true },
      },
      patient: true,
      prescription: true,
    },
  });

async function updateOrderStatus(order, status) {
  return await strapi.db.query("api::order.order").update({
    where: { id: order.id },
    data: {
      status,
    },
  });
}

paymentControllerModule.initializePayment = initializePayment;

module.exports.constructResponseForPatient = constructResponseForPatient;
