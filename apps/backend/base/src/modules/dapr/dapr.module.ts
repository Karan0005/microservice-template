import { AppHttpService, Type } from '@corporate/utilities';
import { Global, Logger, Module } from '@nestjs/common';
import { PubSubConfigConsumer } from './pubsub/consumer';
import { PubSubNotificationEvent } from './pubsub/events';

@Global()
@Module({
  controllers: [PubSubConfigConsumer],
  providers: [
    {
      provide: Type.AppHttpService,
      useClass: AppHttpService
    },
    {
      provide: Type.PubSubNotificationEvent,
      useClass: PubSubNotificationEvent
    },
    Logger
  ],
  exports: [
    {
      provide: Type.PubSubNotificationEvent,
      useClass: PubSubNotificationEvent
    }
  ]
})
export class DAPRModule {}
