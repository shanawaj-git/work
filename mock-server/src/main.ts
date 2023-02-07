import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.SERVICE_PORT || 5001;
const API_URL = process.env.API_URL || '/api/v1';
const API_DOC = process.env.API_DOC || '/api/v1/docs';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_URL);

  const config = new DocumentBuilder()
    .setTitle('Mock server')
    .setDescription(
      'Mock server used for publishing events and messages to kafka instance',
    )
    .setVersion('1.0')
    .addTag('Mock server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_DOC, app, document);

  await app.listen(PORT);
}
bootstrap();
