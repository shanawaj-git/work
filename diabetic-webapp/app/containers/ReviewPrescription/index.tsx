import React, { useRef, useState } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Typography, TypographyType } from '@albathanext/design-system';
import * as prescriptionApi from 'apis/prescription';
import {
  ContinueButton,
  PrescriptionConfirmationButtons,
  PrescriptionConfirmationDescription,
  PrescriptionConfirmationHeader,
  PrescriptionConnfirmationNav,
  PrescriptionImage,
  PrescriptionPopUp,
  PrescriptionPreview,
  RetakeButton,
} from './styledComponents';
import { PrescriptionInput } from '../PrescriptionUpload/styledComponents';
import { ErrorText } from '../PhoneLogin/styledComponents';
import messages from './messages';
import { GENERIC_ERROR_CODE } from '../PhoneLogin';
export const getDeliveryIntroductionScreenPath = id =>
  `/prescriptions/${id}/delivery/introduction`;

function ReviewPrescription({
  intl,
  location,
  history,
}: PreviewPrescriptionTypes) {
  const { prescriptionImage } = location.state;
  const [previewImage, setPreviewImage] = useState(prescriptionImage);
  const inputRef = useRef(null);
  const [errorCode, setErrorCode] = useState('');
  const errorMessages = {
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'upload.prescription.error',
      defaultMessage:
        'Error while uploading your prescription. Please try again later.',
    }),
  };

  const uploadPrescriptionOnClick = async () => {
    try {
      setErrorCode(null);
      // @ts-ignore
      const { id } = await prescriptionApi.uploadPrescription(previewImage);
      history.push({
        pathname: getDeliveryIntroductionScreenPath(id),
      });
    } catch (err) {
      setErrorCode(err.message);
    }
  };
  const getErrorMessage = code =>
    errorMessages[code] || errorMessages[GENERIC_ERROR_CODE];

  const handleClick = () => {
    inputRef.current.click();
  };
  function handleFileChange(event) {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setPreviewImage(fileObj);
  }

  // @ts-ignore
  const previewImageSrc = URL.createObjectURL(previewImage);
  return (
    <PrescriptionPreview>
      <PrescriptionImage
        src={previewImageSrc}
        alt="review-prescription-image"
      />
      <PrescriptionPopUp>
        <PrescriptionConnfirmationNav>
          <PrescriptionConfirmationHeader>
            <Typography typographyType={TypographyType.TITLE_1}>
              {intl.formatMessage(messages.prescriptionReviewHeaderPrefixLabel)}
            </Typography>
            <Typography typographyType={TypographyType.LARGE_TITLE}>
              {intl.formatMessage(messages.prescriptionReviewHeaderSuffixLabel)}
            </Typography>
          </PrescriptionConfirmationHeader>
          <PrescriptionConfirmationDescription>
            <Typography typographyType={TypographyType.SUB_HEAD}>
              {intl.formatMessage(messages.prescritionReviewDescription)}
            </Typography>
          </PrescriptionConfirmationDescription>
          <PrescriptionConfirmationButtons>
            <RetakeButton onClick={handleClick} data-testid="retake-button">
              <PrescriptionInput
                data-testid="retake-prescription-input"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {intl.formatMessage(messages.prescriptionReviewRetakeButton)}
            </RetakeButton>
            <ContinueButton
              onClick={uploadPrescriptionOnClick}
              data-testid="upload-btn"
            >
              {intl.formatMessage(messages.prescritionReviewContinueButton)}
            </ContinueButton>
            {errorCode && (
              <ErrorText data-testid="error-text">
                <Typography typographyType={TypographyType.FOOT_NOTE}>
                  {getErrorMessage(errorCode)}
                </Typography>
              </ErrorText>
            )}
          </PrescriptionConfirmationButtons>
        </PrescriptionConnfirmationNav>
      </PrescriptionPopUp>
    </PrescriptionPreview>
  );
}

const PreviewPrescriptionPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      prescriptionImage: PropTypes.object.isRequired,
    }),
  }),
};

type PreviewPrescriptionTypes = InferProps<typeof PreviewPrescriptionPropTypes>;

ReviewPrescription.prototype = PreviewPrescriptionPropTypes;

export default injectIntl(ReviewPrescription);
