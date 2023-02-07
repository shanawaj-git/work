import { gql } from '@apollo/client';

export type GenerateOTPInput = {
  phoneNumber: string;
};

export type GenerateOTPOutput = {
  generateOTP: {
    success: boolean;
    error: {
      code: AuthErrorCode;
      message?: string;
      resendWaitPeriodMillis?: number;
    };
  };
};

export type ValidateOTPInput = {
  phoneNumber: string;
  otp: string,
};

export type ValidateOTPOutput = {
  validateOTP: {
    success: boolean;
    error: {
      code: AuthErrorCode;
      message?: string;
    };
  };
};

export const AuthMutations = {
  GenerateOTP: gql`
    mutation GenerateAuthOTP($input: GenerateOTPInput!) {
      generateOTP(input: $input) {
        success
        error {
          code
          message
        }
      }
    }
  `,
  ValidateOTP: gql`
  mutation ValidateAuthOTP($input: ValidateOTPInput!) {
    validateOTP(input: $input) {
      success
      error {
        code
        message
      }
    }
  }
`,
};

export enum AuthErrorCode {
  AwaitingResendDelay = 'AUTH_ERR_001',
  MaxAttemptsExceeded = 'AUTH_ERR_002',
  InvalidCredentials = 'AUTH_ERR_101',
  ExpiredOTP = 'AUTH_ERR_102',
};

export const OPERATION_VALIDATE_AUTH_OTP = 'ValidateAuthOTP';
