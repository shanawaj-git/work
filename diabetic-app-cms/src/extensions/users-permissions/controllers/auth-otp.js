const { NotFoundError, ApplicationError, ForbiddenError } =
  require("@strapi/utils").errors;

const {
  getMessageText,
} = require("../../../services/message-templates/message-template-service");
const messageTemplate = require("../../../services/message-templates/MessageTemplate");
const { sendSMS } = require("../../../services/sms/sms-service");
const initCustomControllers = (plugin) => {
  plugin.controllers.user.generateOtp = generateOtp;
};
const generateOtpInterval = process.env.REGENERATE_OTP_INTERVAL_SECONDS || 30;
const smsSentFailedMsg = "Message sending failed";
const isAfterNow = (date) => new Date(date).getTime() > new Date().getTime();
async function fetchUser(ctx) {
  const user = await strapi
    .query("plugin::users-permissions.user")
    .findOne({ where: { username: ctx.request.body.mobileNumber } });
  return user;
}

async function createNewOtp(user, otp) {
  await strapi.plugins["users-permissions"].services.user.edit(user.id, otp);
}

const isInWaitingPeriod = (user) => {
  return (
    user?.passwordGeneratedAt &&
    isAfterNow(addSecondsToDate(generateOtpInterval, user.passwordGeneratedAt))
  );
};

const generateOtp = async (ctx) => {
  const user = await fetchUser(ctx);
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  canUserGenerateOtp(user);
  const otpData = generateNewOtpData();
  //todo remove later
  console.log(otpData);
  await createNewOtp(user, otpData);
  try {
    const { success } = await sendOtpMessage(user, otpData);
    if (success) {
      ctx.send({ success: success });
    } else {
      throw new Error(smsSentFailedMsg);
    }
  } catch (ex) {
    throw new ApplicationError(ex.message);
  }
};
const forbiddenError = (message, errorCode) => {
  throw new ForbiddenError(message, {
    errorKey: errorCode,
  });
};
const canUserGenerateOtp = (user) => {
  if (isInWaitingPeriod(user)) {
    forbiddenError(
      `Wait ${generateOtpInterval} seconds to generate otp`,
      "auth.error.otp.wait"
    );
  }
};

const generateNewOtpData = () => ({
  password: Math.floor(100000 + Math.random() * 900000).toString(),
  passwordExpiresAt: addMinutesToCurrentDate(
    process.env.PASSWORD_EXPIRY_MINUTES || 5
  ),
  passwordGeneratedAt: new Date(),
});

const sendOtpMessage = async (user, otpData) => {
  const messageText = await getMessageText(messageTemplate.OTP, {
    otp: otpData.password,
    otpValidityTime: process.env.PASSWORD_EXPIRY_MINUTES || 5,
  });
  try {
    return await sendSMS(user.username, messageText);
  } catch {
    throw new Error(smsSentFailedMsg);
  }
};

function addMinutesToCurrentDate(minutes) {
  return new Date(new Date().getTime() + minutes * 60000);
}
function addMinutesToDate(minutes, date) {
  return new Date(new Date(date).getTime() + minutes * 60000);
}
function addSecondsToDate(seconds, date) {
  return new Date(new Date(date).getTime() + seconds * 1000);
}

module.exports = {
  initCustomControllers,
  generateOtp,
  isAfterNow,
  addMinutesToDate,
  forbiddenError,
};
