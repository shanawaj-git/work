import { defineMessages } from 'react-intl';

const scope = 'orders.payment.input';

export default defineMessages({
  headerPrefix: {
    id: `${scope}.header.prefix`,
    defaultMessage: 'Payment',
  },

  headerSuffix: {
    id: `${scope}.header.suffix`,
    defaultMessage: 'details',
  },

  amountLabel: {
    id: `${scope}.amount.label`,
    defaultMessage: 'Total to pay',
  },
});
