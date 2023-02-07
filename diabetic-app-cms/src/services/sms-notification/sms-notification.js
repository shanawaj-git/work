const SmsType = require("../sms-notification/SmsType");
const SmsStatus = require("./SmsStatus");

async function createSmsNotification(smsNotification) {
  return await strapi.query("api::sms-notification.sms-notification").create({
    data: {
      mobileNumber: smsNotification.mobileNumber,
      messageText: smsNotification.messageText,
      patient: smsNotification.patient,
      status: smsNotification.status,
      type: smsNotification.type,
    },
  });
}

async function addSmsNotificationEntry(messageText, reminderData, success = true) {
  try {
    return await createSmsNotification({
      messageText: messageText,
      type: SmsType.Reminder,
      patient: reminderData.patient.id,
      mobileNumber: reminderData.patient.username,
      status: success ? SmsStatus.Sent : SmsStatus.Failed,
    });
  } catch (e) {
    throw new Error(`Failed to update SMS, ${e.message}`);
  }
}

module.exports = { createSmsNotification, addSmsNotificationEntry };
