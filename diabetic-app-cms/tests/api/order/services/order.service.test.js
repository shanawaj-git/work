const { setupStrapi, tearDown } = require("../../../helpers/strapi");

const { it, expect } = require("@jest/globals");
const {
  providerPaymentDetails,
  mockPaymentEntity,
} = require("../../../middlewares/webhook.testdata");
const {
  updatePayment,
  updateOrderStatus,
} = require("../../../../src/api/order/services/order");
const { mockPaymentData } = require("./testdata");
const { mockOrderWithPayment } = require("../../payment/testdata");
const PaymentEventSource = require("../../../../src/api/payment/services/PaymentEventSource");
jest.setTimeout(20000);

describe("Orders Service", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });
  describe("order.test.js", () => {
    let updatePaymentSpy, updateOrderSpy,findOrderSpy;
    beforeEach(() => {
      updatePaymentSpy = jest.spyOn(strapi.entityService, "update");
      findOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      updateOrderSpy = jest
        .spyOn(strapi.db.query("api::order.order"), "update")
        .mockResolvedValue({});

    });

    afterEach(() => {
      updatePaymentSpy.mockRestore();
      updateOrderSpy.mockRestore();
      findOrderSpy.mockRestore();
    });

    it("should update the payment details with parameters ", async () => {
      findOrderSpy.mockResolvedValue(mockOrderWithPayment);

      await updatePayment(
          "orderId",
          providerPaymentDetails,
          PaymentEventSource.Application,
      );
      expect(updatePaymentSpy).toBeCalledWith(
        "api::payment.payment",
          mockOrderWithPayment.payment.id,
        {
          data: mockPaymentData,
        }
      );
    });

    it("should update order status ", async () => {
      const status = "dummy Status";
      await updateOrderStatus(mockOrderWithPayment, status);
      expect(updateOrderSpy).toBeCalledWith({
        where: { id: mockOrderWithPayment.id },
        data: {
          status: status,
        },
      });
    });
  });
});
