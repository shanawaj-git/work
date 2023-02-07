import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SMSSender, { SMSEnvironment } from '@albathanext/anext-sms-sender';
import { Environment, ERROR_CODES } from 'src/common/constants';
import { SmsDBModel } from 'src/connections/mongo/model/Sms';
import {
  SendSMSResponse,
  SendSMSResponseStatus,
  MAP_MESSAGE_RESPONSE_TO_MESSAGE_DB_STATUS,
  SendSMSInput,
  SMSService as ISmsService,
} from 'src/sms/sms.interface';

import {
  buildMessageBody,
  TEMPLATE_TYPE,
  LANGUAGE,
} from 'src/common/utils/templateMessageGenerator';

const ERRORS = {
  MISSING_SMS_RECIPIENT: {
    code: ERROR_CODES.MISSING_SMS_RECIPIENT,
    message: 'Missing SMS body',
  },
  MISSING_TEMPLATE_CODE: {
    code: ERROR_CODES.MISSING_SMS_RECIPIENT,
    message: 'Missing SMS recipient',
  },
};

@Injectable()
export class SmsService implements ISmsService {
  SMSSender;

  constructor(
    @InjectModel('sms') private readonly smsModel: Model<SmsDBModel>,
  ) {
    const { APP_SID, SENDER_ID, NODE_ENV } = process.env;

    this.SMSSender = new SMSSender({
      appSid: APP_SID,
      senderId: SENDER_ID,
      environment:
        NODE_ENV === Environment.PRODUCTION
          ? SMSEnvironment.Production
          : SMSEnvironment.Sandbox,
    });
  }

  async sendSms(smsInput: SendSMSInput) {
    try {
      this.validateInput(smsInput);

      const smsBody = buildMessageBody({
        templateCode: smsInput.templateCode,
        params: smsInput.params,
        templateType: TEMPLATE_TYPE.SMS,
        language: LANGUAGE.EN,
      });

      const { recipient } = smsInput;

      const sendMessageResponse = await this.send({ recipient, body: smsBody });

      const { status: statusFromApiResponse, trackingId } = sendMessageResponse;

      return this.upsertSms(
        smsInput,
        statusFromApiResponse,
        smsBody,
        trackingId,
      );
    } catch (error) {
      console.error(
        'Error Code:',
        error.code,
        ', Error Message:',
        error.message,
      );

      return error;
    }
  }

  private validateInput(sms: SendSMSInput): void {
    const { recipient, templateCode } = sms;

    if (!recipient) throw new Error(`${ERRORS.MISSING_SMS_RECIPIENT.message}`);

    if (!templateCode)
      throw new Error(`${ERRORS.MISSING_TEMPLATE_CODE.message}`);
  }

  private async send({ recipient, body }): Promise<SendSMSResponse> {
    return this.SMSSender.sendSMS({
      recipient: recipient,
      text: body,
    }) as SendSMSResponse;
  }

  private async upsertSms(
    smsFromInput: SendSMSInput,
    statusFromResponse: SendSMSResponseStatus,
    smsBody: string,
    providerMessageId: string,
  ) {
    const { topic, recipient, referenceNumberInTopic } = smsFromInput;
    const sendMessageDbStatus =
      MAP_MESSAGE_RESPONSE_TO_MESSAGE_DB_STATUS[statusFromResponse];

    const smsFromDb = await this.smsModel
      .findOne({
        providerMessageId,
      })
      .exec();

    if (!smsFromDb) {
      return this.saveSms({
        topic,
        referenceNumberInTopic,
        providerMessageId,
        recipient,
        smsBody,
        status: sendMessageDbStatus,
        statusHistory: [
          {
            type: sendMessageDbStatus,
            timeStamp: new Date(),
          },
        ],
      });
    } else {
      // updating status and status history
      smsFromDb.status = sendMessageDbStatus;

      smsFromDb.statusHistory.push({
        type: sendMessageDbStatus,
        timeStamp: new Date(),
      });

      await smsFromDb.save();
    }
  }

  async saveSms({
    topic,
    recipient,
    smsBody,
    status,
    statusHistory,
    referenceNumberInTopic,
    providerMessageId,
  }) {
    const newSms = new this.smsModel({
      topic,
      recipient,
      body: smsBody,
      status,
      statusHistory,
      referenceNumberInTopic,
      providerMessageId,
    });
    const result = await newSms.save();
    return result.id as string;
  }
}
