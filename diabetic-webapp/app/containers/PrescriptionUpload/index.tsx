import React, { useRef, useState } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Typography, TypographyType } from '@albathanext/design-system';
import {
  PrescriptionUploadButton,
  PrescriptionContent,
  UploadPrescription,
  UploadPrescriptionDescription,
  UploadPrescriptionHeader,
  UploadPrescriptionImage,
  PrescriptionInput,
} from './styledComponents';
import messages from './messages';
const uploadPrescriptionImage = require('images/educationImage2.svg');
const PRESCRIPTION_REVIEW_SCREEN = 'review-prescription';
function PrescriptionUpload({ intl, history }: PrescriptionUploadTypes) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  function handleFileChange(event) {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const prescriptionImage = fileObj;
    history.push({
      pathname: PRESCRIPTION_REVIEW_SCREEN,
      state: { prescriptionImage },
    });
  }

  return (
    <UploadPrescription>
      <UploadPrescriptionImage>
        <img src={uploadPrescriptionImage} alt="upload-prescription-img" />
      </UploadPrescriptionImage>
      <PrescriptionContent>
        <UploadPrescriptionHeader>
          <Typography typographyType={TypographyType.TITLE_1}>
            {intl.formatMessage(messages.prescriptionHeaderPrefixLabel)}
          </Typography>
          <Typography typographyType={TypographyType.LARGE_TITLE}>
            {intl.formatMessage(messages.prescriptionHeaderSuffixLabel)}
          </Typography>
        </UploadPrescriptionHeader>
        <UploadPrescriptionDescription>
          <Typography typographyType={TypographyType.SUB_HEAD}>
            {intl.formatMessage(messages.prescriptionDescriptionLabel)}
          </Typography>
        </UploadPrescriptionDescription>
        <PrescriptionUploadButton
          onClick={handleClick}
          data-testid="prescription-button"
        >
          <PrescriptionInput
            data-testid="prescription-input"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {intl.formatMessage(messages.prescriptionUploadButton)}
        </PrescriptionUploadButton>
      </PrescriptionContent>
    </UploadPrescription>
  );
}

const PrescriptionUploadPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

type PrescriptionUploadTypes = InferProps<typeof PrescriptionUploadPropTypes>;

PrescriptionUpload.propTypes = PrescriptionUploadPropTypes;

export default injectIntl(PrescriptionUpload);
