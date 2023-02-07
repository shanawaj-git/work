'use strict';

/**
 * order service.
 */

const PaymentEventSource = require("../../payment/services/PaymentEventSource");
const PaymentStatus = require("../../payment/services/PaymentStatus");
const OrderStatus = require("./OrderStatus");

const {createCoreService} = require("@strapi/strapi").factories;

const fetchOrder = async (id) =>
    await strapi.entityService.findOne("api::order.order", id, {
        populate: {
            payment: {
                populate: {history: true},
            },
            patient: true,
            prescription: true,
        },
    });

const updatePayment = async (
    orderId,
    providerPaymentDetails,
    paymentEventSource
) => {
    const order = await fetchOrder(orderId);
    const payment = order.payment;

    const history = [
        ...payment.history,
        {
            type: providerPaymentDetails.status,
            timeStamp: new Date().toISOString(),
            metadata: providerPaymentDetails.providerMetadata,
            eventSource: paymentEventSource,
        },
    ];

    const data = providerPaymentDetails.paymentType
        ? {
            status: providerPaymentDetails.status,
            maskedCardNumber: providerPaymentDetails.maskedCardNumber,
            paymentType: providerPaymentDetails.paymentType,
            paymentSubType: providerPaymentDetails.paymentSubType,
            history,
        }
        : {
            status: providerPaymentDetails.status,
            history,
        };
    const updatedPayment = await strapi.entityService.update(
        "api::payment.payment",
        payment.id,
        {
            data: data,
        }
    );
    if (providerPaymentDetails.status === PaymentStatus.Succeeded && order.status !== OrderStatus.PaymentReceived) {
        await updateOrderStatus(order, OrderStatus.PaymentReceived);
    }
    return updatedPayment;
};

const updateOrderStatus = async (order, status) => {
  return await strapi.db.query("api::order.order").update({
    where: { id: order.id },
    data: {
      status,
    },
  });
};

module.exports = {
  ...createCoreService("api::order.order", {
    updatePayment,
    updateOrderStatus,
  }),
  updatePayment,
  updateOrderStatus,
};
