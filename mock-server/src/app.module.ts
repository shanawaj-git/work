import { Module } from '@nestjs/common';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    PrescriptionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
