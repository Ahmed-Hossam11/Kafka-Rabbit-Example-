import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class TestConsumer implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> { // onApplicationBootstrap() to validate it run after connecting db 
    this.testConsumer();
  }

  constructor(private readonly consumerService: ConsumerService) {}

  async testConsumer() {
    await this.consumerService.consume(
      { topic: 'test' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
