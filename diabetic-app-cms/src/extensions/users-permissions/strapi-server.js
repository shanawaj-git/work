const { createOrUpdateReminder, setNewReminder } = require("../../services/reminder/reminder-service");
const { sendOnboardingMessage } = require("../../services/onboarding/onboarding-service");
const {initCustomRoutes} = require("./routes/auth-otp");
const {extendAuthController} = require("./controllers/extendAuthController");
module.exports = (plugin) => {

    const create = plugin.controllers.contentmanageruser.create;
    plugin.controllers.contentmanageruser.create = async (ctx) => {
        await create(ctx);

        if(ctx.response?.status === 201) {
            const user = await strapi.query('plugin::users-permissions.user')
                .findOne({ where: { username:  ctx.request.body.username } });
            if(user.reminderFrequency)
            {
                strapi.log.info(`adding new reminder for user ${user.username}`);
                await setNewReminder(user);
                strapi.log.info(`sending onboarding message to user ${user.username}`);
                await sendOnboardingMessage(user);
            }
        }
    }

    const update = plugin.controllers.contentmanageruser.update;
    plugin.controllers.contentmanageruser.update = async (ctx) => {
        const {
            params: { id },
            body: { reminderFrequency: newReminderFrequency }
        } = ctx.request;

        const oldUserData = await strapi.query('plugin::users-permissions.user')
            .findOne({ where: { id } });
        const isReminderDaysUpdated = oldUserData &&
            oldUserData.reminderFrequency !== newReminderFrequency;

        await update(ctx);

        if(ctx.response?.status === 200 && isReminderDaysUpdated) {
            const user = await strapi.query('plugin::users-permissions.user')
                .findOne({ where: { id } });
            strapi.log.info(`updating existing reminder for user ${user.username}`);
            await createOrUpdateReminder(user) ;
        }
    }

    initCustomRoutes(plugin);
    const callback = plugin.controllers.auth.callback;
    plugin.controllers.auth.callback = extendAuthController(callback);

    return plugin;

}