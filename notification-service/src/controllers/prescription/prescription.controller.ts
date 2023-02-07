import { SendSMSInput } from 'src/sms/sms.interface';
import Topic from 'src/domain/Topic';
import { mapPrescriptionDataToSmsInput } from './mappers';

import { Controller } from '@nestjs/common';

import { SmsService } from 'src/sms/sms.service';
import { EVENT_TYPE_PER_TOPIC } from 'src/domain/Topic';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PrescriptionController {
  constructor(private readonly smsService: SmsService) {}

  @EventPattern(Topic.Prescription)
  async sendPrescriptionSms(data) {
    try {
      const { value } = data;

      const { eventType, topic, data: prescription } = value;
      if (EVENT_TYPE_PER_TOPIC[topic].includes(eventType)) {
        const smsServiceData = mapPrescriptionDataToSmsInput({
          prescription,
          eventType,
        });

        return this.smsService.sendSms(smsServiceData);
      }
    } catch (error) {
      console.error(
        'Error Code:',
        error.code,
        ', Error Message:',
        error.message,
      );
    }
  }
}
