"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { NotFoundError } = require("@strapi/utils").errors;
var createError = require("http-errors");
const emailService = require("../../../services/email/email-service");
const OrderStatus = require("../services/OrderStatus");
const {
  retrievePaymentUIMetadata,
} = require("../../../services/payment-provider/payment-provider-service");
const paymentProviderService = require("../../../services/payment-provider/payment-provider-service");
const PaymentEventSource = require("../../payment/services/PaymentEventSource");
const PaymentStatus = require("../../payment/services/PaymentStatus");
const {
  forbiddenError,
} = require("../../../extensions/users-permissions/controllers/auth-otp");
const {
  constructResponseForPatient,
} = require("../../payment/controllers/payment");
const PaymentType = require("../../payment/services/PaymentType");

const fetchPrescription = async (id) =>
  await strapi.entityService.findOne("api::prescription.prescription", id, {
    populate: { patient: true, order: true },
  });

const validateOrderInitialization = (prescription, patient) => {
  //checks if prescription exists and is for the authenticated user
  if (!prescription || prescription.patient.id !== patient.id) {
    throw new NotFoundError("Prescription does not exist for the user");
  }

  //checks if order already created for the prescription
  if (prescription.order) {
    throw new createError(409, "Existing order found");
  }
};

const createOrder = async (prescription, patient, address, schedule) =>
  await strapi.entityService.create("api::order.order", {
    data: {
      prescription: prescription.id,
      patient: patient.id,
      address,
      schedule,
      status: OrderStatus.Pending,
    },
    populate: { address: true, prescription: true },
  });

const ORDER_CONTEXT = "admin/content-manager/collectionType/api::order.order";

const fetchEmailConfigForCashOrCardOnDelivery = async () => {
  const {
    emailList,
    cashOrCardOnDeliveryEmailSubject: subject,
    cashOrCardOnDeliveryEmailTemplate: text,
  } = await strapi.query("api::app-config.app-config").findOne();

  const recipients = emailList && emailList.trim().split("\n");
  if (!recipients || recipients.length === 0) {
    strapi.log.error(
      "No email recipients configured to receive cash/card on delivery email"
    );
    return;
  }

  if (!text) {
    strapi.log.error(
      "No template is configured to send the cash/card on delivery email"
    );
    return;
  }

  return { subject, text, recipients };
};
const fetchEmailConfig = async () => {
  const {
    emailList,
    newPrescriptionEmailSubject: subject,
    newPrescriptionEmailTemplate: text,
  } = await strapi.query("api::app-config.app-config").findOne();
  const recipients = emailList && emailList.trim().split("\n");
  if (!recipients || recipients.length === 0) {
    strapi.log.error(
      "No email recipients configured to receive the new precription email"
    );
    return;
  }

  if (!text) {
    strapi.log.error(
      "No template is configured to send the new precription email"
    );
    return;
  }

  return { subject, text, recipients };
};

const sendNewPrescriptionEmail = async (order, patient) => {
  const emailConfig = await fetchEmailConfig();
  if (emailConfig) {
    const { subject, text, recipients } = emailConfig;
    const orderLink = `${process.env.HOST_DOMAIN}/${ORDER_CONTEXT}/${order.id}`;

    try {
      await emailService.sendTemplateEmail({
        subject,
        text,
        html: text,
        params: { order, patient, orderLink },
        recipients,
      });
    } catch (err) {
      strapi.log.error(
        `Sending the new prescription email has been failed for the order ${order.id}`,
        err
      );
    }
  }
};

const initializeOrder = async (ctx) => {
  const {
    request: {
      body: { prescriptionNumber, address, schedule },
    },
    state: { user: patient },
  } = ctx;
  const prescription = await fetchPrescription(prescriptionNumber);

  //validations
  validateOrderInitialization(prescription, patient);

  const order = await createOrder(prescription, patient, address, schedule);
  sendNewPrescriptionEmail(order, patient);
  ctx.created(order);
};

const findOneForPatient = async (ctx) => {
  const { id } = ctx.params;
  const {
    query,
    state: { user: authPatient },
  } = ctx;
  query.populate = { ...query.populate, patient: true, payment: true };
  const order = await strapi.entityService.findOne("api::order.order",id, query);
  if (order?.patient.id !== authPatient.id) {
    throw new NotFoundError("Order ID does not exist");
  }

  const { amount, currency, status, payment } = order;

  const {
    id: paymentId,
    paymentType,
    providerMetadata,
    maskedCardNumber,
    createdAt,
  } = payment || {};

  return !payment
    ? { id, amount, currency, status }
    : {
        id,
        amount,
        currency,
        status,
        payment: constructPaymentResponseForPatient(payment),
      };
};

const findOne = async (ctx, superFindOne) => {
  const {
    state: { user },
  } = ctx;
  if (user?.role.name.toLowerCase() === "patient") {
    return await findOneForPatient(ctx);
  } else {
    return superFindOne(ctx);
  }
};
const createPayment = async (order, paymentMethod) => {
  const payment = strapi.entityService.create("api::payment.payment", {
    data: {
      currency: order.currency,
      amount: order.amount,
      paymentType: paymentMethod,
      order: order.id,
      patient: order.patient.id,
    },
    populate: { order: true, patient: true },
  });
  await updateOrderStatus(order, OrderStatus.RequirePayment);
  return payment;
};

const updatePayment = async (order, paymentMethod) => {
  return await strapi.entityService.update(
    "api::payment.payment",
    order.payment.id,
    {
      data: {
        currency: order.currency,
        amount: order.amount,
        paymentType: paymentMethod,
      },
    }
  );
};

async function updateOrderStatus(order, status) {
  return await strapi.db.query("api::order.order").update({
    where: { id: order.id },
    data: {
      status,
    },
  });
}

const validateOrder = (order) => {
  if (
    ![OrderStatus.InsuranceApproved, OrderStatus.RequirePayment].includes(
      order.status
    )
  )
    forbiddenError(
      "Invalid order status for payment",
      "order.payment.error.status"
    );
};
const isCardOrCashOnDeDelivery = (paymentMethod) =>
  paymentMethod === PaymentType.CardOnDelivery ||
  paymentMethod === PaymentType.CashOnDelivery;

const setPaymentDetailsTypeAndSendEmailNotification = async (order, paymentMethod) => {
  validateOrder(order);
  const payment = order.payment
    ? await updatePayment(order, paymentMethod)
    : await createPayment(order, paymentMethod);
  sendCashOrCardOnDeliveryEmail(order, order.patient, paymentMethod);
  return payment;
};

const confirmPayment = async (ctx) => {
  const {
    params: { orderId },
    state: { user: authPatient },
    request: {
      body: { paymentMethod },
    },
  } = ctx;
  const order = await fetchOrder(orderId);
  validateUser(authPatient, order);

  const payment = isPaymentStatusSucceeded(order)
    ? order.payment
    : isCardOrCashOnDeDelivery(paymentMethod)
    ? await setPaymentDetailsTypeAndSendEmailNotification(order, paymentMethod)
    : await fetchAndUpdatePaymentDetails(order);
  return constructResponseForPatient(payment);
};

const fetchAndUpdatePaymentDetails = async (order) => {
  validatePayment(order.payment);
  const providerPaymentDetails =
    await paymentProviderService.fetchPaymentDetails(
      order.payment.providerPaymentId
    );
  return strapi.services["api::order.order"].updatePayment(
    order.id,
    providerPaymentDetails,
    PaymentEventSource.Application
  );
};

const isPaymentStatusSucceeded = (order) =>
  order.payment && order.payment.status === PaymentStatus.Succeeded;

const validateUser = (authPatient, order) => {
  if (authPatient.id !== order.patient.id)
    throw new NotFoundError(
      "Order with the given id does not exist for the patient"
    );
};
const validatePayment = (payment) => {
  if (!payment)
    forbiddenError(
      "Payment is not initialized",
      "order.payment.not.initialized"
    );
};

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

const constructPaymentResponseForPatient = ({
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
  providerMetadata: retrievePaymentUIMetadata(providerMetadata),
  maskedCardNumber,
  status,
  createdAt,
});

const orderControllerModule = createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    initialize: initializeOrder,
    confirmPayment: confirmPayment,
    async findOne(ctx) {
      return await findOne(ctx, super.findOne.bind(this));
    },
  })
);

const sendCashOrCardOnDeliveryEmail = async (order, patient, paymentMethod) => {
  const emailConfig = await fetchEmailConfigForCashOrCardOnDelivery();
  if (emailConfig) {
    const { subject, text, recipients } = emailConfig;
    const orderLink = `${process.env.HOST_DOMAIN}/${ORDER_CONTEXT}/${order.id}`;
    try {
      await emailService.sendTemplateEmail({
        subject,
        text,
        html: text,
        params: { order, patient, orderLink, paymentMethod },
        recipients,
      });
    } catch (err) {
      strapi.log.error(
        `Sending the cash on delivery email has been failed for the order ${order.id}`,
        err
      );
    }
  }
};
orderControllerModule.initializeOrder = initializeOrder;
orderControllerModule.findOne = findOne;
orderControllerModule.confirmPayment = confirmPayment;
module.exports = orderControllerModule;
