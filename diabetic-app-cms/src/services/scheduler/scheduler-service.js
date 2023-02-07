const reminderService = require("../reminder/reminder-service");

const sendScheduledRemainders = async () => {
  try {
    const reminders = await reminderService.getScheduledRemindersForToday();
    for (const reminder of reminders) {
      await reminderService.sendReminder(reminder);
    }
  } catch (e) {
    strapi.log.info('Sending scheduled reminders has been failed', e);
  }
};

module.exports = { sendScheduledRemainders };
