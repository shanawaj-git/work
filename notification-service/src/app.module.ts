import { Inject, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as KafkaConfig from './common/config/kafka';
import { SMSNotifierModule } from './smsnotifier/smsnotifier.module';
import { PrescriptionModule } from './controllers/prescription/prescription.module';
import { AuthenticationModule } from './controllers/authentication/authentication.module';

import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    SmsModule,
    PrescriptionModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [KafkaConfig.escribe],
    }),
    SMSNotifierModule,
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
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject('escribe') private readonly kafkaClient: ClientKafka) {}
  async onModuleInit() {
    try {
      await this.kafkaClient.connect();
    } catch (error) {
      Logger.error('Unable to connect to Kafka Brokers', error);
    }
  }
}
