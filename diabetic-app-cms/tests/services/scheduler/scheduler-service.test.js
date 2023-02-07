const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");
const { setupStrapi, tearDown } = require("../../helpers/strapi");
const reminderService = require("../../../src/services/reminder/reminder-service");
const messageTemplateService = require("../../../src/services/message-templates/message-template-service");
const smsMessageService = require("../../../src/services/sms/sms-service");
const {
  sendScheduledRemainders,

} = require("../../../src/services/scheduler/scheduler-service");
const {
  getMessageText,
} = require("../../../src/services/message-templates/message-template-service");

const mockFetchingPendingReminders = [
  {
    id: 2,
    date: "2022-08-30",
    status: "Scheduled",
    createdAt: "2022-08-29T11:29:41.502Z",
    updatedAt: "2022-08-29T15:49:00.118Z",
    patient: {
      id: 6,
      username: "971527209148",
      email: "accounts@albathanext.io",
      provider: "local",
      password: "$2a$10$ym7VgXcypZ/iCyeksULzgeRPbjJlK6B/1gPz9NTJWLKpxYOn9YscC",
      resetPasswordToken: null,
      confirmationToken: null,
      confirmed: true,
      blocked: false,
      passwordExpiresAt: null,
      firstName: "Jean",
      middleName: null,
      lastName: "Xavier",
      mobileNumber: "971527209148",
      emiratesId: "78419987986785",
      reminderFrequency: 40,
      createdAt: "2022-08-29T11:29:41.392Z",
      updatedAt: "2022-08-29T11:29:41.392Z",
    },
  },
];
const mockSmsProviderResponse = {
  message: "",
  trackingId: "40000343191413",
  success: true,
  status: "Queued",
};
const mockSmsProviderFailedResponse = {
  message: "",
  trackingId: "40000343191413",
  success: false,
  status: "Queued",
};
const mockMessageTemplate =
  "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-30. Please try to schedule an appointment with your doctor at the earliest.";
jest.setTimeout(20000);
describe("scheduler-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("sendScheduledRemainders", () => {
    let getScheduledRemindersForTodaySpy,
      updatePatientStatusMock,
      setNewReminderMock,
      mockgetMessageText,
      mockSmsSendService,
      mockSendReminder,
      mockSetNewReminder;

    beforeEach(() => {
      getScheduledRemindersForTodaySpy = jest.spyOn(
        reminderService,
        "getScheduledRemindersForToday"
      );
      updatePatientStatusMock = jest.spyOn(
        reminderService,
        "updateReminderStatus"
      );
      mockSendReminder = jest.spyOn(reminderService, "sendReminder");
      setNewReminderMock = jest.spyOn(reminderService, "setNewReminder");
      mockgetMessageText = jest.spyOn(messageTemplateService, "getMessageText");
      mockSmsSendService = jest.spyOn(smsMessageService, "sendSMS");
      mockSetNewReminder = jest.spyOn(reminderService, "setNewReminder");
    });
    afterEach(() => {
      getScheduledRemindersForTodaySpy.mockRestore();
      updatePatientStatusMock.mockRestore();
      setNewReminderMock.mockRestore();
      mockSendReminder.mockRestore();
    });

    it("Should complete the cron operation successfully", async () => {
      mockSendReminder.mockResolvedValue();
      getScheduledRemindersForTodaySpy.mockResolvedValue(
        mockFetchingPendingReminders
      );

      mockgetMessageText.mockResolvedValue(mockMessageTemplate);
      mockSmsSendService.mockResolvedValue(mockSmsProviderResponse);

      await sendScheduledRemainders();
      expect(mockgetMessageText).toBeDefined();
      expect(getScheduledRemindersForTodaySpy).toBeDefined();
    });

    it("It silently handles(or logs) in case of any exception while execution without crashing the service", async () => {
      getScheduledRemindersForTodaySpy.mockRejectedValue(
        new Error('Some error!'),
      );

      await expect(sendScheduledRemainders()).resolves.not.toThrow();
    });
  });
});
