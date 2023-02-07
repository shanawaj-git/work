import { SMSErrorCode } from './SMSErrorCode';
import { SMSError as ISMSError } from './types';

export default class SMSError extends Error implements ISMSError {
    public readonly code: SMSErrorCode;

    constructor(code, message) {
      super(message);
      this.code = code;
    }
}
