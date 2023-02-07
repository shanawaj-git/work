const ReminderStatus = require("./ReminderStatus");
const smsService = require("../sms/sms-service");
const messageTemplateService = require("../message-templates/message-template-service");
const MessageTemplate = require("../message-templates/MessageTemplate");
const smsNotificationService = require("../sms-notification/sms-notification");
const DAY_IN_MILLIS = 86400000;

const daysToMillis = (days) => days * DAY_IN_MILLIS;

const getReminderDate = (user, baseDate) => {
  return new Date(
    baseDate.getTime() + daysToMillis(user.reminderFrequency)
  ).toISOString();
};

const setNewReminder = async (user) => {
  await strapi.query("api::reminder.reminder").create({
    data: {
      status: ReminderStatus.Scheduled,
      date: getReminderDate(user, new Date()),
      patient: user.id,
    },
  });
};

const getActiveReminder = async (user) => {
  const reminder = await strapi.query("api::reminder.reminder").findOne({
    where: {
      patient: user.id,
      status: ReminderStatus.Scheduled,
    },
  });
  return reminder;
};

const createOrUpdateReminder = async (user) => {
  const reminder = await getActiveReminder(user);

    if(reminder) {
        const newReminder = {...reminder}
        newReminder.date = getReminderDate(user, new Date(reminder.createdAt));
        await strapi.query('api::reminder.reminder').update({
            where: { id: newReminder.id },
            data: newReminder
        });
    } else {
        await setNewReminder(user);
    }
};

const getScheduledRemindersForToday = async () => {
  var todayDate = new Date().toISOString().split("T")[0];
  return await strapi.query("api::reminder.reminder").findMany({
    where: {
      status: ReminderStatus.Scheduled,
      date: todayDate,
    },
    populate: {
      patient: true,
    },
  });
};

const updateReminderStatus = async (reminder, status) => {
  return await strapi.query("api::reminder.reminder").update({
    where: { id: reminder.id },
    data: {
      status,
    },
  });
};

const constructMessageParams = ({ patient: { firstName }, date }) => ({
  reminderDate: date,
  patientName: firstName,
});

async function sendReminder(reminder) {
  try {
    const messageText = await messageTemplateService.getMessageText(
      MessageTemplate.REMINDER,
      constructMessageParams(reminder)
    );

    strapi.log.info(`Sending reminder SMS for user ${reminder.patient.username}`);
    const isMessageDelievered = await sendMessage(reminder.patient.username, messageText);
    await updateReminderStatus(
        reminder,
        isMessageDelievered ? ReminderStatus.Sent : ReminderStatus.Failed
      );
    await smsNotificationService.addSmsNotificationEntry(messageText, reminder, isMessageDelievered);

    strapi.log.info(`Setting new reminder for user ${reminder.patient.username}`);
    await setNewReminder(reminder.patient);
  } catch (e) {
    throw new Error(`Sending reminder failed for the user ${reminder.patient.username}, ${e.message}`);
  }
}

async function sendMessage(mobileNumber, message) {
  try {
    const { success, message: errorMsg } = await smsService.sendSMS(
      mobileNumber,
      message
    );
    if(!success) {
        strapi.log.info(`Sending reminder sms to patient ${mobileNumber} has been failed: ${errorMsg}`);
    }
    return success;
  } catch (e) {
    strapi.log.info(`Exception while sending sms reminder to patient ${mobileNumber}`, e);
    return false;
  }
}

module.exports = {
  setNewReminder,
  createOrUpdateReminder,
  getActiveReminder,
  getReminderDate,
  sendMessage,
  getScheduledRemindersForToday,
  constructMessageParams,
  updateReminderStatus,
  sendReminder,
  setNewReminder,
};
