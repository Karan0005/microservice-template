import { Controller, Get, Inject, Logger, LoggerService, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSubName } from '@corporate/utilities';
import { Response } from 'express';
import { IPubSubConfigConsumer } from '../../interfaces';

@Controller('dapr')
export class PubSubConfigConsumer implements IPubSubConfigConsumer {
  constructor(private configService: ConfigService, @Inject(Logger) private readonly logger: LoggerService) {}

  @Get('subscribe')
  subscribeKafkaTopics(@Res() response: Response): void {
    this.logger.log('DAPR Subscribing to Microservice Topics');
    response.json([
      {
        pubsubname: PubSubName,
        topic: this.configService.get('pubsub.kafka.topic.email'),
        route: 'email'
      }
    ]);
  }

  @Get('config')
  daprConfig(): void {
    this.logger.log('DAPR Config Route Invoked...');
  }
}
