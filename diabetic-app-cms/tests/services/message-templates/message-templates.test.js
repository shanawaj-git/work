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
const MessageTemplate = require("../../../src/services/message-templates/MessageTemplate");
const {
  getMessageText,
} = require("../../../src/services/message-templates/message-template-service");

jest.setTimeout(20000);
describe("message-template.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("messageTemplate", () => {
    let mockFindOne, querySpy;

    const mockParams = {
      reminderDate: "2022-08-29",
      patientName: "Test",
      pharmacyName: "MPC Test",
      phoneNumber: "97152720914",
      patientId: "1",
      id: "2",
      reminderFrequency: "40",
      otp: "34256",
      otpValidityTime: "5",
      contactSupportNumber: "034562346",
    };

    const mockTemplateResponse = {
      onboardingSmsTemplate:
        "Hi {{patientName}}, Welcome to {{pharmacyName}}. You will receive reminders to refill your prescription as well as order updates right here. For any contact support, you can reach out to us through the 24/7 helpline at {{contactSupportNumber}}",

      reminderSMSTemplate:
        "Hello {{patientName}}! We’d like to remind you about your medicine refill on {{reminderDate}}. Please try to schedule an appointment with your doctor at the earliest.",

      otpSmsTemplate:
        "Dear customer, use this One Time Password {{otp}} to authenticate. This OTP will be valid for the next {{otpValidityTime}} mins.",
    };

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

    it("should create the return the reminder template", async () => {
      mockFindOne.mockReturnValue(mockTemplateResponse);
      const template = await getMessageText(
        MessageTemplate.REMINDER,
        mockParams
      );

      expect(querySpy).toBeCalledWith("api::app-config.app-config");
      expect(template).toContain(mockParams.patientName);
      expect(template).toContain(mockParams.reminderDate);
    });

    it("should return the otp template by replacing dynamic values", async () => {
      mockFindOne.mockReturnValue(mockTemplateResponse);
      const template = await getMessageText(MessageTemplate.OTP, mockParams);

      expect(querySpy).toBeCalledWith("api::app-config.app-config");
      expect(template).toContain(mockParams.otp);
      expect(template).toContain(mockParams.otpValidityTime);
    });

    it("should return the onboarding template by replacing dynamic values", async () => {
      mockFindOne.mockReturnValue(mockTemplateResponse);
      const template = await getMessageText(
        MessageTemplate.ONBOARDING,
        mockParams
      );
      expect(querySpy).toBeCalledWith("api::app-config.app-config");
      expect(template).toContain(mockParams.patientName);
      expect(template).toContain(mockParams.pharmacyName);
      expect(template).toContain(mockParams.contactSupportNumber);
    });

    it("should throw error template message if no templates found", async () => {
      mockFindOne.mockReturnValue(mockTemplateResponse);
      await expect(
        getMessageText("nonExistingTemplate", mockParams)
      ).rejects.toThrow(
        "Template is not defined for nonExistingTemplate in App Config"
      );
      expect(querySpy).toBeCalledWith("api::app-config.app-config");
    });
  });
});
