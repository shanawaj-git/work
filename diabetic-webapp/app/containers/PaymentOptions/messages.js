import { defineMessages } from 'react-intl';

const scope = 'orders.payment.input';

export default defineMessages({
  headerPrefix: {
    id: `${scope}.header.prefix`,
    defaultMessage: 'Select your',
  },

  headerSuffix: {
    id: `${scope}.header.suffix`,
    defaultMessage: 'payment method',
  },

  amountLabel: {
    id: `${scope}.amount.label`,
    defaultMessage: 'Total to pay',
  },

  onlinePayment: {
    id: `${scope}.option.online`,
    defaultMessage: 'Pay online',
  },

  cashOnDelivery: {
    id: `${scope}.option.cash.delivery`,
    defaultMessage: 'Cash on delivery',
  },

  cardOnDelivery: {
    id: `${scope}.option.card.delivery`,
    defaultMessage: 'Card on delivery',
  },
});
