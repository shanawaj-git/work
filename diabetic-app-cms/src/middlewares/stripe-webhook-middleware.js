const {
  mapPaymentStatus,
  constructPaymentDetails,
} = require("../services/payment-provider/payment-provider-service");
const { ForbiddenError } = require("@strapi/utils").errors;
const PaymentStatus = require("../api/payment/services/PaymentStatus");
const PaymentEventSource = require("../api/payment/services/PaymentEventSource");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const CONTEXT_PATH_PROVIDER_WEBHOOK = "/payments/provider-webhook";
const endpointSecret = process.env.STRIPE_WEB_HOOK_KEY;

const validateSignature = async (context) => {
  const signature = context.request.headers["stripe-signature"];
  const payload = context.request.body[Symbol.for("unparsedBody")];
  try {
    return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err) {
    throw new ForbiddenError('Authentication failed');
  }
};

const fetchPaymentMethod = async (event, payment) => {
  const eventObject = event.data.object;
  const isSuccessPaymentEvent =
    mapPaymentStatus(eventObject.status) === PaymentStatus.Succeeded &&
    !payment.paymentType;
  if (isSuccessPaymentEvent) {
    return await stripe.paymentMethods.retrieve(
      String(eventObject.payment_method)
    );
  }
};

const getPaymentIntentId = (event) => {
  const eventObject = event.data.object;
  let paymentIntentId;
  switch (event.type) {
    case "charge.succeeded":
      paymentIntentId = eventObject.payment_intent;
      break;
    default:
      paymentIntentId = eventObject.id;
  }
  return paymentIntentId;
};

const fetchPaymentMethodAndUpdatePayment = async (
  event,
  paymentIntentId,
  payment
) => {
  const paymentMethod = await fetchPaymentMethod(event, payment);
  const providerPaymentDetails = constructPaymentDetails(
    event,
    event.data.object.status,
    paymentMethod
  );
  await strapi.services["api::order.order"].updatePayment(
    payment.order.id,
    providerPaymentDetails,
    PaymentEventSource.Application
  );
};

const paymentProviderWebhookHandler = async (context) => {
  const event = await validateSignature(context);
  const paymentIntentId = getPaymentIntentId(event);
  const payment = await fetchPayment(paymentIntentId);
  payment
    ? await fetchPaymentMethodAndUpdatePayment(event, paymentIntentId, payment)
    : strapi.log(
        "[Stripe Webhook]",
        `Payment details not found. event type: ${event.type}, id: ${paymentIntentId}`
      );
  return "success";
};

async function fetchPayment(providerPaymentId) {
  const paymentArray = await strapi.entityService.findMany(
    "api::payment.payment",
    {
      filters: { providerPaymentId: providerPaymentId },
      populate: {
        history: true,
        patient: true,
        order: true,
      },
    }
  );
  return paymentArray ? paymentArray[0] : null;
}

const providerWebhookMiddlewareModule = (module.exports = (
  config,
  { strapi }
) => {
  strapi.server.routes([
    {
      method: "POST",
      path: `${CONTEXT_PATH_PROVIDER_WEBHOOK}`,
      handler: paymentProviderWebhookHandler,
      config: { auth: false },
    },
  ]);

  return null;
});

providerWebhookMiddlewareModule.paymentProviderWebhookHandler = paymentProviderWebhookHandler;
providerWebhookMiddlewareModule.fetchPaymentMethodAndUpdatePayment =
  fetchPaymentMethodAndUpdatePayment;
providerWebhookMiddlewareModule.CONTEXT_PATH_PROVIDER_WEBHOOK =
  CONTEXT_PATH_PROVIDER_WEBHOOK;
