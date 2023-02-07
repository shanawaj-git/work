const { isAfterNow, addMinutesToDate, forbiddenError } = require("./auth-otp");
const { ForbiddenError } = require("@strapi/utils").errors;
const uaePhoneNumberRegExp = /^(00|\+)?9710?([\d]{9})$/;
const isBeforeNow = (date) => new Date(date).getTime() < new Date().getTime();
const isUAEPhoneNumber = (text) => uaePhoneNumberRegExp.test(text);

const extendAuthController = (callback) => async (ctx) => {
  let user;
  const {
    params: { provider = "local" },
    request: {
      body: { identifier: username, password },
    },
  } = ctx;
  const isPatientLogin = provider === "local" && isUAEPhoneNumber(username);
  if (isPatientLogin) {
    user = await getUser(provider, username);

    const validPassword = await validatePassword(password, user);
    if (!validPassword) {
      await strapi.plugins["users-permissions"].services.user.edit(user.id, {
        maxUnsuccessfulLoginCount: user.maxUnsuccessfulLoginCount + 1,
        lastUnsuccessfulLoginTime: new Date(),
      });
    }
    //checking password expiry
    await checkPasswordExpiry(validPassword, user);
    await hasExceededMaxLimit(user);
  }
  await callback(ctx);
  if (isPatientLogin) {
    await strapi.plugins["users-permissions"].services.user.edit(user.id, {
      password: Math.random().toString(36).slice(2, 12),
      maxUnsuccessfulLoginCount: 0,
    });
  }
};

async function getUser(provider, username) {
  return await strapi
    .query("plugin::users-permissions.user")
    .findOne({ where: { provider, username } });
}

const hasExceededMaxLimit = async (user) => {
  const maxLimitReached =
    user?.maxUnsuccessfulLoginCount &&
    user.maxUnsuccessfulLoginCount >=
      (process.env.MAX_UNSUCCESSFUL_LOGIN_COUNT || 5);

  const withinLockPeriod =
    user?.lastUnsuccessfulLoginTime &&
    isAfterNow(
      addMinutesToDate(
        process.env.REGENERATE_OTP_LOCK_INTERVAL_MINS || 30,
        user.lastUnsuccessfulLoginTime
      )
    );

  if (maxLimitReached && withinLockPeriod) {
    forbiddenError("Max attempt reached", "auth.error.otp.limit");
  }
};

const checkPasswordExpiry = async (validPassword, user) => {
  if (
    validPassword &&
    user?.passwordExpiresAt &&
    isBeforeNow(user.passwordExpiresAt)
  ) {
    forbiddenError("OTP Expired", "auth.otp.expired");
  }
};

async function validatePassword(password, user) {
  return await strapi.plugins[
    "users-permissions"
  ].services.user.validatePassword(password, user.password);
}

module.exports = { extendAuthController, checkPasswordExpiry };
