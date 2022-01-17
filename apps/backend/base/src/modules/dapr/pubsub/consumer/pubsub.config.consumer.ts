import { Controller, Get, Inject, Logger, LoggerService, Res } from '@nestjs/common';
import { Response } from 'express';
import { IPubSubConfigConsumer } from '../../interfaces';

@Controller('dapr')
export class PubSubConfigConsumer implements IPubSubConfigConsumer {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  @Get('subscribe')
  subscribeKafkaTopics(@Res() response: Response): void {
    this.logger.log('DAPR Subscribing to Microservice Topics');
    response.json([]);
  }

  @Get('config')
  daprConfig(): void {
    this.logger.log('DAPR Config Route Invoked...');
  }
}
