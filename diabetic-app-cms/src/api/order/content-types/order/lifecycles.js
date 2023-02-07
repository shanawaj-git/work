const { ValidationError } = require("@strapi/utils").errors;
const messageTemplateService = require("../../../../services/message-templates/message-template-service");
const MessageTemplate = require("../../../../services/message-templates/MessageTemplate");
const { sendSMS } = require("../../../../services/sms/sms-service");
const {
  createSmsNotification,
} = require("../../../../services/sms-notification/sms-notification");
const SmsType = require("../../../../services/sms-notification/SmsType");
const SmsStatus = require("../../../../services/reminder/ReminderStatus");
const OrderStatus = require("../../services/OrderStatus");
const emailService = require("../../../../services/email/email-service");
const generatePaymentLink = (orderId) =>
  `${process.env.DIABETIC_WEBAPP_HOST_DOMAIN}/orders/${orderId}/payments`;

const fetchEmailConfig = async () => {
  const {
    emailList,
    paymentReceivedEmailSubject: subject,
    paymentReceivedEmailTemplate: text,
  } = await strapi.query("api::app-config.app-config").findOne();
  const recipients = emailList && emailList.trim().split("\n");
  if (!recipients || recipients.length === 0) {
    strapi.log.error(
      "No email recepients configured to payment received email"
    );
    return;
  }

  if (!text) {
    strapi.log.error(
      "No template is configured to send the payment received email"
    );
    return;
  }

  return { subject, text, recipients };
};

const constructPaymentMessageParams = (
  { firstName },
  amount,
  currency,
  paymentLink
) => ({
  patientName: firstName,
  currency: currency,
  amount: amount,
  paymentLink: paymentLink,
});

const constructPaymentSmsNotification = (messageText, patient, status) => ({
  messageText: messageText,
  status: status,
  patient: patient.id,
  mobileNumber: patient.username,
  type: SmsType.PaymentLink,
});

const isInsuranceApprovedEvent = (event) =>
  event.params.data.status === OrderStatus.InsuranceApproved;

const isPaymentReceivedEvent = (event) =>
  event.params.data.status === OrderStatus.PaymentReceived;

const isZeroCoPayment = (event) => event.params.data.amount === 0;

const sendPaymentNotification = async (patient, message) => {
  try {
    const { success } = await sendSMS(patient.username, message);
    return await createSmsNotification(
      constructPaymentSmsNotification(
        message,
        patient,
        success ? SmsStatus.Sent : SmsStatus.Failed
      )
    );
  } catch {
    return await createSmsNotification(
      constructPaymentSmsNotification(message, patient, SmsStatus.Failed)
    );
  }
};
const fetchOrder = async (id) =>
  await strapi.entityService.findOne("api::order.order", id, {
    populate: {
      payment: true,
      patient: true,
    },
  });

module.exports = {
  beforeUpdate(event) {
    const isNotValidBillAmount = (amount) => amount === null || undefined;
    const billAmount = event.params.data.amount;
    if (isInsuranceApprovedEvent(event) && isNotValidBillAmount(billAmount)) {
      throw new ValidationError("Please enter the amount");
    }
  },

  async afterUpdate(event) {
    if (isInsuranceApprovedEvent(event)) {
      const {
        result: { id, patient, amount, currency },
      } = event;

      if (isZeroCoPayment(event)) {
        const messageText = await messageTemplateService.getMessageText(
          MessageTemplate.ZEROCOPAYMENT,
          constructPaymentMessageParams(patient, amount, currency, null)
        );
        await sendPaymentNotification(patient, messageText);
      } else {
        // send paymentNotification with paymentlink
        const paymentLink = generatePaymentLink(id);
        const messageText = await messageTemplateService.getMessageText(
          MessageTemplate.PAYMENT,
          constructPaymentMessageParams(patient, amount, currency, paymentLink)
        );

        await sendPaymentNotification(patient, messageText);
      }
    }

    if (isPaymentReceivedEvent(event)) {
      const {
        params: {
          data: { status },
        },
        result: { id, amount, currency },
      } = event;
      const { payment, patient } = await fetchOrder(id);
      const emailConfig = await fetchEmailConfig();
      if (emailConfig) {
        const { subject, text, recipients } = emailConfig;
        try {
          await emailService.sendTemplateEmail({
            subject,
            text,
            html: text,
            params: {
              status,
              id,
              patient,
              payment,
              amount,
              currency,
            },
            recipients,
          });
        } catch (err) {
          strapi.log.error(
            `Sending the payment confirmation email has been failed for the order `
          );
        }
      }
    }
  },
};
