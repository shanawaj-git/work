const {
  getMessageText,
} = require("../message-templates/message-template-service");
const { sendSMS } = require("../sms/sms-service");
const {
  createSmsNotification,
} = require("../sms-notification/sms-notification");
const messageTemplate = require("../message-templates/MessageTemplate");
const SmsType = require("../sms-notification/SmsType");
const SmsStatus = require("../sms-notification/SmsStatus");

const constructSmsNotification = (messageText, user, status) => ({
  messageText: messageText,
  status: status,
  patient: user.id,
  mobileNumber: user.username,
  type: SmsType.Onboard,
});

const sendOnboardingMessage = async (user) => {
  const messageParams = await constructMessageParams(user);
  const messageText = await getMessageText(messageTemplate.ONBOARDING, messageParams);
  try {
    const { success } = await sendSMS(user.username, messageText);
    await createSmsNotification(constructSmsNotification(messageText, user, success ? SmsStatus.Sent : SmsStatus.Failed));
  } catch {
        await createSmsNotification(constructSmsNotification(messageText, user, SmsStatus.Failed));
  }
};

const getPharmacyDetails = async () => {
  return await strapi.query("api::pharmacy.pharmacy").findOne();
};

async function constructMessageParams(user) {
  const pharmacyParam = await getPharmacyDetails();
  return {
    pharmacyName: pharmacyParam.pharmacyName,
    patientName: user.firstName,
    supportContactNumber: pharmacyParam.supportContactNumber,
  };
}

module.exports = { sendOnboardingMessage, getPharmacyDetails };
