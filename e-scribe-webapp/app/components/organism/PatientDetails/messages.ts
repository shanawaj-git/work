/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'prescriptionDetails';

export default defineMessages({
  prescription: {
    id: `${scope}.prescription`,
    defaultMessage: 'PRESCRIPTION',
  },
  doctor: {
    id: `${scope}.doctor`,
    defaultMessage: 'Doctor',
  },
  insurance: {
    id: `${scope}.insurance`,
    defaultMessage: 'Insurance',
  },
  fullPrescriptionDetails: {
    id: `${scope}.fullPrescriptionDetails`,
    defaultMessage: 'Full prescription details',
  },
  pin: {
    id: `${scope}.pin`,
    defaultMessage: 'Pin',
  },
  policyReference: {
    id: `${scope}.policyReference`,
    defaultMessage: 'Pol. Ref',
  },
  visitDate: {
    id: `${scope}.visitDate`,
    defaultMessage: 'Visit date',
  },
  mohId: {
    id: `${scope}.mohId`,
    defaultMessage: 'MOH ID',
  },
  prescriptionNumber: {
    id: `${scope}.prescriptionNumber`,
    defaultMessage: 'Prescription No.',
  },
  insuranceId: {
    id: `${scope}.insuranceId`,
    defaultMessage: 'Insurance ID',
  },
  insuranceProvider: {
    id: `${scope}.insuranceProvider`,
    defaultMessage: 'Insurance Provider',
  },
  doctorAppriviation: {
    id: `${scope}.doctorAppriviation`,
    defaultMessage: 'Dr.',
  },
});
