import { gql } from '@apollo/client';

export type GetPrescriptionInput = {
  prescriptionNumber: string;
};

export type GetPrescriptionOutput = {
  prescription: {
    success: boolean;
    data?: Prescription;
    error?: {
      code: PrescriptionErrorCode;
      message?: string;
    };
  };
};

export type Prescription = {
  prescriptionNumber: string;
  recordNumber?: string;
  visitDate?: Date;
  diagnosis?: string;
  pin?: string;

  insurance?: Insurance;

  drugs: Drug[];

  patient: Patient;
  doctor?: Doctor;
};

type Insurance = {
  insuranceId: string;
  policyNumber?: string;
  provider: InsuranceProvider;
};

type InsuranceProvider = {
  name: string;
};

type Patient = {
  name: Name;
  mohId?: string;
  emiratesId: string;
};

type Doctor = {
  name: Name;
};

type Name = {
  first: string;
  middle?: string;
  last: string;
};

export type Drug = {
  name: string;
  dosage?: Dosage;
};

type Dosage = {
  frequency?: string;
  unit?: string;
  period?: string;
  route?: string;
  quantity?: string;
  timeUnit?: string;
  doctorNotes?: string;
};

export const PrescriptionQueries = {
  Prescription: gql`
    query Prescription($input: GetPrescriptionInput!) {
      prescription(input: $input) {
        success
        data {
          prescriptionNumber
          recordNumber
          visitDate
          diagnosis
          pin

          patient {
            name {
              first
              middle
              last
            }
            mohId
            emiratesId
          }

          doctor {
            name {
              first
              middle
              last
            }
          }

          drugs {
            name

            dosage {
              frequency
              unit
              period
              route
              quantity
              timeUnit
              doctorNotes
            }
          }

          insurance {
            insuranceId
            policyNumber
            provider {
              name
            }
          }
        }

        error {
          code
          message
        }
      }
    }
  `,
};

export enum PrescriptionErrorCode {
  PrescriptionNotFound = 'PRESC_ERR_001',
}

export const OPERATION_GET_PRESCRIPTION = 'Prescription';
