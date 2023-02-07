const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");
const { ValidationError } = require("@strapi/utils").errors;
const { setupStrapi, tearDown } = require("../../helpers/strapi");
jest.setTimeout(20000);
const {
  extendAuthController,
  checkPasswordExpiry,
} = require("../../../src/extensions/users-permissions/controllers/extendAuthController");
const { mockUser, mockSuccessSmsResponse} = require("../../services/onboard/testdata");
const {sendSMS} = require("../../../src/services/sms/sms-service");
const {generateOtp} = require("../../../src/extensions/users-permissions/controllers/auth-otp");
describe("Extend Authorization", () => {
  const mockContext = {
    params: "local",
    request: {
      body: { identifier: "971529029931", password: "333089" },
    },
  };

  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("extendAuthController", () => {
    let mockFindOne, querySpy, mockCallback, mockEdit, mockValidatePassword;

    beforeEach(() => {
      mockFindOne = jest.fn();
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        findOne: mockFindOne,
      });
      mockValidatePassword = jest.spyOn(
        strapi.plugins["users-permissions"].services.user,
        "validatePassword"
      );

      mockEdit = jest.spyOn(
        strapi.plugins["users-permissions"].services.user,
        "edit"
      );

      mockCallback = jest.fn();
    });

    afterEach(() => {
      mockFindOne = null;
      mockCallback.mockRestore();
      querySpy.mockRestore();
      mockValidatePassword.mockRestore();
    });

    it("should not update password after unsuccessful login", async () => {
      const errorMessage = "Invalid identifier or password";

      mockFindOne.mockReturnValue(mockUser);
      mockValidatePassword.mockReturnValue(false);
      mockCallback.mockRejectedValue(new ValidationError(errorMessage));

      const extendedCallback = extendAuthController(mockCallback);
      await expect(extendedCallback(mockContext)).rejects.toThrow(
        `${errorMessage}`
      );
    });

    it("should update password after successful login ", async () => {
      mockFindOne.mockReturnValue(mockUser);
      mockValidatePassword.mockReturnValue(true);

      const extendedCallback = extendAuthController(mockCallback);
      await extendedCallback(mockContext);

      expect(mockEdit).toBeCalledWith(mockUser.id, {
        password: expect.stringMatching(/^[a-z0-9A-Z]{10}$/),
        maxUnsuccessfulLoginCount: 0,
      });
    });

    it("should throw error if password is expired", async () => {
      const mockUserCopy = {
        ...mockUser,
        passwordExpiresAt: new Date(new Date().getTime() - 1 * 60000),
      };
      await expect(checkPasswordExpiry(true, mockUserCopy)).rejects.toThrow(
        "OTP Expired"
      );
    });
    it("should throw error if max unsuccessfully login attempt is equals to or greater then 5", async () => {

      const mockUserCopy = {...mockUser, maxUnsuccessfulLoginCount: 5,lastUnsuccessfulLoginTime:new Date()}
      mockFindOne.mockReturnValue(mockUserCopy);
      mockValidatePassword.mockReturnValue(true);

      const extendedCallback = extendAuthController(mockCallback);
      await expect(extendedCallback(mockContext)).rejects.toThrow(
          "Max attempt reached"
      );
    });
    it("should not throw error after max lock interval even if max unsuccessfully login attempt is reached", async () => {

      process.env.REGENERATE_OTP_LOCK_INTERVAL_MINS = 30;
      const mockUserCopy = {...mockUser, maxUnsuccessfulLoginCount: 5,lastUnsuccessfulLoginTime:new Date(new Date()-30*60000)}
      mockFindOne.mockReturnValue(mockUserCopy);
      mockValidatePassword.mockReturnValue(true);

      const extendedCallback = extendAuthController(mockCallback);
      await extendedCallback(mockContext);

      expect(mockEdit).toBeCalledWith(mockUser.id, {
        password: expect.stringMatching(/^[a-z0-9A-Z]{10}$/),
        maxUnsuccessfulLoginCount: 0,
      });
    });

  });
});
