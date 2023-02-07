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
  generateOtp,
} = require("../../../src/extensions/users-permissions/controllers/auth-otp");
jest.mock("../../../src/services/sms/sms-service");
const { sendSMS } = require("../../../src/services/sms/sms-service");
jest.mock("../../../src/services/message-templates/message-template-service");
const {
  getMessageText,
} = require("../../../src/services/message-templates/message-template-service");
const smsSentFailedMsg = "Message sending failed";
const {
  mockSuccessSmsResponse,
  mockFailureSmsResponse,
} = require("../../services/onboard/testdata");
const {checkPasswordExpiry} = require("../../../src/extensions/users-permissions/controllers/extendAuthController");
jest.setTimeout(20000);

describe("Auth OTP Controller", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });
  describe("auth otp", () => {
    let mockUser = {
      id: 16,
      maxUnsuccessfulLoginCount: 1,
      lastUnsuccessfulLoginTime: new Date(),
      passwordGeneratedAt: new Date(new Date() - 31 * 1000),
    };
    const mockContext = {
      request: {
        body: {
          mobileNumber: "971529029931",
        },
      },
    };
    let mockMessage = {
      otpSmsTemplate:
        "Dear customer, use this One Time Password 324533 to authenticate. This OTP will be valid for the next 5 mins.",
    };
    let mockFindOne, querySpy, editSpy;

    beforeEach(() => {
      mockFindOne = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockFindOne,
      });
      editSpy = jest.spyOn(
        strapi.plugins["users-permissions"].services.user,
        "edit"
      );
      mockContext.send = jest.fn();
    });

    afterEach(() => {
      mockFindOne = null;
      querySpy.mockRestore();
      editSpy.mockRestore();
      mockContext.send.mockRestore();
    });

    it("should generate new OTP when everything is valid", async () => {
      mockFindOne.mockReturnValue(mockUser);
      mockContext.send.mockReturnValue({ success: true });
      sendSMS.mockReturnValue(mockSuccessSmsResponse);

      await generateOtp(mockContext);

      expect(mockContext.send).toBeCalledWith({ success: true });
    });

    it("should pass the correct username to to fetch users", async () => {
      mockFindOne.mockReturnValue(mockUser);
      mockContext.send.mockReturnValue({ success: true });
      sendSMS.mockReturnValue(mockSuccessSmsResponse);

      await generateOtp(mockContext);

      expect(querySpy).toBeCalledWith("plugin::users-permissions.user");
      expect(mockFindOne).toBeCalledWith({
        where: { username: mockContext.request.body.mobileNumber },
      });
    });

    it("should generate OTP and pass the correct arguments to users 'edit' service", async () => {
      mockFindOne.mockReturnValue(mockUser);
      mockContext.send.mockReturnValue({ success: true });
      sendSMS.mockReturnValue(mockSuccessSmsResponse);

      await generateOtp(mockContext);

      const editCallInput = editSpy.mock.calls[0][1];
      const currentDate = new Date();

      expect(editCallInput.passwordExpiresAt.getTime()).toBeGreaterThan(
        currentDate.getTime()
      );
      expect(editCallInput.passwordExpiresAt.getTime()).toBeLessThanOrEqual(
        currentDate.getTime() + 5 * 60000
      );
    });

    it("should throw NotFoundError if user is not present ", async () => {
      const errorMsg = "User not found.";
      mockFindOne.mockReturnValue(null);
      await expect(generateOtp(mockContext)).rejects.toThrow(errorMsg);
    });

    it("should send success response to client when sms sending is success ", async () => {
      mockFindOne.mockReturnValue(mockUser);

      sendSMS.mockReturnValue(mockSuccessSmsResponse);
      getMessageText.mockReturnValue(mockMessage.otpSmsTemplate);

      await generateOtp(mockContext);
      expect(mockContext.send).toBeCalledWith({ success: true });
    });

    it("should send failure response to client when sms sending throws error ", async () => {
      mockFindOne.mockReturnValue(mockUser);

      sendSMS.mockReturnValue(mockFailureSmsResponse);
      getMessageText.mockReturnValue(mockMessage.otpSmsTemplate);

      await expect(generateOtp(mockContext)).rejects.toThrow(
        "Message sending failed"
      );
    });
    it("should send error response to client when sms sending throws error ", async () => {
      mockFindOne.mockReturnValue(mockUser);

      sendSMS.mockRejectedValue(new Error(smsSentFailedMsg));
      getMessageText.mockReturnValue(mockMessage.otpSmsTemplate);

      await expect(generateOtp(mockContext)).rejects.toThrow(smsSentFailedMsg);
    });
    it("should throw error if user tries to generate otp with 30 seconds", async () => {
      mockUser = {...mockUser, passwordGeneratedAt: new Date()}
      mockFindOne.mockReturnValue(mockUser);
      mockContext.send.mockReturnValue({success: true});
      sendSMS.mockReturnValue(mockSuccessSmsResponse);

      await expect(generateOtp(mockContext)).rejects.toThrow(
          "Wait 30 seconds to generate otp"
      );
    })
    it("should generate otp if user tries to generate otp after 30 seconds", async () => {
      mockUser = {...mockUser, passwordGeneratedAt: new Date(new Date().getTime() - 30 * 1000)}
      mockFindOne.mockReturnValue(mockUser);
      mockContext.send.mockReturnValue({success: true});
      sendSMS.mockReturnValue(mockSuccessSmsResponse);

      await generateOtp(mockContext);

      expect(mockContext.send).toBeCalledWith({success: true});
    })
  });
});
