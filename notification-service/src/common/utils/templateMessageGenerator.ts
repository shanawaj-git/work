import * as englishSmsTemplates from 'src/translations/smsTemplates/en.json';
import * as arabicSmsTemplates from 'src/translations/smsTemplates/ar.json';
import { ERROR_CODES } from 'src/common/constants';

type TempalateParams = Record<string, string>;

export enum TEMPLATE_TYPE {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

export enum LANGUAGE {
  EN = 'EN',
  AR = 'AR',
}

const ERRORS = {
  TEMPLATE_PARAMS_MISSING: {
    code: ERROR_CODES.TEMPLATE_PARAMS_MISSING,
    message: 'Template parameter is missing',
  },
  TEMPLATE_LANGUAGE_MISSING: {
    code: ERROR_CODES.TEMPLATE_LANGUAGE_MISSING,
    message: 'Template language is missing',
  },
  TEMPLATE_TYPE_MISSING: {
    code: ERROR_CODES.TEMPLATE_TYPE_MISSING,
    message: 'Template type missing',
  },
  MISSING_TEMPLATE_CODE: {
    code: ERROR_CODES.MISSING_TEMPLATE_CODE,
    message: 'Template code missing',
  },
};

const TEMPLATES_BY_TEMPLATE_TYPE = {
  [TEMPLATE_TYPE.SMS]: {
    [LANGUAGE.EN]: englishSmsTemplates,
    [LANGUAGE.AR]: arabicSmsTemplates,
  },
  [TEMPLATE_TYPE.EMAIL]: {},
};

type BuildMessageBodyFunc = ({
  templateCode: string,
  params: TempalateParams,
  templateType: TEMPLATE_TYPE,
  language: LANGUAGE,
}) => string;

export const buildMessageBody: BuildMessageBodyFunc = ({
  templateCode,
  params,
  templateType,
  language,
}) => {
  validateInput({ templateCode, templateType, language });

  const templateBodyUnprocess =
    TEMPLATES_BY_TEMPLATE_TYPE[templateType]?.[language]?.[templateCode];

  if (!templateBodyUnprocess)
    throw new Error(ERRORS.MISSING_TEMPLATE_CODE.message);

  const templateParamsRegex = /\{(.*?)\}/g;
  const variablesInTemplate = templateBodyUnprocess.match(templateParamsRegex);

  let templateBodyProcessed = templateBodyUnprocess;

  // replacing template variables with params from request
  variablesInTemplate.forEach((variable) => {
    const templateVariableWithoutCurlyBraces = variable.slice(1, -1);
    const variableValue = params[templateVariableWithoutCurlyBraces];
    if (variableValue) {
      templateBodyProcessed = templateBodyProcessed.replace(
        variable,
        variableValue,
      );
    } else {
      throw new Error(`${ERRORS.TEMPLATE_PARAMS_MISSING.message} ${variable}`);
    }
  });

  return templateBodyProcessed;
};

const validateInput = ({ templateCode, templateType, language }) => {
  if (!templateCode) throw new Error(ERRORS.MISSING_TEMPLATE_CODE.message);
  if (!templateType) throw new Error(ERRORS.TEMPLATE_TYPE_MISSING.message);
  if (!language) throw new Error(ERRORS.TEMPLATE_LANGUAGE_MISSING.message);
};
