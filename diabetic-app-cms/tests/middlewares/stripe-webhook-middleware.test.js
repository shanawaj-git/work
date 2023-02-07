const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");

const paymentConstructEventSpy = jest.fn();
const paymentIntentCreateSpy = jest.fn();
const paymentMethodRetrieveSpy = jest.fn();
const paymentIntentRetrieveSpy = jest.fn();

jest.doMock("stripe", () => () => ({
  webhooks: {
    constructEvent: paymentConstructEventSpy,
  },
  paymentIntents: {
    create: paymentIntentCreateSpy,
    retrieve: paymentIntentRetrieveSpy,
  },
  paymentMethods: {
    retrieve: paymentMethodRetrieveSpy,
  },
}));

const { setupStrapi, tearDown } = require("../helpers/strapi");

const {
  paymentProviderWebhookHandler,
} = require("../../src/middlewares/stripe-webhook-middleware");
const {
  mockPaymentIntentContext,
  mockPaymentIntentEvent,
  mockOrder,
  mockPaymentEntity,
  mockPaymentMethod,
  mockPaymentIntentSuccessEvent,
  providerPaymentDetails, mockPaymentIntentfailedContext, mockPaymentIntentFailedContext, mockPaymentIntentFailedEvent,
  providerPaymentFailedDetails,
} = require("./webhook.testdata");
const paymentProviderService = require("../../src/services/payment-provider/payment-provider-service");
const PaymentEventSource = require("../../src/api/payment/services/PaymentEventSource");
const { ForbiddenError } = require("@strapi/utils").errors;

jest.setTimeout(20000);

describe("stripe-webhook-middleware.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
    jest.restoreAllMocks();
  });

  describe("stripe web-hook", () => {
    let mockFindMany, findOneOrderSpy, updateOrderSpy, updatePaymentSpy;

    beforeEach(() => {
      findOneOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      mockFindMany = jest.spyOn(strapi.entityService, "findMany");
      updateOrderSpy = jest.spyOn(
        strapi.db.query("api::order.order"),
        "update"
      );
      updatePaymentSpy = jest.spyOn(
        strapi.services["api::order.order"],
        "updatePayment"
      );
    });

    afterEach(() => {
      mockFindMany.mockRestore();
      findOneOrderSpy.mockRestore();
      updateOrderSpy.mockRestore();
      updatePaymentSpy.mockRestore();
      paymentConstructEventSpy.mockClear();
      paymentIntentCreateSpy.mockClear();
      paymentMethodRetrieveSpy.mockClear();
      paymentIntentRetrieveSpy.mockClear();
    });

    it("should consume payment_intent.created event and update the payment entity", async () => {
      paymentConstructEventSpy.mockResolvedValue(mockPaymentIntentSuccessEvent);
      paymentMethodRetrieveSpy.mockResolvedValue(mockPaymentMethod);
      mockFindMany.mockResolvedValue([mockPaymentEntity]);
      findOneOrderSpy.mockResolvedValue(mockOrder);
      updatePaymentSpy.mockResolvedValue({});
      await paymentProviderWebhookHandler(mockPaymentIntentContext);
      expect(updatePaymentSpy).toBeCalledWith(
        mockPaymentEntity.order.id,
        providerPaymentDetails,
        PaymentEventSource.Application
      );
    });

    it("should throw error if authentication fails", async () => {
      const errorMsg = "Authentication failed";
      paymentConstructEventSpy.mockRejectedValue(
        new ForbiddenError("Authentication failed")
      );
      mockFindMany.mockReturnValue([mockPaymentEntity]);
      findOneOrderSpy.mockReturnValue(mockOrder);
      updatePaymentSpy.mockReturnValue({});
      await expect(
        paymentProviderWebhookHandler(mockPaymentIntentContext)
      ).rejects.toThrow(errorMsg);
    });

    it("should consume payment_intent.payment_failed event and update the payment entity", async () => {
      paymentConstructEventSpy.mockResolvedValue(mockPaymentIntentFailedEvent);
      paymentMethodRetrieveSpy.mockResolvedValue(mockPaymentMethod);
      mockFindMany.mockResolvedValue([mockPaymentEntity]);
      findOneOrderSpy.mockResolvedValue(mockOrder);
      updatePaymentSpy.mockResolvedValue({});
      await paymentProviderWebhookHandler(mockPaymentIntentFailedContext);
      expect(updatePaymentSpy).toBeCalledWith(
        mockOrder.id,
        providerPaymentFailedDetails,
        PaymentEventSource.Application
      );
    });
  });
});
