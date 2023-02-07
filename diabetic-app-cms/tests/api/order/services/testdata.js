const {
  mockPaymentEntity,
  providerPaymentDetails,
} = require("../../../middlewares/webhook.testdata");
const { expect } = require("@jest/globals");
const PaymentEventSource = require("../../../../src/api/payment/services/PaymentEventSource");
const {mockOrderWithPayment} = require("../../payment/testdata");

const history = [
    ...mockOrderWithPayment.payment.history,
    {
        type: providerPaymentDetails.status,
        timeStamp: expect.stringMatching(
            `\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z`
        ),
        metadata: providerPaymentDetails.providerMetadata,
        eventSource: PaymentEventSource.Application,
    },
];

const mockPaymentData = providerPaymentDetails.paymentType
    ? {
        status: providerPaymentDetails.status,
        maskedCardNumber: providerPaymentDetails.maskedCardNumber,
        paymentType: providerPaymentDetails.paymentType,
        paymentSubType: providerPaymentDetails.paymentSubType,
        history,
    }
    : {
        status: providerPaymentDetails.status,
        history,
    };
module.exports = { mockPaymentData, history };
