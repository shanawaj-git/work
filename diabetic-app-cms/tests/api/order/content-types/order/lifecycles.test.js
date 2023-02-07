const { setupStrapi, tearDown } = require("../../../../helpers/strapi");
const {
  mockBeforeUpdateLifeCycleEventData,
  mockAfterUpdateLifeCycleEventData,
} = require("../../../../../tests/api/order/controllers/orderTestData");
const {
  beforeUpdate,
  afterUpdate,
} = require("../../../../../src/api/order/content-types/order/lifecycles");
jest.mock("../../../../../src/services/sms/sms-service");
const { sendSMS } = require("../../../../../src/services/sms/sms-service");
jest.mock("../../../../../src/services/sms-notification/sms-notification");
const {
  createSmsNotification,
} = require("../../../../../src/services/sms-notification/sms-notification");
const {
  mockFailureSmsResponse,
  mockMessage,
  mockSuccessSmsResponse,
} = require("../../../../../tests/services/onboard/testdata");
const { expect } = require("@jest/globals");
const {
  mockAfterPaymentCompleteLifeCycleEvent,
  mockFetchOrderPaymentNotification,
  mockAppConfig,
  mockPaymentTemplateAppConfig,
  mockZeroCoPaymentLifeCycle,
} = require("../../controllers/orderTestData");
const emailService = require("../../../../../src/services/email/email-service");
const {
  mockZeroCoPaymentMessage,
} = require("../../../../services/onboard/testdata");
jest.setTimeout(20000);

describe("lifecyles.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("Orders Lifecycles", () => {
    let mockFindOne,
      querySpy,
      mockCreate,
      mockTemplateFindOne,
      mockSmsNotificationService,
      findOneOrderSpy,
      findOneAppConfigSpy,
      sendTemplateEmailSpy;

    const mockTemplateResponse = {
      paymentSmsTemplate:
        "Dear {{patientName}}, Your prescription is approved by the insurance, and the co-payment amount is {{currency}} {{amount}}. Please click the link for proceeding with the payment. {{paymentLink}}",
      zeroCoPaymentSmsTemplate:
        "Dear {{patientName}}, Your prescription is approved by the insurance, and the co-payment amount is {{currency}} {{amount}}. Please look out for the delivery driver",
    };

    const mockSmsNotification = {
      mobileNumber: "971527209148",
      type: "PaymentLink",
      status: "Sent",
      patient: 6,
    };

    beforeEach(() => {
      mockFindOne = jest.fn();
      mockTemplateFindOne = jest.fn();
      mockCreate = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockTemplateFindOne,
        create: mockCreate,
      });
      mockSmsNotificationService = jest.fn();
      findOneOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      findOneAppConfigSpy = jest
        .spyOn(strapi.query("api::app-config.app-config"), "findOne")
        .mockResolvedValue(mockPaymentTemplateAppConfig);
      sendTemplateEmailSpy = jest
        .spyOn(emailService, "sendTemplateEmail")
        .mockResolvedValue();
    });

    afterEach(() => {
      mockFindOne = null;
      mockCreate = null;
      mockTemplateFindOne = null;
      mockSmsNotificationService = null;
      querySpy.mockRestore();
      findOneAppConfigSpy.mockRestore();
      sendTemplateEmailSpy.mockRestore();
      findOneOrderSpy.mockRestore();
    });

    it("should validate if the amount is enter on insurance approved status change", async () => {
      const lifeCycleEvent = mockBeforeUpdateLifeCycleEventData;

      await expect(() => {
        beforeUpdate(lifeCycleEvent);
      }).toThrow("Please enter the amount");
    });

    it("should send generate and send the payment link after insurance is approved", async () => {
      const afterLifeCycleEvent = mockAfterUpdateLifeCycleEventData;
      const mockSmsNotification = {
        data: {
          mobileNumber: "971527209148",
          type: "PaymentLink",
          status: "Sent",
          patient: 6,
        },
      };
      createSmsNotification.mockReturnValue(mockSmsNotification);

      sendSMS.mockResolvedValue(mockSuccessSmsResponse);
      mockFindOne.mockReturnValue(mockMessage);
      mockTemplateFindOne.mockReturnValue(mockTemplateResponse);
      await afterUpdate(afterLifeCycleEvent);
      expect(querySpy).toBeCalledWith("api::app-config.app-config");

      expect(mockCreate).toBeDefined();
    });
    it("should send an alternate sms when the co-payment amount is 0", async () => {
      const zeroCoPaymentLifeCycleEvent = mockZeroCoPaymentLifeCycle;

      const mockSmsNotification = {
        data: {
          mobileNumber: "971527209148",
          type: "PaymentLink",
          status: "Sent",
          patient: 6,
        },
      };
      createSmsNotification.mockReturnValue(mockSmsNotification);
      sendSMS.mockResolvedValue(mockSuccessSmsResponse);
      mockFindOne.mockReturnValue(mockZeroCoPaymentMessage);
      mockTemplateFindOne.mockReturnValue(mockTemplateResponse);
      await afterUpdate(zeroCoPaymentLifeCycleEvent);

      expect(querySpy).toBeCalledWith("api::app-config.app-config");
      expect(mockCreate).toBeDefined();
    });
    it("saves the sms notification if the payment link SMS is not sent", async () => {
      const afterLifeCycleEvent = mockAfterUpdateLifeCycleEventData;
      const errMsg = "some error!";
      createSmsNotification.mockResolvedValue(new Error(errMsg));
      sendSMS.mockResolvedValue(mockFailureSmsResponse);
      mockFindOne.mockReturnValue(mockMessage);
      mockTemplateFindOne.mockReturnValue(mockTemplateResponse);
      await afterUpdate(afterLifeCycleEvent);

      expect(mockCreate).toBeDefined();
    });

    it("send the payment confirmation email once the payment is completed", async () => {
      const afterPaymentCompleteLifeCycleEvent =
        mockAfterPaymentCompleteLifeCycleEvent;
      const { id } = mockAfterPaymentCompleteLifeCycleEvent;
      const { status, payment, patient, amount, currency } =
        mockFetchOrderPaymentNotification;

      mockFindOne.mockResolvedValue(mockFetchOrderPaymentNotification);
      findOneOrderSpy.mockResolvedValue(mockFetchOrderPaymentNotification);
      sendTemplateEmailSpy.mockResolvedValue({
        subject: mockPaymentTemplateAppConfig.paymentReceivedEmailTemplate,
        text: mockPaymentTemplateAppConfig.paymentReceivedEmailTemplate,
        html: mockPaymentTemplateAppConfig.paymentReceivedEmailTemplate,
        params: { status, id, patient, payment, amount, currency },
        recipients: mockPaymentTemplateAppConfig.emailList.trim().split("\n"),
      });

      await afterUpdate(afterPaymentCompleteLifeCycleEvent);
    });

    it("fails to send the payment confirmation email if no recipients", async () => {
      const afterPaymentCompleteLifeCycleEvent =
        mockAfterPaymentCompleteLifeCycleEvent;

      mockFindOne.mockResolvedValue(mockFetchOrderPaymentNotification);
      findOneOrderSpy.mockResolvedValue(mockFetchOrderPaymentNotification);

      const mockErrorApiConfig = {
        emailList: null,
        paymentReceivedEmailTemplate: "test subject",
        paymentReceivedEmailTemplate: "test email template",
      };
      findOneAppConfigSpy.mockResolvedValue(mockErrorApiConfig);
      await afterUpdate(afterPaymentCompleteLifeCycleEvent);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("fails to send the payment confirmation email if no template configured", async () => {
      const afterPaymentCompleteLifeCycleEvent =
        mockAfterPaymentCompleteLifeCycleEvent;

      mockFindOne.mockResolvedValue(mockFetchOrderPaymentNotification);
      findOneOrderSpy.mockResolvedValue(mockFetchOrderPaymentNotification);

      const mockErrorApiConfig = {
        emailList: "1@example.com\n2@example.com",
        paymentReceivedEmailTemplate: null,
        paymentReceivedEmailTemplate: null,
      };
      findOneAppConfigSpy.mockResolvedValue(mockErrorApiConfig);
      await afterUpdate(afterPaymentCompleteLifeCycleEvent);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("fails to send the payment confirmation email if it fails to fetch email configuration", async () => {
      const afterPaymentCompleteLifeCycleEvent =
        mockAfterPaymentCompleteLifeCycleEvent;

      mockFindOne.mockResolvedValue(mockFetchOrderPaymentNotification);
      findOneOrderSpy.mockResolvedValue(mockFetchOrderPaymentNotification);
      const mockErrorApiConfig = {
        emailList: "1@example.com\n2@example.com",
        paymentReceivedEmailTemplate: "fwefew",
        paymentReceivedEmailTemplate: "ferwfwerf",
      };
      findOneAppConfigSpy.mockResolvedValue(mockErrorApiConfig);

      await expect(afterUpdate(afterPaymentCompleteLifeCycleEvent)).resolves;
    });
  });
});
