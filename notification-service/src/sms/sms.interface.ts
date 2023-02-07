import Topic from 'src/domain/Topic';
import { DBStatus } from 'src/connections/mongo/model/Sms';

export type SendSMSResponse = {
  message: string;
  trackingId: string;
  success: boolean;
  status: SendSMSResponseStatus;
};
export type RetrySMSResponse = unknown;

export enum SendSMSResponseStatus {
  QUEUED = 'Queued',
  SENT = 'Sent',
  FAILED = 'Failed',
  REJECTED = 'Rejected',
}

export const MAP_MESSAGE_RESPONSE_TO_MESSAGE_DB_STATUS = {
  [SendSMSResponseStatus.QUEUED]: DBStatus.PENDING,
  [SendSMSResponseStatus.SENT]: DBStatus.DELIVERED,
  [SendSMSResponseStatus.REJECTED]: DBStatus.FAILED,
  [SendSMSResponseStatus.FAILED]: DBStatus.FAILED,
};

type SmsParams = Record<string, string>;

export type SendSMSInput = {
  templateCode: string;
  recipient: string;
  params: SmsParams;
  topic: Topic;
  referenceNumberInTopic: string;
};

type RetryFuncInput = {
  providerMessageId: number;
};

type sendSMSFunc = (input: SendSMSInput) => Promise<string>;

type retryFunc = (input: RetryFuncInput) => Promise<RetrySMSResponse>;

export interface SMSService {
  sendSms: sendSMSFunc;
}
