import { AppHttpService, Type } from '@corporate/utilities';
import { Global, Logger, Module } from '@nestjs/common';
import { PubSubConfigConsumer, PubSubEmailConsumer } from './pubsub/consumer';
import { EmailModule } from '../email/email.module';

@Global()
@Module({
  imports: [EmailModule],
  controllers: [PubSubConfigConsumer, PubSubEmailConsumer],
  providers: [
    {
      provide: Type.AppHttpService,
      useClass: AppHttpService
    },
    Logger
  ],
  exports: []
})
export class DAPRModule {}
