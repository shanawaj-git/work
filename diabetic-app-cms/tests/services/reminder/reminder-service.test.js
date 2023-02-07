const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");

const smsService = require("../../../src/services/sms/sms-service");
const reminderService = require("../../../src/services/reminder/reminder-service");

const {
  setNewReminder,
  getReminderDate,
  getActiveReminder,
  createOrUpdateReminder,
  getScheduledRemindersForToday,
  constructMessageParams,
  updateReminderStatus,
  sendReminder,
} = require("../../../src/services/reminder/reminder-service");

const ReminderStatus = require("../../../src/services/reminder/ReminderStatus");
const { setupStrapi, tearDown } = require("../../helpers/strapi");
const messageTemplateService = require("../../../src/services/message-templates/message-template-service");
const smsNotificationService = require("../../../src/services/sms-notification/sms-notification");
const {
  getMessageText,
} = require("../../../src/services/message-templates/message-template-service");
const mockUser = {
  id: 1,
  username: "971529029932",
  email: "patient3@example.com",
  provider: "local",
  confirmed: true,
  blocked: false,
  createdAt: "2022-08-24T07:11:19.291Z",
  updatedAt: "2022-08-24T10:30:32.855Z",
  firstName: "PFname5",
  middleName: "PMName5",
  lastName: "PLName5",
  mobileNumber: "971529029932",
  emiratesId: "1984-2004-1112222-9",
  reminderFrequency: 90,
};

const mockReminder = {
  date: "2022-11-22",
  status: "Scheduled",
  createdAt: "2022-08-24T11:05:32.510Z",
  updatedAt: "2022-08-24T11:30:33.307Z",
};

const mockPatientsToBeReminder = [
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

const mockUpdatePatient = {
  id: 2,
  date: "2022-08-30",
  status: "Sent",
  createdAt: "2022-08-29T11:29:41.502Z",
  updatedAt: "2022-08-30T10:06:00.116Z",
};

const mockUpdateReminderData = {
  id: 18,
  mobileNumber: "971595959595",
  type: "Reminder",
  messageText:
    "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-30. Please try to schedule an appointment with your doctor at the earliest.",
  status: "Sent",
  createdAt: "2022-08-30T13:21:00.103Z",
  updatedAt: "2022-08-30T13:21:00.103Z",
};

const mockMessageTemplate =
  "Hello Jean! We’d like to remind you about your medicine refill on 2022-08-30. Please try to schedule an appointment with your doctor at the earliest.";

const reminder = {
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
};
jest.setTimeout(20000);
describe("reminder-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("setNewReminder()", () => {
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

    it("should invoke create query with correct arguments for the user", async () => {
      await setNewReminder(mockUser);
      expect(querySpy).toBeCalledWith("api::reminder.reminder");

      const [reminderDate] = getReminderDate(mockUser, new Date());

      expect(mockCreate).toBeCalledWith({
        data: {
          status: ReminderStatus.Scheduled,
          date: expect.stringMatching(reminderDate),
          patient: mockUser.id,
        },
      });
    });
  });

  describe("getActiveReminder()", () => {
    let mockFindOne, querySpy;

    beforeEach(() => {
      mockFindOne = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockFindOne,
      });
    });

    afterEach(() => {
      mockFindOne = null;
      querySpy.mockRestore();
    });

    it("should return active reminder for a patient ", async () => {
      await getActiveReminder(mockUser);
      expect(querySpy).toBeCalledWith("api::reminder.reminder");
      expect(mockFindOne).toBeCalledWith({
        where: {
          patient: mockUser.id,
          status: ReminderStatus.Scheduled,
        },
      });
    });
  });

  describe("getReminderDate()", () => {
    it(" should return reminder date by adding reminder frequency to date provided ", async () => {
      const reminderDate = getReminderDate(mockUser, new Date(2022, 7, 26));
      const expectedDate = new Date(2022, 10, 24).toISOString();
      expect(reminderDate).toMatch(expectedDate);
    });
  });

  describe("createOrUpdateReminder()", () => {
    let mockFindOne, querySpy, mockUpdate, mockCreate;

    beforeEach(() => {
      mockFindOne = jest.fn();
      mockUpdate = jest.fn();
      mockCreate = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockFindOne,
        update: mockUpdate,
        create: mockCreate,
      });
    });

    afterEach(() => {
      mockFindOne = null;
      mockUpdate = null;
      mockCreate = null;
      querySpy.mockRestore();
    });

    it("Should update an active reminder ", async () => {
      mockFindOne.mockResolvedValue(mockReminder);
      await createOrUpdateReminder(mockUser);
      const [reminderDate] = getReminderDate(
        mockUser,
        new Date(mockReminder.createdAt)
      );

      expect(mockUpdate).toBeCalledWith({
        where: { id: mockReminder.id },
        data: {
          ...mockReminder,
          date: expect.stringMatching(reminderDate),
        },
      });
    });

    it("Should create a new reminder if no active reminder present ", async () => {
      mockFindOne.mockResolvedValue(null);
      await createOrUpdateReminder(mockUser);
      const [reminderDate] = getReminderDate(
        mockUser,
        new Date(mockReminder.createdAt)
      );

      await expect(mockCreate).toBeCalled();
    });
  });

  describe("getScheduledRemindersForToday()", () => {
    let mockFindMany, querySpy;

    beforeEach(() => {
      mockFindMany = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findMany: mockFindMany,
      });
    });

    afterEach(() => {
      mockFindMany = null;
      querySpy.mockRestore();
    });
    it("Should fetch the patients to send reminders", async () => {
      mockFindMany.mockReturnValue(mockPatientsToBeReminder);
      const filteredReminderPatientData = await getScheduledRemindersForToday();
      expect(mockPatientsToBeReminder[0]["date"]).toBe(
        filteredReminderPatientData[0]["date"]
      );
      expect(filteredReminderPatientData[0]["patient"]["firstName"]).toBe(
        mockPatientsToBeReminder[0]["patient"]["firstName"]
      );
      expect(filteredReminderPatientData[0]["patient"]["username"]).toBe(
        mockPatientsToBeReminder[0]["patient"]["username"]
      );
    });
  });

  describe("updatePatientStatus", () => {
    let mockUpdatePatient, querySpy;

    beforeEach(() => {
      mockUpdatePatient = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        update: mockUpdatePatient,
      });
    });

    afterEach(() => {
      mockUpdatePatient = null;
      querySpy.mockRestore();
    });
    it("should update the Patient status after reminder is sent", async () => {
      await updateReminderStatus(mockPatientsToBeReminder, true);
      expect(querySpy).toBeCalledWith("api::reminder.reminder");
    });
  });

  describe("constructMessageParams()", () => {
    let mockConstructMessageParams;
    beforeEach(() => {
      mockConstructMessageParams = jest.spyOn(
        reminderService,
        "constructMessageParams"
      );
    });

    afterEach(() => {
      mockConstructMessageParams.mockRestore();
    });

    it("should construct the message params", async () => {
      const reminder = {
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
          password:
            "$2a$10$ym7VgXcypZ/iCyeksULzgeRPbjJlK6B/1gPz9NTJWLKpxYOn9YscC",
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
      };
      expect(constructMessageParams(reminder).reminderDate).toBe(reminder.date);
      expect(constructMessageParams(reminder).patientName).toBe(
        reminder.patient.firstName
      );
    });
  });

  describe("sendReminder", () => {
    let mockmessageText,
      mockConstructMessageParams,
      mockUpdateReminderStatus,
      mockSetNewReminder,
      mockSendMessage,
      mockSmsService,
      querySpy,
      mockCreate,
      mockUpdate,
      mockSmsNotification,
      findOneSpy;
    beforeEach(() => {
      mockmessageText = jest.spyOn(messageTemplateService, "getMessageText");
      mockSendMessage = jest.fn(reminderService, "sendMessage");
      mockUpdateReminderStatus = jest.spyOn(
        reminderService,
        "updateReminderStatus"
      );
      mockSetNewReminder = jest.spyOn(reminderService, "setNewReminder");
      mockCreate = jest.fn();
      mockUpdate = jest.fn();
      findOneSpy = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        create: mockCreate,
        update: mockUpdate,
        findOne: findOneSpy,
      });
      mockConstructMessageParams = jest.spyOn(
        reminderService,
        "constructMessageParams"
      );
      mockSmsService = jest.spyOn(smsService, "sendSMS");
      mockSmsNotification = jest.spyOn(
        smsNotificationService,
        "addSmsNotificationEntry"
      );
    });

    afterEach(() => {
      mockmessageText.mockRestore();
      mockConstructMessageParams.mockRestore();
      mockUpdateReminderStatus.mockRestore();
      mockSetNewReminder.mockRestore();
      mockSendMessage.mockRestore();
      mockSmsService.mockRestore();
      mockCreate = null;
      mockUpdate = null;
      querySpy.mockRestore();
    });

    it("should proceed with the smsSendReminder", async () => {
      const success = true;

      mockConstructMessageParams.mockResolvedValue(reminder);
      mockmessageText.mockResolvedValue(mockMessageTemplate);
      mockSmsService.mockResolvedValue({ success: true});
      mockCreate.mockResolvedValue(mockUpdateReminderData);
      mockUpdate.mockResolvedValue(mockUpdatePatient);
      await sendReminder(reminder);
      expect(querySpy).toBeCalledWith("api::reminder.reminder");
      expect(mockUpdate).toBeCalledWith({
        where: { id: reminder.id },
        data: {
          status: ReminderStatus.Sent,
        },
      });
    });

    it("should set failed status on failure while sending reminder sms", async () => {

      mockConstructMessageParams.mockResolvedValue(reminder);
      mockmessageText.mockResolvedValue(mockMessageTemplate);
      mockSmsService.mockResolvedValue({ success: false});
      mockCreate.mockResolvedValue(mockUpdateReminderData);
      mockUpdate.mockResolvedValue(mockUpdatePatient);
      await sendReminder(reminder);
      expect(querySpy).toBeCalledWith("api::reminder.reminder");
      expect(mockUpdate).toBeCalledWith({
        where: { id: reminder.id },
        data: {
          status: ReminderStatus.Failed,
        },
      });
    });


    it("should throw Reminder Operation on Error", async () => {
      const errorMsg = 'Some error';
      findOneSpy.mockRejectedValue(new Error(errorMsg));
      await expect(sendReminder(reminder)).rejects.toThrow(
        `Sending reminder failed for the user 971527209148, ${errorMsg}`
      );
    });
  });

  describe("sendMessage()", () => {
    let mockSmsService;

    beforeEach(() => {
      mockSmsService = jest.spyOn(smsService, "sendSMS");
    });

    afterEach(() => {
      mockSmsService.mockRestore();
    });

    it("should return false if send operation status is failed", async () => {
      mockSmsService.mockResolvedValue({ success: false });
      const isSuccess = await reminderService.sendMessage(
        null,
        null
      );
      expect(isSuccess).toBe(false);
    });

    it("should return false in case of exception while send sms", async () => {
      mockSmsService.mockRejectedValue(new Error('Some error'));
      const isSuccess = await reminderService.sendMessage(
        null,
        null
      );
      expect(isSuccess).toBe(false);
    });
  });
});
