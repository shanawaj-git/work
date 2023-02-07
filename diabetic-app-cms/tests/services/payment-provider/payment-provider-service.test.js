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
const paymentIntentCreateSpy = jest.fn();
const paymentIntentRetrieveSpy = jest.fn();
const paymentMethodRetrieveSpy = jest.fn();
jest.doMock("stripe", () => () => ({
  paymentIntents: {
    create: paymentIntentCreateSpy,
    retrieve: paymentIntentRetrieveSpy,
  },
  paymentMethods:{
    retrieve:paymentMethodRetrieveSpy,
  }
}));
const {
  initializePayment,
  mapPaymentStatus, fetchPaymentDetails,
} = require("../../../src/services/payment-provider/payment-provider-service");
const {
  mockOrderWithOutPayment,
  mockPayment,
  mockPaymentMethod,
  mockPaymentIntent,
  mockPaymentMethodWithWallet,
} = require("../../api/payment/testdata");
const PaymentStatus = require("../../../src/api/payment/services/PaymentStatus");
jest.setTimeout(20000);

describe("payment-service.js", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("payment-provider-service.js", () => {
    beforeEach(() => {});

    afterEach(() => {
      paymentIntentCreateSpy.mockClear();
      paymentIntentRetrieveSpy.mockClear();
      paymentMethodRetrieveSpy.mockClear();
    });

    it("should initialize payment with the provider ", async () => {
      paymentIntentCreateSpy.mockResolvedValue(mockPayment);
      await initializePayment(mockOrderWithOutPayment);
      expect(paymentIntentCreateSpy).toBeCalledWith({
        amount: mockOrderWithOutPayment.amount*100,
        currency: mockOrderWithOutPayment.currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          orderId: mockOrderWithOutPayment.id,
          patientId: mockOrderWithOutPayment.patient.id,
          prescriptionId: mockOrderWithOutPayment.prescription.id,
        },
      });
    });

    it("Should map payment provider status to application status", async () => {
      expect(mapPaymentStatus(mockPayment.status)).toBe(
        PaymentStatus.PaymentMethodRequired
      );
    });

    it("Should return status as Unknown if not mapped", async () => {
      mockPayment.status = "Random Status";
      expect(mapPaymentStatus(mockPayment.status)).toBe("Unknown");
    });

    it("should retrieve latest payment intent and payment method details and update the application", async () => {
      paymentIntentRetrieveSpy.mockResolvedValue(mockPaymentIntent);
      paymentMethodRetrieveSpy.mockResolvedValue(mockPaymentMethod);
      await fetchPaymentDetails("1");
      expect(paymentIntentRetrieveSpy).toBeCalledWith(String(1));
      expect(paymentMethodRetrieveSpy).toBeCalledWith(
        String(mockPaymentIntent.payment_method)
      );
    });
    it("should retrieve latest payment method details and update the wallet information ", async () => {
      paymentIntentRetrieveSpy.mockResolvedValue(mockPaymentIntent);
      paymentMethodRetrieveSpy.mockResolvedValue(mockPaymentMethodWithWallet);
      await fetchPaymentDetails("1");
      expect(paymentIntentRetrieveSpy).toBeCalledWith(String(1));
      expect(paymentMethodRetrieveSpy).toBeCalledWith(
        String(mockPaymentIntent.payment_method)
      );
    });

    it("should retrieve latest payment intent details and update the application", async () => {
      mockPaymentIntent.payment_method = null;
      paymentIntentRetrieveSpy.mockResolvedValue(mockPaymentIntent);
      paymentMethodRetrieveSpy.mockResolvedValue(mockPaymentMethod);
      await fetchPaymentDetails("1");
      expect(paymentIntentRetrieveSpy).toBeCalledWith(String(1));
      expect(paymentMethodRetrieveSpy).not.toBeCalled();
    });
  });
});
