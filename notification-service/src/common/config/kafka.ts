import { Transport } from '@nestjs/microservices';
import Topic from './../../domain/Topic';

export const escribe = (): any => ({
  escribe: {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID || 'notifications-service',
        brokers: [process.env.KAFKA_BROKERS],
        sasl: {
          username: process.env.KAFKA_SASL_USERNAME,
          password: process.env.KAFKA_SASL_PASSWORD,
          mechanism: 'plain',
        },
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'notifications-service',
        allowAutoTopicCreation: false,
      },
      producer: {
        allowAutoTopicCreation: false,
      },
      topics: Object.values(Topic),
    },
  },
});
