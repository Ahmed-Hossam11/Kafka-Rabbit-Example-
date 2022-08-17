import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { UsersService } from 'src/users/users.service';
import { Constants } from '../utils/constants';
// import { RecieverOperationMessage } from './IMessageQueueService';
var ObjectId = require('mongodb').ObjectId;

@Injectable()
export class ConsumerService implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> { // onApplicationBootstrap() to validate it run after connecting db 
    this.testConsumer();
  }

  public test1 = 'test';

  constructor(private readonly userService: UsersService) {}

  // consume messages from RabbitMQ
  async testConsumer(): Promise<void> {
    console.log('here')
    // 1 create connection 
    let connection: amqp.AmqpConnectionManager = await amqp.connect(
      process.env.AMQP_URL,
    );
    // 2 create channel 
    let channel: amqp.ChannelWrapper = await connection.createChannel({
      setup: function (channel: Channel) { // between  queue and consumer 
        return Promise.all([channel.prefetch(1)]);  // num  of meesage consumer consumed  from  queue by  consumer  
      },  
    });
    connection.on('connect', function () {
      console.log(
        '\x1b[32m%s\x1b[0m',
        '[!] AMQP Connected from test consumer: ',
        process.env.AMQP_URL,
      );
    });
    //start consuming
    return new Promise((resolve, reject) => {
      let userService = this.userService;
      channel.consume(Constants.MessageQueues.TEST1, async function (msg) {
        // parse message
        let msgBody = msg.content.toString();
        let data = JSON.parse(msgBody);
        try {
          // !!
          console.log('test from consumer !! ')
          let test = await userService.findOne({_id:ObjectId(data)});
          console.log(test)
          await  userService.update({_id:ObjectId(test.id)},{points:test.points +2 } ),
          console.log("message is ack")
          await channel.ack(msg); 
        } catch (err) {
          console.log(err);
          await channel.ack(msg);
        }
      });
    });
  }
}
