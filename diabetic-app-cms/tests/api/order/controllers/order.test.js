const { NotFoundError } = require("@strapi/utils").errors;
var createError = require("http-errors");

const { setupStrapi, tearDown } = require("../../../helpers/strapi");
const {
  initializeOrder,
  findOne,
} = require("../../../../src/api/order/controllers/order");
const OrderStatus = require("../../../../src/api/order/services/OrderStatus");

const {
  mockValidContext,
  mockPrescriptionForSameUser,
  mockOrder,
  mockPrescriptionForAnotherUser,
  mockAppConfig,
  mockFindOneOrderDetails,
  mockValidPatientContext,
  mockFindOneWithOrderIDOrderDetails,
  mockDifferentRoleUser,
  mockDefaultOrderDetailResponse,
  mockUnrelatedPatientOrderDetails,
  mockFindOneOrderDetailsWithPayment,
  paymentProviderData,
  expectedPaymentProviderData,
  mockAppConfigForCashOrCardOnDelivery,
} = require("./orderTestData");

const emailService = require("../../../../src/services/email/email-service");
const { it, expect } = require("@jest/globals");
const {
  mockOrderWithPayment,
  mockPaymentDetails,
  mockPayment,
  mockCtxWithNotLoggedInUser,
  mockCtxWithLoggedInUser,
  mockOrderWithOutPayment,
  mockCtxForCashOnDelivery,
  mockCtx,
} = require("../../payment/testdata");
const {
  confirmPayment,
} = require("../../../../src/api/order/controllers/order");
const PaymentStatus = require("../../../../src/api/payment/services/PaymentStatus");
const paymentProviderService = require("../../../../src/services/payment-provider/payment-provider-service");
const PaymentEventSource = require("../../../../src/api/payment/services/PaymentEventSource");
const {
  providerPaymentDetails,
} = require("../../../middlewares/webhook.testdata");
const {
  forbiddenError,
} = require("../../../../src/extensions/users-permissions/controllers/auth-otp");
const {
  initializePayment,
} = require("../../../../src/api/payment/controllers/payment");

jest.setTimeout(20000);

describe("Orders Controller", () => {
  describe("initializeOrder()", () => {
    let mockFindOnePrescription,
      mockCreatePrescription,
      sendTemplateEmailSpy,
      findOneAppConfigSpy;

    beforeAll(async () => {
      await setupStrapi();
    });

    beforeEach(() => {
      mockFindOnePrescription = jest.spyOn(strapi.entityService, "findOne");
      mockCreatePrescription = jest.spyOn(strapi.entityService, "create");
      sendTemplateEmailSpy = jest
        .spyOn(emailService, "sendTemplateEmail")
        .mockResolvedValue();
      findOneAppConfigSpy = jest
        .spyOn(strapi.query("api::app-config.app-config"), "findOne")
        .mockResolvedValue(mockAppConfig);
    });

    afterEach(() => {
      mockFindOnePrescription.mockRestore();
      mockCreatePrescription.mockRestore();
      sendTemplateEmailSpy.mockRestore();
      findOneAppConfigSpy.mockRestore();
    });

    afterAll(async () => {
      await tearDown();
    });

    it("should create the order and return the order detaiils", async () => {
      const context = mockValidContext;
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      mockCreatePrescription.mockResolvedValue(mockOrder);

      await initializeOrder(context);

      const {
        request: {
          body: { prescriptionNumber, address, schedule },
        },
        state: { user: patient },
      } = context;

      expect(mockCreatePrescription).toBeCalledWith("api::order.order", {
        data: {
          prescription: prescriptionNumber,
          patient: patient.id,
          address,
          schedule,
          status: OrderStatus.Pending,
        },
        populate: { address: true, prescription: true },
      });

      expect(context.created).toBeCalledWith(mockOrder);
    });

    it("should fetch the same prescription as in context for validation", async () => {
      const context = mockValidContext;
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      mockCreatePrescription.mockResolvedValue(mockOrder);

      await initializeOrder(context);

      const {
        request: {
          body: { prescriptionNumber },
        },
      } = context;

      expect(mockFindOnePrescription).toBeCalledWith(
        "api::prescription.prescription",
        prescriptionNumber,
        {
          populate: { patient: true, order: true },
        }
      );
    });

    it("should throw 'NotFoundError' when prescription is not found for the given prescription number", async () => {
      mockFindOnePrescription.mockResolvedValue(null);

      await expect(initializeOrder(mockValidContext)).rejects.toThrow(
        new NotFoundError("Prescription does not exist for the user")
      );
    });

    it("should throw 'NotFoundError' when prescription is found, but for some other user", async () => {
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForAnotherUser);

      await expect(initializeOrder(mockValidContext)).rejects.toThrow(
        new NotFoundError("Prescription does not exist for the user")
      );
    });

    it("should throw 'Conflict Error' when an order is already existing for the same prescription", async () => {
      mockFindOnePrescription.mockResolvedValue({
        ...mockPrescriptionForSameUser,
        order: mockOrder,
      });

      await expect(initializeOrder(mockValidContext)).rejects.toThrow(
        new createError(409, "Existing order found")
      );
    });

    it("should email to configured recipients on new prescription", async () => {
      const context = mockValidContext;
      const orderId = 100;
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      const order = { ...mockOrder, id: orderId };
      mockCreatePrescription.mockResolvedValue(order);

      await initializeOrder(context);

      const ORDER_CONTEXT =
        "admin/content-manager/collectionType/api::order.order";
      const orderLink = `${process.env.HOST_DOMAIN}/${ORDER_CONTEXT}/${orderId}`;

      await new Promise(process.nextTick);

      expect(sendTemplateEmailSpy).toBeCalledWith({
        subject: mockAppConfig.newPrescriptionEmailSubject,
        text: mockAppConfig.newPrescriptionEmailTemplate,
        html: mockAppConfig.newPrescriptionEmailTemplate,
        params: { order, patient: context.state.user, orderLink },
        recipients: mockAppConfig.emailList.trim().split("\n"),
      });
    });

    it("should not send email if template is missing", async () => {
      const context = mockValidContext;
      const orderId = 100;
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      const order = { ...mockOrder, id: orderId };
      mockCreatePrescription.mockResolvedValue(order);
      findOneAppConfigSpy.mockResolvedValue({
        ...mockAppConfig,
        newPrescriptionEmailTemplate: null,
      });

      await initializeOrder(context);

      await new Promise(process.nextTick);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("should not send email if no email recipients configured", async () => {
      const context = mockValidContext;
      const orderId = 100;
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      const order = { ...mockOrder, id: orderId };
      mockCreatePrescription.mockResolvedValue(order);
      findOneAppConfigSpy.mockResolvedValue({
        ...mockAppConfig,
        emailList: "",
      });

      await initializeOrder(context);
      await new Promise(process.nextTick);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("should handle the exception silently in case of error in sending new prescription email", async () => {
      const context = mockValidContext;
      const orderId = 100;
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";
      mockFindOnePrescription.mockResolvedValue(mockPrescriptionForSameUser);
      const order = { ...mockOrder, id: orderId };
      mockCreatePrescription.mockResolvedValue(order);
      sendTemplateEmailSpy.mockRejectedValue(
        new Error("Some error for testing")
      );

      await expect(initializeOrder(context)).resolves;
    });
  });

  describe("findOneForPatient()", () => {
    let mockFindOneOrderDetailsForPatient, findOneOrderDetailsSpy;

    beforeAll(async () => {
      await setupStrapi();
    });

    beforeEach(() => {
      mockFindOneOrderDetailsForPatient = jest.spyOn(
        strapi.entityService,
        "findOne"
      );

      findOneOrderDetailsSpy = jest
        .spyOn(strapi.query("api::order.order"), "findOne")
        .mockResolvedValue(mockFindOneOrderDetails);
    });

    afterEach(() => {
      mockFindOneOrderDetailsForPatient.mockRestore();
      findOneOrderDetailsSpy.mockRestore();
    });

    afterAll(async () => {
      await tearDown();
    });
    it("should return all the order details if not patient", async () => {
      const context = mockDifferentRoleUser;

      const superFindOne = jest.fn();
      superFindOne.mockResolvedValue(mockDefaultOrderDetailResponse);

      await expect(findOne(context, superFindOne)).resolves.toBeDefined();
    });

    it("should return the minimal order details for payment as a patient", async () => {
      const context = mockValidPatientContext;

      mockFindOneOrderDetailsForPatient.mockResolvedValue(
        mockFindOneOrderDetails
      );
      const superFindOne = jest.fn();

      const response = await findOne(context, superFindOne);
      expect(response?.data).toBeUndefined();
    });

    it("should return only the particular order details related to the patient", async () => {
      const context = mockValidPatientContext;

      mockFindOneOrderDetailsForPatient.mockResolvedValue(
        mockUnrelatedPatientOrderDetails
      );
      const superFindOne = jest.fn();
      await expect(findOne(context, superFindOne)).rejects.toThrow(
        new createError(404, "Order ID does not exist")
      );
    });

    it("should return the payment details if payment details exist", async () => {
      const context = mockValidPatientContext;
      mockFindOneOrderDetailsForPatient.mockResolvedValue(
        mockFindOneOrderDetailsWithPayment
      );

      const superFindOne = jest.fn();
      const response = await findOne(context, superFindOne);
      expect(response.payment.paymentType).toBeDefined();
      expect(response.payment.createdAt).toBeDefined();
      expect(response.payment.maskedCardNumber).toBeDefined();
      expect(response.payment.providerMetadata.client_secret).toBeDefined();
    });
  });

  describe("fetchAndUpdatePaymentDetails()", () => {
    let findOneOrderSpy,
      updateOrderSpy,
      updatePaymentSpy,
      providerPaymentIntentSpy,
      updatePaymentDetailsSpy;

    beforeAll(async () => {
      await setupStrapi();
    });

    beforeEach(() => {
      findOneOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      updateOrderSpy = jest.spyOn(
        strapi.db.query("api::order.order"),
        "update"
      );
      updatePaymentSpy = jest.spyOn(strapi.entityService, "update");
      providerPaymentIntentSpy = jest.spyOn(
        paymentProviderService,
        "fetchPaymentDetails"
      );
      updatePaymentDetailsSpy = jest.spyOn(
        strapi.services["api::order.order"],
        "updatePayment"
      );
    });

    afterEach(() => {
      updatePaymentDetailsSpy.mockRestore();
      findOneOrderSpy.mockRestore();
      updateOrderSpy.mockRestore();
      updatePaymentSpy.mockRestore();
      providerPaymentIntentSpy.mockRestore();
    });

    afterAll(async () => {
      await tearDown();
    });

    it("should fetch and update latest payment details from provider ", async () => {
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      providerPaymentIntentSpy.mockResolvedValue(paymentProviderData);
      updatePaymentDetailsSpy.mockResolvedValue(mockPayment);
      await confirmPayment(mockCtxWithLoggedInUser);
      expect(updatePaymentDetailsSpy).toBeCalledWith(
        mockOrderWithPayment.id,
        expectedPaymentProviderData,
        PaymentEventSource.Application
      );
    });

    it("should throw error if order is not attached to payment", async () => {
      const errorMsg = "Payment is not initialized";
      findOneOrderSpy.mockResolvedValue(mockOrderWithOutPayment);
      providerPaymentIntentSpy.mockResolvedValue(mockPaymentDetails);
      updatePaymentSpy.mockResolvedValue(mockPayment);
      await expect(confirmPayment(mockCtxWithLoggedInUser)).rejects.toThrow(
        errorMsg
      );
    });

    it("should update order only if payment status is succeeded ", async () => {
      mockPaymentDetails.status = PaymentStatus.Succeeded;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      providerPaymentIntentSpy.mockResolvedValue(mockPaymentDetails);
      updatePaymentSpy.mockResolvedValue(mockPayment);
      updatePaymentDetailsSpy.mockResolvedValue(mockPayment);
      await confirmPayment(mockCtxWithLoggedInUser);
      expect(updatePaymentDetailsSpy).toBeCalled();
    });

    it("should not call payment provider if payment status is succeeded", async () => {
      mockOrderWithPayment.payment.status = PaymentStatus.Succeeded;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      providerPaymentIntentSpy.mockResolvedValue(mockPaymentDetails);
      updatePaymentSpy.mockResolvedValue(mockPayment);
      await confirmPayment(mockCtxWithLoggedInUser);
      expect(updatePaymentSpy).not.toBeCalled();
    });

    it("should throw error if logged order does not belong to logged in patient", async () => {
      const errorMsg = "Order with the given id does not exist for the patient";
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      await expect(confirmPayment(mockCtxWithNotLoggedInUser)).rejects.toThrow(
        errorMsg
      );
    });
  });

  describe("Cash or Card on delivery ", () => {
    let findOneOrderSpy,
      updateOrderSpy,
      updatePaymentSpy,
      providerPaymentIntentSpy,
      createPaymentSpy,
      sendTemplateEmailSpy,
      findOneAppConfigSpy;

    beforeAll(async () => {
      await setupStrapi();
    });

    beforeEach(() => {
      findOneOrderSpy = jest.spyOn(strapi.entityService, "findOne");
      updateOrderSpy = jest.spyOn(
        strapi.db.query("api::order.order"),
        "update"
      );
      updatePaymentSpy = jest.spyOn(strapi.entityService, "update");
      createPaymentSpy = jest.spyOn(strapi.entityService, "create");
      providerPaymentIntentSpy = jest.spyOn(
        paymentProviderService,
        "fetchPaymentDetails"
      );
      sendTemplateEmailSpy = jest
        .spyOn(emailService, "sendTemplateEmail")
        .mockResolvedValue();
      findOneAppConfigSpy = jest
        .spyOn(strapi.query("api::app-config.app-config"), "findOne")
        .mockResolvedValue(mockAppConfigForCashOrCardOnDelivery);
    });

    afterEach(() => {
      findOneOrderSpy.mockRestore();
      updateOrderSpy.mockRestore();
      updatePaymentSpy.mockRestore();
      providerPaymentIntentSpy.mockRestore();
      createPaymentSpy.mockRestore();
      sendTemplateEmailSpy.mockRestore();
      findOneAppConfigSpy.mockRestore();
    });

    afterAll(async () => {
      await tearDown();
    });

    it("should create payment details on Cash on Delivery if payment is not present", async () => {
      findOneOrderSpy.mockResolvedValue(mockOrderWithOutPayment);
      updateOrderSpy.mockResolvedValue({});
      sendTemplateEmailSpy.mockResolvedValue({});
      createPaymentSpy.mockResolvedValue(mockPayment);
      await confirmPayment(mockCtxForCashOnDelivery);
      expect(createPaymentSpy).toBeCalledWith("api::payment.payment", {
        data: {
          currency: mockOrderWithOutPayment.currency,
          amount: mockOrderWithOutPayment.amount,
          paymentType: mockCtxForCashOnDelivery.request.body.paymentMethod,
          order: mockOrderWithOutPayment.id,
          patient: mockOrderWithOutPayment.patient.id,
        },
        populate: { order: true, patient: true },
      });
    });

    it("should update payment details on Cash on Delivery if payment is not present", async () => {
      mockOrderWithPayment.payment.status = PaymentStatus.PaymentMethodRequired;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);
      await confirmPayment(mockCtxForCashOnDelivery);
      expect(updatePaymentSpy).toBeCalled();
    });

    it("should throw error if order status is not insurance approved or require payment ", async () => {
      findOneOrderSpy.mockResolvedValue({
        ...mockOrderWithPayment,
        status: OrderStatus.Pending,
      });
      const errorMsg = "Invalid order status for payment";
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);
      await expect(confirmPayment(mockCtxForCashOnDelivery)).rejects.toThrow(
        errorMsg
      );
    });
    it("should email to configured recipients on new prescription", async () => {
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";

      mockOrderWithPayment.payment.status = PaymentStatus.PaymentMethodRequired;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);

      await confirmPayment(mockCtxForCashOnDelivery);

      const ORDER_CONTEXT =
        "admin/content-manager/collectionType/api::order.order";
      const orderLink = `${process.env.HOST_DOMAIN}/${ORDER_CONTEXT}/${mockOrderWithPayment.id}`;

      await new Promise(process.nextTick);
      expect(sendTemplateEmailSpy).toBeCalledWith({
        subject:
          mockAppConfigForCashOrCardOnDelivery.cashOrCardOnDeliveryEmailSubject,
        text: mockAppConfigForCashOrCardOnDelivery.cashOrCardOnDeliveryEmailTemplate,
        html: mockAppConfigForCashOrCardOnDelivery.cashOrCardOnDeliveryEmailTemplate,
        params: {
          order: mockOrderWithPayment,
          patient: mockOrderWithPayment.patient,
          orderLink,
          paymentMethod: mockCtxForCashOnDelivery.request.body.paymentMethod,
        },
        recipients: mockAppConfigForCashOrCardOnDelivery.emailList
          .trim()
          .split("\n"),
      });
    });

    it("should not send email if template is missing", async () => {
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";

      mockOrderWithPayment.payment.status = PaymentStatus.PaymentMethodRequired;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);

      findOneAppConfigSpy.mockResolvedValue({
        ...mockAppConfig,
        cashOrCardOnDeliveryEmailTemplate: null,
      });

      await confirmPayment(mockCtxForCashOnDelivery);

      await new Promise(process.nextTick);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("should not send email if no email recipients configured", async () => {
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";

      mockOrderWithPayment.payment.status = PaymentStatus.PaymentMethodRequired;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);
      findOneAppConfigSpy.mockResolvedValue({
        ...mockAppConfig,
        emailList: "",
      });
      await confirmPayment(mockCtxForCashOnDelivery);
      await new Promise(process.nextTick);
      expect(sendTemplateEmailSpy).not.toBeCalled();
    });

    it("should handle the exception silently in case of error in sending cash or card delivery email", async () => {
      process.env.HOST_DOMAIN = "https://dummy.hos.domain";
      mockOrderWithPayment.payment.status = PaymentStatus.PaymentMethodRequired;
      findOneOrderSpy.mockResolvedValue(mockOrderWithPayment);
      updateOrderSpy.mockResolvedValue({});
      updatePaymentSpy.mockResolvedValue(mockPayment);

      sendTemplateEmailSpy.mockRejectedValue(
        new Error("Some error for testing")
      );
      await expect(confirmPayment(mockCtxForCashOnDelivery)).resolves;
    });
  });
});
