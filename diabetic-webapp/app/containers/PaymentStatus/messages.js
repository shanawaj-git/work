/*
 * Paymnet Status Screen messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  paymentHeaderPrefix: {
    id: 'payment.status.header.label.heading',
    defaultMessage: 'Payment',
  },
  paymentHeaderSuffixSuccess: {
    id: 'payment.status.header.label.success',
    defaultMessage: 'Successful!',
  },
  paymentHeaderSuffixFailed: {
    id: 'payment.status.header.label.failed',
    defaultMessage: 'Failed',
  },
  labelCashOnDelivery: {
    id: 'payment.status.label.cashOnDelivery',
    defaultMessage: 'Cash On Delivery',
  },
  labelCardOnDelivery: {
    id: 'payment.status.label.cardOnDelivery',
    defaultMessage: 'Card On Delivery',
  },
  paymentDescriptionSuccess: {
    id: 'payment.status.description.success',
    defaultMessage:
      'Thank you, Your payment has gone through and your order is placed. Please look out for your delivery guy!',
  },
  paymentDescriptionSuccessOnDelivery: {
    id: 'payment.status.description.success',
    defaultMessage:
      'Thank you, Your payment has gone through and your order is delivered.',
  },
  paymentDescriptionFailed: {
    id: 'payment.status.description.failed',
    defaultMessage:
      'Processing of your payment unfortunately failed. Please try again or <a data-testid="contact-support-phone" href="{href}"> contact support </a> ',
  },
  paymentDescriptionPending: {
    id: 'payment.status.description.pending',
    defaultMessage:
      'Thank you, Your order is placed and you have opted to pay by {paymentMode}. Please look out for your delivery guy!',
  },
  paymentMethod: {
    id: 'payment.status.payment.method',
    defaultMessage: 'Payment Method',
  },
  paymentPayedTo: {
    id: 'payment.status.payedTo',
    defaultMessage: 'Payed To',
  },
  cashPaymentMethod: {
    id: 'payment.method.cash',
    defaultMessage: 'Cash Payment',
  },
  pharmacyName: {
    id: 'pharmacy.name',
    defaultMessage: 'MPC Pharmacy',
  },
  retryPayment: {
    id: 'payment.status.button.retry',
    defaultMessage: 'Retry',
  },
  changePaymentMode: {
    id: 'payment.status.button.change',
    defaultMessage: 'Change',
  },
});
