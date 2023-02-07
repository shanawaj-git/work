const stripe = require("stripe")(process.env.STRIPE_KEY);
const PaymentStatus = require("../../api/payment/services/PaymentStatus");
const PaymentSubType = require("../../api/payment/services/PaymentSubType");
const PaymentType = require("../../api/payment/services/PaymentType");

const initializePayment = async (order) => {
  return await stripe.paymentIntents.create({
    amount: order.amount * 100,
    currency: order.currency,
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId: order.id,
      patientId: order.patient.id,
      prescriptionId: order.prescription.id,
    },
  });
};

const retrievePaymentUIMetadata = (paymentMetadata) => {
  return { client_secret: paymentMetadata? paymentMetadata.client_secret:""};
};

const stripePaymentStatusMap = {
  requires_payment_method: PaymentStatus.PaymentMethodRequired,
  canceled: PaymentStatus.Canceled,
  payment_intent_requires_action: PaymentStatus.ActionRequired,
  processing: PaymentStatus.Processing,
  succeeded: PaymentStatus.Succeeded,
  payment_intent_requires_capture: PaymentStatus.CaptureRequired,
  pending: PaymentStatus.Pending,
  requires_action: PaymentStatus.ActionRequired,
  failed: PaymentStatus.Failed,
  unknown: PaymentStatus.Unknown,
};

const stripePaymentSubTypeMap = {
  visa: PaymentSubType.Visa,
  mastercard: PaymentSubType.MasterCard,
  apple_pay: PaymentSubType.ApplePay,
  google_pay: PaymentSubType.GooglePay,
  samsung_pay: PaymentSubType.SamsungPay,
};

const fetchPaymentDetails = async (id) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(String(id));
  const paymentMethod = paymentIntent.payment_method
    ? await stripe.paymentMethods.retrieve(String(paymentIntent.payment_method))
    : null;
  return constructPaymentDetails(paymentIntent,paymentIntent.status, paymentMethod);
};

const constructPaymentDetails = (paymentIntent,paymentStatus, paymentMethod) => {
  return {
    status: mapPaymentStatus(paymentStatus),
    maskedCardNumber: paymentMethod ? paymentMethod.card.last4 : null,
    providerMetadata: paymentIntent,
    paymentSubType:
      paymentMethod && paymentMethod.card.wallet
        ? stripePaymentSubTypeMap[paymentMethod.card.wallet.type]
        : paymentMethod
        ? stripePaymentSubTypeMap[paymentMethod.card.brand]
        : null,
    paymentType:
      paymentMethod && paymentMethod.card.wallet
        ? PaymentType.Wallet
        : paymentMethod
        ? PaymentType.Card
        : null,
  };
};

const mapPaymentStatus = (paymentProviderStatus) =>
  stripePaymentStatusMap[paymentProviderStatus] || PaymentStatus.Unknown;
const mapPaymentEvent = mapPaymentStatus;

module.exports = {
  initializePayment,
  mapPaymentStatus,
  mapPaymentEvent,
  fetchPaymentDetails,
  retrievePaymentUIMetadata,
  constructPaymentDetails,
};
