const {
  sendTemplateEmail,
} = require("../../../src/services/email/email-service");
const { setupStrapi, tearDown } = require("../../helpers/strapi");

jest.setTimeout(20000);

describe("email-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("sendTemplateEmail", () => {
    let sendTemplatedEmailSpy;
    beforeEach(() => {
      sendTemplatedEmailSpy = jest.spyOn(
        strapi.plugins.email.services.email,
        "sendTemplatedEmail"
      );
    });

    afterEach(() => {
      sendTemplatedEmailSpy.mockRestore();
    });

    it("should pass the arguments correctly to sendTemplatedEmail", async () => {
      const options = {
        recipients: ["1@example.com", "2@example.com"],
        subject: "test subject",
        text: "test email body",
        html: "test email body",
        params: {
          testKey1: "testKey1",
        },
      };
      sendTemplatedEmailSpy.mockResolvedValue();
      await sendTemplateEmail(options);
      expect(sendTemplatedEmailSpy).toBeCalledWith(
        {
          to: options.recipients,
        },
        {
          subject: options.subject,
          text: options.text,
          html: options.html,
        },
        options.params
      );
    });
  });
});
