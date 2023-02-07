const { ValidationError } = require('@strapi/utils').errors;

const uaePhoneNumberRegExp = /^(00|\+)?9710?([\d]{9})$/;

const isBeforeNow = date => new Date(date).getTime() < new Date().getTime();
const isUAEPhoneNumber = text => uaePhoneNumberRegExp.test(text);

module.exports = (plugin) => {
    const callback = plugin.controllers.auth.callback;
    plugin.controllers.auth.callback = async (ctx) => {
      const {
        params: { provider = 'local' },
        request: { body: { identifier : username, password } }
      } = ctx;

      if (provider === 'local' && isUAEPhoneNumber(username)) {
        // console.log("UAE Phone Number Login");
        const user = await strapi.query('plugin::users-permissions.user')
            .findOne({ where: { provider, username } });

        const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
                password,
                user.password
              );

        //checking password expiry
        if (validPassword && user?.passwordExpiry && isBeforeNow(user.passwordExpiry)) {
            //console.log("OTP Expired");
            throw new ValidationError('OTP Expired');
        }
      }
      await callback(ctx);
    };
    return plugin;
  };
