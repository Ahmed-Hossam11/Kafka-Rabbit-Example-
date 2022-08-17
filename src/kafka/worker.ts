import { NestFactory } from '@nestjs/core';
import { MessageQueueKafkaModule } from './test1-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(MessageQueueKafkaModule);
  app.init(); 
}

bootstrap();
 