import { AppHttpService, IPubSubEvent, PubSubEvents, Type } from '@corporate/utilities';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPubSubNotificationEvent } from '../../interfaces';
import { CreateDemoInputDTO } from '../../../demo/dto/input';

@Injectable()
export class PubSubNotificationEvent implements IPubSubNotificationEvent {
  private topic: string;
  private publishUrl: string;

  constructor(
    private configService: ConfigService,
    @Inject(Type.AppHttpService) private appHttpService: AppHttpService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {
    this.topic = this.configService.get('pubsub.kafka.topic.email') || '';
    this.publishUrl = this.configService.get('dapr.pubsubURL') + this.topic;
  }

  async create(demo: CreateDemoInputDTO): Promise<void> {
    const event: IPubSubEvent = {
      event: PubSubEvents.CreateDemoEvent,
      data: JSON.stringify(demo)
    };
    await this.appHttpService.post(this.publishUrl, event);
    this.logger.log('Event published on ' + this.topic + ' with payload ' + JSON.stringify(event));
  }
}
