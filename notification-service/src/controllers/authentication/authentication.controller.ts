import Topic from 'src/domain/Topic';
import { mapOtpDataToSmsInput } from './mappers';

import { Controller } from '@nestjs/common';

import { SmsService } from 'src/sms/sms.service';
import { EVENT_TYPE_PER_TOPIC } from 'src/domain/Topic';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
  constructor(private readonly smsService: SmsService) {}

  @EventPattern(Topic.Authentication)
  async sendAuthenticationSms(data) {
    try {
      const { value } = data;
      const { eventType, topic, data: otpData } = value;
      if (EVENT_TYPE_PER_TOPIC[topic].includes(eventType)) {
        const smsServiceData = mapOtpDataToSmsInput({
          otpData,
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
