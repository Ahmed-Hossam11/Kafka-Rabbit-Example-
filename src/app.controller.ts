import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { MessageQueueService } from './message-queue/message-queue.service';
import * as test from 'qiniu-js'
import * as test2 from 'multer-s3'
import * as test3 from 'multer-minio-storage'
import * as test4 from 'minimist'
import * as test5 from 'kafkajs'
import ParamsWithId from './utils/paramsWithId.dto';
import { ConsumerService } from './kafka/consumer.service';
import { ProducerService } from './kafka/producer.service';
// import * as test6 from 'graphql'
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageQueueService: MessageQueueService, 
    // private readonly consumerService: ConsumerService,
    private readonly producerService: ProducerService
  ) {}

  @Public()
  @Get()
  getHello() {
    const duration = 30000
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  @Public()
  @Get(':id/publisher')
  async publish(@Param() { id }: ParamsWithId) {
    await this.messageQueueService.publishToChannel({
      routingKey: 'test1',
      exchangeName: '',
      data: id//'test to send from rabbit to another procces',
    });
    return 'OK';
  }
  @Public()
  @Get('kafka/testing')
  async getHello2() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello World',
        },
      ],
    });
    return 'Hello World!';
  }
}
