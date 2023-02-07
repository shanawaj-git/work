const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");
jest.mock("@albathanext/anext-sms-sender");
let SMSSender = require("@albathanext/anext-sms-sender");

const { sendSMS } = require("../../../src/services/sms/sms-service");
const {
  getMessageText,
} = require("../../../src/services/message-templates/message-template-service");
const {setupStrapi, tearDown} = require("../../helpers/strapi");

const mockSmsProviderResponse = {
  message: "",
  trackingId: "40000343191413",
  success: true,
  status: "Queued",
};
const mockError =
  "Error: Error Code: SMSERR_053 , Error Message: Operator is not found";
jest.setTimeout(20000);

describe("sms-service.js", () => {

  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("sendSMS", () => {
    let mockSend, querySpy;
    beforeEach(() => {
      mockSend = jest.fn();
      querySpy = jest.spyOn(SMSSender, "default").mockReturnValue({
        sendSMS: mockSend,
      });
    });

    afterEach(() => {
      mockSend: null;
      querySpy.mockRestore();
    });
    it("should be able to send sms", async () => {
      mockSend.mockReturnValue(mockSmsProviderResponse);
      const receipent = "97154423895";
      const message = "Sending message lol";
      await sendSMS(receipent, message);
    });

    it("should give error exception", async () => {
      mockSend.mockImplementation(() => {
        throw new Error();
      });
      await expect(sendSMS(null, null)).rejects.toThrow(new Error());
    });
  });
});
