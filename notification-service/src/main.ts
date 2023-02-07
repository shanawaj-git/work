import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { escribe } from './common/config/kafka';
import { AppModule } from './app.module';
const { transport, options } = escribe().escribe || {};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport,
    options,
  });
  app.startAllMicroservices();
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
