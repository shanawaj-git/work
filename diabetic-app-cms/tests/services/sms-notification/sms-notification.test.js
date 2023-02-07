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
const smsNotificationService = require("../../../src/services/sms-notification/sms-notification");
const SmsStatus = require("../../../src/services/sms-notification/SmsStatus");
const {createSmsNotification} = require("../../../src/services/sms-notification/sms-notification");
jest.setTimeout(20000);

const mockUpdateReminderData = {
  id: 3,
  date: "2022-08-31",
  status: "Scheduled",
  createdAt: "2022-08-30T16:10:07.754Z",
  updatedAt: "2022-08-31T20:50:05.669Z",
  patient: {
    id: 2,
    username: "971527209148",
    email: "accounts@albathanext.io",
    provider: "local",
    password: "$2a$10$.eFLRImdDCCgEO624pCsbOdN20BA8WtN.MYyZeamlJjnkC1HhR9AW",
    resetPasswordToken: null,
    confirmationToken: null,
    confirmed: true,
    blocked: false,
    createdAt: "2022-08-30T16:10:07.681Z",
    updatedAt: "2022-08-30T16:10:07.681Z",
    passwordExpiresAt: "2022-10-12T20:00:00.000Z",
    firstName: "Jean",
    middleName: null,
    lastName: null,
    mobileNumber: "971527209148",
    emiratesId: "78419987986785",
    reminderFrequency: 90,
  },
};

const mockSmsNotification = {
  mobileNumber: "9999008900",
  messageText: "hi",
  patient: 1,
  status: "Failed",
  type: "Onboard",
};
describe("sms-notification.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("createSmsNotification", () => {
    let mockCreate, querySpy;

    beforeEach(() => {
      mockCreate = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        create: mockCreate,
      });
    });

    afterEach(() => {
      mockCreate = null;
      querySpy.mockRestore();
    });

    it("should create sms notification ", async () => {
      await createSmsNotification(mockSmsNotification);
      expect(querySpy).toBeCalledWith("api::sms-notification.sms-notification");
      expect(mockCreate).toBeCalledWith({
        data: {
          ...mockSmsNotification,
        },
      });
    });
  });

  describe("addSmsNotificationEntry()", () => {
    let mockCreate, querySpy;
    beforeEach(() => {
      mockCreate = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        create: mockCreate,
      });
    });

    afterEach(() => {
      mockCreate = null;
      querySpy.mockRestore();
    });

    it("should create the sms notification entity", async () => {
      const message =
        "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-31. Please try to schedule an appointment with your doctor at the earliest.";
      mockCreate.mockReturnValue(mockUpdateReminderData);
      await smsNotificationService.addSmsNotificationEntry(
        message,
        mockUpdateReminderData
      );
      expect(querySpy).toBeCalledWith("api::sms-notification.sms-notification");
      expect(mockCreate).toBeDefined();
      expect(mockCreate).toBeCalledWith({
        data: {
          messageText:
            "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-31. Please try to schedule an appointment with your doctor at the earliest.",
          mobileNumber: "971527209148",
          patient: 2,
          status: "Sent",
          type: "Reminder",
        },
      });
    });

    it("should create the sms notification entity with failed status", async () => {
      const message =
        "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-31. Please try to schedule an appointment with your doctor at the earliest.";
      mockCreate.mockReturnValue(mockUpdateReminderData);
      await smsNotificationService.addSmsNotificationEntry(
        message,
        mockUpdateReminderData,
        false
      );
      expect(querySpy).toBeCalledWith("api::sms-notification.sms-notification");
      expect(mockCreate).toBeDefined();
      expect(mockCreate).toBeCalledWith({
        data: {
          messageText:
            "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-31. Please try to schedule an appointment with your doctor at the earliest.",
          mobileNumber: "971527209148",
          patient: 2,
          status: SmsStatus.Failed,
          type: "Reminder",
        },
      });
    });

    it("should throw on error while creating the entity", async () => {
      const message =
        "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-31. Please try to schedule an appointment with your doctor at the earliest.";
      const errMsg = 'some error!';
      mockCreate.mockRejectedValue(new Error(errMsg));
      await expect(smsNotificationService.addSmsNotificationEntry(
          message,
          mockUpdateReminderData
      )).rejects.toThrow(`Failed to update SMS, ${errMsg}`);
    });
  });
});
