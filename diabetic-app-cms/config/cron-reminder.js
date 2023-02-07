const {
  sendScheduledRemainders,
} = require("../src/services/scheduler/scheduler-service");

module.exports = {
  medicineRefillReminder: {
    task: async () => {
      strapi.log.info('Starting the job for sending reminders.');
      await sendScheduledRemainders();
      strapi.log.info('Job for sending reminders finished');
    },
    options: {
      // runs at 9 a.m(Dubai) every day by default
      rule: process.env['REMINDER_CRON_EXPRESSION'] || '0 9 * * *',
      tz: 'Asia/Dubai',
    },
  },
};
