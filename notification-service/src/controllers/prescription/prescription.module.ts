import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';

import { PrescriptionController } from './prescription.controller';
import { SMSSchema } from 'src/connections/mongo/model/Sms';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsModule } from 'src/sms/sms.module';
@Module({
  imports: [
    SmsModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'escribe',
        useFactory: (config: ConfigService) => {
          return config.get('escribe');
        },
      },
    ]),
  ],
  controllers: [PrescriptionController],
})
export class PrescriptionModule {}
