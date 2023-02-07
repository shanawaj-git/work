import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { TypographyType } from '@albathanext/design-system';
import PropTypes, { InferProps } from 'prop-types';
import { Modal } from 'react-responsive-modal';
import messages from './messages';
import 'react-responsive-modal/styles.css';
import {
  DeliveryModalDescription,
  DeliveryModalHeaderLabel,
  DeliveryModalHeaderSuffixLabel,
} from './styledComponents';
const backIcons = require('../../../images/backIcons.png');
const closeIcon = <img src={backIcons} alt="backButtonImage" />;
function PresentInPersonReasonModal({
  intl,
  open,
  closeHandler,
}: PresentInPersonReasonModalTypes) {
  return (
    <Modal
      center
      open={open}
      closeIcon={closeIcon}
      onClose={closeHandler}
      styles={{
        closeButton: { left: 14 },
        modal: { margin: 0, minWidth: '100vw', minHeight: '100vh' },
      }}
    >
      <DeliveryModalHeaderLabel
        typographyType={TypographyType.TITLE_1}
        data-testid="modal-title"
      >
        {intl.formatMessage(messages.deliveryModalHeaderLabel)}
      </DeliveryModalHeaderLabel>
      <DeliveryModalHeaderSuffixLabel
        typographyType={TypographyType.LARGE_TITLE}
      >
        {intl.formatMessage(messages.deliveryModalHeaderSuffixLabel)}
      </DeliveryModalHeaderSuffixLabel>
      <DeliveryModalDescription typographyType={TypographyType.SUB_HEAD}>
        {intl.formatMessage(messages.deliveryModalDescription)}
      </DeliveryModalDescription>
    </Modal>
  );
}

const PresentInPersonReasonModalPropTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  closeHandler: PropTypes.func,
};

type PresentInPersonReasonModalTypes = InferProps<
  typeof PresentInPersonReasonModalPropTypes
>;

PresentInPersonReasonModal.propTypes = PresentInPersonReasonModalPropTypes;

export default injectIntl(PresentInPersonReasonModal);
