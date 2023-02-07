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
const paymentProviderService = require("../../../src/services/payment-provider/payment-provider-service");
const {
  initializePayment,
  updatePaymentDetails,
} = require("../../../src/api/payment/controllers/payment");
const {
  mockOrderWithOutPayment,
  mockOrderWithPayment,
  mockCtx,
  mockPayment,
  mockPaymentDetails,
  mockUpdatePaymentDetailsCtx,
} = require("./testdata");
const {
  mapPaymentStatus,
} = require("../../../src/services/payment-provider/payment-provider-service");
const PaymentStatus = require("../../../src/api/payment/services/PaymentStatus");
const OrderStatus = require("../../../src/api/order/services/OrderStatus");

jest.setTimeout(20000);

describe("payment-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("initializePayment", () => {
    let findOneOrderSpy,
      createPaymentSpy,
      providerInitializePaymentSpy,
      providerPaymentIntentSpy;

    beforeEach(() => {
      findOneOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      createPaymentSpy = jest.spyOn(strapi.entityService, "create");
      providerInitializePaymentSpy = jest.spyOn(
        paymentProviderService,
        "initializePayment"
      );
      providerPaymentIntentSpy = jest.spyOn(
        paymentProviderService,
        "fetchPaymentDetails"
      );
    });
    afterEach(() => {
      findOneOrderSpy.mockRestore();
      createPaymentSpy.mockRestore();
      providerPaymentIntentSpy.mockRestore();
      providerInitializePaymentSpy.mockRestore();
    });

    it("should create payment if payment is not preset against an order ", async () => {
      findOneOrderSpy.mockResolvedValue(mockOrderWithOutPayment);
      providerInitializePaymentSpy.mockResolvedValue(mockPayment);
      createPaymentSpy.mockResolvedValue(mockPayment);
      await initializePayment(mockCtx);
      expect(createPaymentSpy).toBeCalledWith("api::payment.payment", {
        data: {
          currency: mockOrderWithOutPayment.currency,
          providerPaymentId: mockPayment.id,
          providerMetadata: mockPayment,
          amount: mockOrderWithOutPayment.amount,
          status: mapPaymentStatus(mockPayment.status),
          correlationId: mockOrderWithOutPayment.patient.id.toString(),
          order: mockOrderWithOutPayment.id,
          patient: mockOrderWithOutPayment.patient.id,
          history: [
            {
              type: mapPaymentStatus(mockPayment.status),
              timeStamp: expect.stringMatching(
                `\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z`
              ),
              metadata: mockPayment,
            },
          ],
        },
        populate: { order: true, patient: true, history: true },
      });
    });

    it("should initialize payment if payment is not preset against an order ", async () => {
      findOneOrderSpy.mockResolvedValue(mockOrderWithOutPayment);
      createPaymentSpy.mockResolvedValue(mockPayment);
      providerInitializePaymentSpy.mockResolvedValue(mockPaymentDetails);
      await initializePayment(mockCtx);
      expect(providerInitializePaymentSpy).toBeCalledWith(
        mockOrderWithOutPayment
      );
    });

    it("should not create a payment if payment is already initialized against an order", async () => {
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      providerInitializePaymentSpy.mockResolvedValue(mockPayment);
      createPaymentSpy.mockResolvedValue(mockPayment);
      await initializePayment(mockCtx);
      expect(createPaymentSpy).not.toBeCalledWith();
    });

    it("should throw error if order status is not valid", async () => {
      findOneOrderSpy.mockResolvedValue({
        ...mockOrderWithPayment,
        status: OrderStatus.Pending,
      });
      const errorMsg = "Invalid order status for payment initialization";
      await expect(initializePayment(mockCtx)).rejects.toThrow(errorMsg);
    });
  });
});
