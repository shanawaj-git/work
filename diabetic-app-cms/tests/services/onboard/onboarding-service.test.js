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
const {
  getPharmacyDetails,
  sendOnboardingMessage,
} = require("../../../src/services/onboarding/onboarding-service");
const SmsType = require("../../../src/services/sms-notification/SmsType");
jest.mock("../../../src/services/sms/sms-service");
const { sendSMS } = require("../../../src/services/sms/sms-service");
const SmsStatus = require("../../../src/services/sms-notification/SmsStatus");
const {
  mockUser,
  mockMessage,
  mockSuccessSmsResponse,
  mockFailureSmsResponse,
  mockActualMessage,
} = require("./testdata");

jest.setTimeout(20000);

describe("reminder-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("getPharmacyDetails()", () => {
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

    it("should fetch pharmacy details", async () => {
      await getPharmacyDetails();
      expect(querySpy).toBeCalledWith("api::pharmacy.pharmacy");
      expect(mockFindOne).toBeCalled();
    });
  });
  describe("sendOnboardingMessage()", () => {
    let mockFindOne, querySpy, mockCreate;

    beforeEach(() => {
      mockFindOne = jest.fn();
      mockCreate = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockFindOne,
        create: mockCreate,
      });
    });

    afterEach(() => {
      mockFindOne = null;
      mockCreate = null;
      querySpy.mockRestore();
    });

    it("should create a success record in sms notification table if onboard message sending pass", async () => {
      mockFindOne.mockReturnValue(mockMessage);
      sendSMS.mockReturnValue(mockSuccessSmsResponse);
      await sendOnboardingMessage(mockUser);

      expect(querySpy).toBeCalledWith("api::sms-notification.sms-notification");
      expect(mockCreate).toBeCalledWith({
        data: {
          mobileNumber: mockUser.mobileNumber,
          messageText: mockActualMessage,
          patient: mockUser.id,
          status: SmsStatus.Sent,
          type: SmsType.Onboard,
        },
      });
    });

    it("should create a failure record in sms notification table if onboard message sending fails", async () => {
      sendSMS.mockReturnValue(mockFailureSmsResponse);
      mockFindOne.mockReturnValue(mockMessage);

      await sendOnboardingMessage(mockUser);

      expect(querySpy).toBeCalledWith("api::sms-notification.sms-notification");

      expect(mockCreate).toBeCalledWith({
        data: {
          mobileNumber: mockUser.mobileNumber,
          messageText: mockActualMessage,
          patient: mockUser.id,
          status: SmsStatus.Failed,
          type: SmsType.Onboard,
        },
      });
    });

    it("should create a failure record in sms notification table when exception is thrown from sendSMS ", async () => {
      sendSMS.mockRejectedValue(new Error("Some Error"));
      mockFindOne.mockReturnValue(mockMessage);

      await sendOnboardingMessage(mockUser);

      expect(mockCreate).toBeCalledWith({
        data: {
          mobileNumber: mockUser.mobileNumber,
          messageText: mockActualMessage,
          patient: mockUser.id,
          status: SmsStatus.Failed,
          type: SmsType.Onboard,
        },
      });
    });
  });
});
