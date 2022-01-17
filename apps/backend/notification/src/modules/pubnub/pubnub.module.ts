import { Type } from '@corporate/utilities';
import { Logger, Module } from '@nestjs/common';
import { PubNubController } from './pubnub.controller';
import { PubNubService } from './services';

@Module({
  controllers: [PubNubController],
  providers: [
    {
      provide: Type.PubNubService,
      useClass: PubNubService
    },
    Logger
  ]
})
export class PubNubModule {}
