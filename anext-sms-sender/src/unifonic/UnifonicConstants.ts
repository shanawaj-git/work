import { SMSEnvironment } from '../types';

export const EnvEndpoints = {
  [SMSEnvironment.Production]: 'https://el.cloud.unifonic.com',
  [SMSEnvironment.Sandbox]: 'https://sandbox.apis.unifonic.com',
};

export const ResponseTypes = {
  JSON: 'JSON',
};

export const Urls = {
  MESSAGES: '/rest/SMS/messages',
};

export const RequestParams = {
  APP_SID: 'AppSid',
  SENDER_ID: 'SenderID',
  BODY: 'Body',
  RECIPIENT: 'Recipient',
  RESPONSE_TYPE: 'responseType',
  CORRELATION_ID: 'CorrelationID',
};
