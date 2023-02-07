import * as mongoose from 'mongoose';
import Topic from 'src/domain/Topic';

export enum DBStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  DELIVERED = 'DELIVERED',
}

export type StatusHistory = Array<{
  type: DBStatus;
  timeStamp: Date;
}>;

export const SMSSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    status: { type: String, enum: DBStatus, required: true },
    statusHistory: { type: mongoose.Schema.Types.Mixed },
    providerMessageId: { type: String },
    topic: { type: String, enum: Topic, required: true },
    referenceNumberInTopic: { type: String, required: true },
    recipient: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at' } },
);

export interface SmsDBModel extends mongoose.Document {
  id: string;
  body: string;
  status: DBStatus;
  statusHistory: StatusHistory;
  providerMessageId: string;
  topic: Topic;
  referenceNumberInTopic: string;
  recipient: string;
}
