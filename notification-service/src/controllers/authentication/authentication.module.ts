import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { AuthenticationController } from './authentication.controller';
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
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
