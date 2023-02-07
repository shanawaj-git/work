import { Module } from '@nestjs/common';
import {ProducerService} from "./producer";

@Module({
    exports:[ProducerService],
    providers:[ProducerService]
})

export class KafkaModule {}
