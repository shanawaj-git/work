import { Message } from './Message';
import Topic from '../domain/Topic';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

export class DomainEventPublisher {
  constructor(@Inject('escribe') private readonly kafkaClient: ClientKafka) {}
  publish(topic: Topic, msg: Message) {
    return this.kafkaClient.emit(topic, msg);
  }
}
export { Topic, Message };
