import React, { useState } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { TypographyType, Button } from '@albathanext/design-system';
import ReactHtmlParser from 'react-html-parser';
import messages from './messages';
import { deliverySteps } from './deliverySteps';
import DeliveryModal from '../../components/organism/PresentInPersonReasonModal';
import {
  DeliveryNoteScreen,
  DeliveryNoteDescription,
  DeliveryNoteHeader,
  ButtonContainer,
  ClickHereLink,
  DeliveryStepsContainer,
  DeliveryStepImageContainer,
  DeliveryStepTextContainer,
  StepTitle,
  StepDescription,
  Margin,
  DeliveryHeaderLabel,
  DeliveryDescription,
  DeliveryHeaderSuffixLabel,
} from './styledComponents';
const ADDRESS_SELECTION_SCREEN = 'address-selection';
function DeliveryIntroduction({ intl, history }: DeliveryNoteTypes) {
  const [openInPersonReasonModal, setOpen] = useState(false);

  const openModel = () => setOpen(true);
  const closeModel = () => setOpen(false);

  const deliveryAddressSelection = async () => {
    history.push({
      pathname: ADDRESS_SELECTION_SCREEN,
    });
  };

  const DeliveryStep = ({ step }: { step: any }) => (
    <DeliveryStepsContainer>
      <DeliveryStepImageContainer>
        <img src={step.deliveryImage} alt="header_img" />
      </DeliveryStepImageContainer>
      <DeliveryStepTextContainer>
        <StepTitle typographyType={TypographyType.TITLE_4}>
          {intl.formatMessage(step.deliveryStepTitle)}
        </StepTitle>
        <StepDescription typographyType={TypographyType.SUB_HEAD}>
          {intl.formatMessage(step.deliveryStepTitleDescription)}
        </StepDescription>
      </DeliveryStepTextContainer>
    </DeliveryStepsContainer>
  );

  return (
    <DeliveryNoteScreen>
      <DeliveryNoteHeader>
        <DeliveryHeaderLabel typographyType={TypographyType.TITLE_1}>
          {intl.formatMessage(messages.deliveryNoteHeaderLabel)}
        </DeliveryHeaderLabel>
        <DeliveryHeaderSuffixLabel typographyType={TypographyType.LARGE_TITLE}>
          {intl.formatMessage(messages.deliveryNoteHeaderSuffixLabel)}
        </DeliveryHeaderSuffixLabel>
      </DeliveryNoteHeader>
      <DeliveryNoteDescription>
        <DeliveryDescription
          typographyType={TypographyType.SUB_HEAD}
          component="span"
        >
          {ReactHtmlParser(
            intl.formatMessage(messages.deliveryNoteDescription),
          )}
        </DeliveryDescription>
      </DeliveryNoteDescription>
      <Margin />
      {deliverySteps.map(step => (
        <DeliveryStep step={step} key={step.id} />
      ))}
      <ButtonContainer>
        <Button
          data-testid="iUnderstand-btn"
          variant="contained"
          size="large"
          onClick={deliveryAddressSelection}
        >
          <>{intl.formatMessage(messages.deliveryIUnderstandButton)}</>
        </Button>
      </ButtonContainer>
      <ClickHereLink>
        <button
          type="button"
          id="contactSupport"
          onClick={openModel}
          data-testid="modal-link"
        >
          {intl.formatMessage(messages.deliveryWhyIBePresentButton)}
        </button>
      </ClickHereLink>
      <DeliveryModal open={openInPersonReasonModal} closeHandler={closeModel} />
    </DeliveryNoteScreen>
  );
}

const DeliveryNotePropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

type DeliveryNoteTypes = InferProps<typeof DeliveryNotePropTypes>;

DeliveryIntroduction.prototype = DeliveryNotePropTypes;

export default injectIntl(DeliveryIntroduction);
