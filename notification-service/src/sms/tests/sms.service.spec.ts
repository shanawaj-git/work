import { SmsService } from '../sms.service';
import { SendSMSInput, SendSMSResponseStatus } from '../sms.interface';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { SMSSchema } from 'src/connections/mongo/model/Sms';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/common/utils/testing';
import * as smsSenderModule from '@albathanext/anext-sms-sender';
import Topic from 'src/domain/Topic';
import { Environment } from 'src/common/constants';

jest.setTimeout(60000);

smsSenderModule.default.prototype.sendSMS = jest
  .fn()
  .mockImplementation(() => ({
    status: SendSMSResponseStatus.QUEUED,
    message: 'string',
    trackingId: '1234',
    success: true,
  }));

describe('sms.service', () => {
  let smsService;
  let connection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'sms', schema: SMSSchema }]),
      ],
      providers: [SmsService],
    }).compile();

    smsService = module.get<SmsService>(SmsService);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });

  const input = {
    templateCode: 'new_prescription',
    recipient: '+971xxxxxxxxx',
    params: {
      patientName: 'Ahmed',
      prescriptionUrl: 'localhost:3000',
    },
    topic: Topic.Prescription,
    referenceNumberInTopic: '566456',
  };

  it('should return message id in case of success', async () => {
    expect(SmsService).toBeDefined();

    expect(await smsService.sendSms(input as SendSMSInput)).toEqual(
      expect.any(String),
    );
  });

  it('should validate sms recipient', async () => {
    const inputWithoutRecipient = {
      ...input,
      recipient: null,
    };

    expect(
      await smsService.sendSms(inputWithoutRecipient as SendSMSInput),
    ).toMatchSnapshot();
  });

  it('should validate sms templateCode', async () => {
    const inputWithoutBody = {
      ...input,
      templateCode: null,
    };

    expect(
      await smsService.sendSms(inputWithoutBody as SendSMSInput),
    ).toMatchSnapshot();
  });

  it('should update message in DB in case it exists', async () => {
    // sending a message and writing it in the db
    await smsService.sendSms(input as SendSMSInput);
    // sending another message which should return the same id (because we mock it)
    expect(await smsService.sendSms(input as SendSMSInput)).toMatchSnapshot();
  });

  it('should use production smsSender in case of production env', async () => {
    process.env.NODE_ENV = Environment.PRODUCTION;

    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'sms', schema: SMSSchema }]),
      ],
      providers: [SmsService],
    }).compile();

    smsService = module.get<SmsService>(SmsService);
    expect(await smsService.sendSms(input as SendSMSInput)).toEqual(
      expect.any(String),
    );
  });
});
