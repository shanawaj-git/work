import Topic, { EventType } from 'src/domain/Topic';
import { Environment } from 'src/common/constants';
import { SendSMSInput } from 'src/sms/sms.interface';
import { ERROR_CODES } from 'src/common/constants';
const ERRORS = {
  MISSING_TEMPLATE_CODE: {
    code: ERROR_CODES.MISSING_TEMPLATE_CODE,
    message: 'missing template code',
  },
};

const prescriptionsBaseUrl = {
  [Environment.PRODUCTION]: '',
  [Environment.DEVELOPMENT]: 'http://localhost:3000',
};

const PARAM_REDIRECT = 'redirect';
const CONTEXT_PATH_PRESCRIPTIONS = '/prescriptions';

export enum TemplateCodes {
  NEW_PRESECRIPTION = 'new_prescription',
}

type Prescription = {
  patient: {
    name: {
      first: string;
      middle: string;
      last: string;
    };
    mobile;
  };
  prescriptionNumber: string;
};

const TEMPLATE_CODE_BY_EVENT_TYPE = {
  [EventType.PresciptionReceived]: TemplateCodes.NEW_PRESECRIPTION,
};

export const getTemplateParamsByTemplateCode = (
  prescription: Prescription,
  templateCode: string,
): Record<string, string> => {
  switch (templateCode) {
    case TemplateCodes.NEW_PRESECRIPTION: {
      const { NODE_ENV } = process.env;

      const { patient, prescriptionNumber } = prescription;
      const { name } = patient;
      const prescriptionLink = new URL(
        prescriptionsBaseUrl[NODE_ENV] ||
          prescriptionsBaseUrl[Environment.DEVELOPMENT],
      );
      prescriptionLink.searchParams.append(
        PARAM_REDIRECT,
        `${CONTEXT_PATH_PRESCRIPTIONS}/${prescriptionNumber}`,
      );
      return {
        patientName: `${name.first} ${name.last}`,
        prescriptionUrl: prescriptionLink.href,
      };
    }
    default: {
      throw new Error(ERRORS.MISSING_TEMPLATE_CODE.message);
    }
  }
};

export const mapPrescriptionDataToSmsInput = ({
  prescription,
  eventType,
}): SendSMSInput => {
  const { patient, prescriptionNumber } = prescription;
  const { mobileNumber } = patient;

  return {
    templateCode: TEMPLATE_CODE_BY_EVENT_TYPE[eventType],
    recipient: mobileNumber,
    params: getTemplateParamsByTemplateCode(
      prescription,
      TEMPLATE_CODE_BY_EVENT_TYPE[eventType],
    ),
    topic: Topic.Prescription,
    referenceNumberInTopic: prescriptionNumber,
  };
};
