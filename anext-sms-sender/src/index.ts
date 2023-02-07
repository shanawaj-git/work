import SMSSender from './unifonic/UnifonicSMSSender';
import SMSError from './SMSError';
import { SMSErrorCode } from './SMSErrorCode';
import {
  SMSSenderConfig,
  SMSEnvironment,
  LoggerInterface,
  SendSMSOptions,
  SendSMSResponse,
  SMSSender as ISMSSender,
} from './types';

export default SMSSender;

export { SMSError, SMSErrorCode };

export {
  SMSSenderConfig,
  SMSEnvironment,
  LoggerInterface,
  SendSMSOptions,
  SendSMSResponse,
  ISMSSender as SMSSender,
};
