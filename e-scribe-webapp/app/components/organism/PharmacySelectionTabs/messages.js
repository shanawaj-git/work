import { defineMessages } from 'react-intl';

export const scope = 'pharmacy.selection.tabs';

export default defineMessages({
  screenTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Select Pharmacy',
  },
  deliveryTabLabel: {
    id: `${scope}.tab.delivery.label`,
    defaultMessage: 'Delivery',
  },
  clickNCollectTabLabel: {
    id: `${scope}.tab.clickncollect.label`,
    defaultMessage: 'Click & Collect',
  },
});
