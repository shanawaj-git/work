import Topic, { EventType } from 'src/domain/Topic';
import { SendSMSInput } from 'src/sms/sms.interface';
import { ERROR_CODES } from 'src/common/constants';
const ERRORS = {
  MISSING_TEMPLATE_CODE: {
    code: ERROR_CODES.MISSING_TEMPLATE_CODE,
    message: 'missing template code',
  },
};

export enum TemplateCodes {
  OTP_GENERATED = 'opt_generated',
}

type OtpData = {
  otp: string;
  phoneNumber: string;
};

const TEMPLATE_CODE_BY_EVENT_TYPE = {
  [EventType.OtpGenerated]: TemplateCodes.OTP_GENERATED,
};

export const getTemplateParamsByTemplateCode = (
  otpData: OtpData,
  templateCode: string,
): Record<string, string> => {
  switch (templateCode) {
    case TemplateCodes.OTP_GENERATED: {
      const { otp } = otpData;

      return {
        otp,
      };
    }
    default: {
      throw new Error(ERRORS.MISSING_TEMPLATE_CODE.message);
    }
  }
};

export const mapOtpDataToSmsInput = ({ otpData, eventType }): SendSMSInput => {
  const { phoneNumber } = otpData;

  return {
    templateCode: TEMPLATE_CODE_BY_EVENT_TYPE[eventType],
    recipient: phoneNumber,
    params: getTemplateParamsByTemplateCode(
      otpData,
      TEMPLATE_CODE_BY_EVENT_TYPE[eventType],
    ),
    topic: Topic.Authentication,
    referenceNumberInTopic: phoneNumber,
  };
};
