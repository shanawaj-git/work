const SMSSender = require("@albathanext/anext-sms-sender");
const sendSMS = async (recipient, message) => {
  try {
    return await new SMSSender.default({
      appSid: `${process.env.SMS_APP_SID}`,
      senderId: `${process.env.SMS_SENDER_ID}`,
      environment: `${process.env.SMS_ENV}`,
    }).sendSMS({
      recipient: recipient,
      text: message,
    });
  } catch (ex) {
    strapi.log.info(`Sending SMS to ${recipient} failed: ${ex.message}`)
    throw new Error(ex.message);
  }
};

module.exports = { sendSMS };
