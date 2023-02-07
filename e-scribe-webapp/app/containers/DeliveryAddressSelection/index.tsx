import React from 'react';
import ScrollLock from 'react-scrolllock';
import PropTypes, { InferProps } from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { TypographyType, Button } from '@albathanext/design-system';

import PharmacySelectionTabs, {
  PharmacySelectionTab,
} from 'components/organism/PharmacySelectionTabs';
import {
  Container,
  Wrapper,
  TabContainer,
  DeliveryTitle,
  DeliveryDescription,
} from './styledComponents';
import messages from './messages';

function DeliveryAddressSelection({ intl }: DeliveryAddressSelectionTypes) {
  return (
    <ScrollLock>
      <Container>
        <Wrapper>
          <PharmacySelectionTabs activeTab={PharmacySelectionTab.Delivery} />
          <TabContainer>
            <DeliveryTitle typographyType={TypographyType.TITLE_2}>
              {intl.formatMessage(messages.deliveryTitle)}
            </DeliveryTitle>
            <DeliveryDescription typographyType={TypographyType.FOOT_NOTE}>
              {intl.formatMessage(messages.deliveryDescription)}
            </DeliveryDescription>
            <Button className="btnAddNew" size="medium" variant="contained">
              <>{intl.formatMessage(messages.addNewAddress)}</>
            </Button>
          </TabContainer>
        </Wrapper>
      </Container>
    </ScrollLock>
  );
}

const DeliveryAddressSelectionPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  intl: intlShape,
};

type DeliveryAddressSelectionTypes = InferProps<
  typeof DeliveryAddressSelectionPropTypes
>;
DeliveryAddressSelection.defaultProps = {};
DeliveryAddressSelection.propTypes = DeliveryAddressSelectionPropTypes;

export default injectIntl(DeliveryAddressSelection);
