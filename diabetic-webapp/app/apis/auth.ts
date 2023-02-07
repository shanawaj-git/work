import { getAPIClientInstance } from './client';
import { OTPGenerationResponse, OTPValidationResponse } from './types';

const Urls = {
  GENERATE_OTP: '/api/users-permissions/otp',
  VALIDATE_OTP: '/api/auth/local',
};

enum Errors {
  UnknownUser='auth.user.unknown',
  InvalidOTP='auth.otp.invalid',
  ExpiredOTP='auth.otp.expired',
  WaitToRegenerateOTP='auth.error.otp.wait',
  MaxFailedAttempt='auth.error.otp.limit'
}

export const publicEndpointConfig = {
  isPublicUrl: true,
}

const generateOTP = async (mobileNumber: string): Promise<OTPGenerationResponse> => {
  try {
    const response = await getAPIClientInstance().post(Urls.GENERATE_OTP, {
      mobileNumber,
    }, publicEndpointConfig);

    return { success: response.data.success };
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error(Errors.UnknownUser);
    } else if (err.response?.status === 403) {
      if (err.response.data.error.details.errorKey === Errors.WaitToRegenerateOTP)
        throw new Error(Errors.WaitToRegenerateOTP);
    } else {
      throw err;
    }
  }
};

const validateOTP = async (mobileNumber: string, otp: string): Promise<OTPValidationResponse> => {
  try {
    const { data: { jwt, user } } = await getAPIClientInstance().post(Urls.VALIDATE_OTP, {
      identifier: mobileNumber,
      password: otp,
    }, publicEndpointConfig);

    return { jwt, user: {...user} };
  } catch (err) {
    const { response: { status = undefined } = {}} =  err;
    if (status === 400) {
      throw new Error(Errors.InvalidOTP);
    } else if (status === 403) {
      if (err.response.data.error.details.errorKey === Errors.MaxFailedAttempt)
        throw new Error(Errors.MaxFailedAttempt);
      if (err.response.data.error.details.errorKey === Errors.ExpiredOTP)
        throw new Error(Errors.ExpiredOTP);
    } else {
      throw err;
    }
  }
};

export {
  generateOTP,
  validateOTP,
  Urls as AuthApiUrls,
  Errors as AuthApiErrors,
};
