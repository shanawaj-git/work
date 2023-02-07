/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { PrescriptionErrorCode } from 'features/prescription/api/graphql';
import { defineMessages } from 'react-intl';

export const scope = 'prescriptionDetails';

export default defineMessages({
  yourDiagnosis: {
    id: `${scope}.yourDiagnosis`,
    defaultMessage: 'Your diagnosis',
  },
  yourPrescription: {
    id: `${scope}.yourPrescription`,
    defaultMessage: 'Your prescription',
  },
  dosage: {
    id: `${scope}.dosage`,
    defaultMessage: 'Dosage',
  },
  loadingPrescription: {
    id: `${scope}.loadingPrescription`,
    defaultMessage: 'loading your prescription',
  },
  [PrescriptionErrorCode.PrescriptionNotFound]: {
    id: `${scope}.error.awaitingResendDelay`,
    defaultMessage: 'Please try after some time',
  },
  GENERIC_ERROR_CODE: {
    id: `${scope}.genericAPIError`,
    defaultMessage: 'Sorry, something went wrong',
  },
});
