import { defineMessages } from 'react-intl';

export const scope = 'delivery.address.selection';

export default defineMessages({
  deliveryTitle: {
    id: `${scope}.delivery.title`,
    defaultMessage: 'Where would you like your\nmeds delivered to?',
  },
  deliveryDescription: {
    id: `${scope}.delivery.description`,
    defaultMessage:
      'You don’t have any saved addresses.\nAdd an address to get started.',
  },
  addNewAddress: {
    id: `${scope}.addnew`,
    defaultMessage: 'Add new address',
  },
});
