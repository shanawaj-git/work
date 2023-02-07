import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmsService } from './sms.service';
import { SMSSchema } from 'src/connections/mongo/model/Sms';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'sms', schema: SMSSchema }])],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
