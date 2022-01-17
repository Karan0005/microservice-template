import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { environment } from '../environments/environment';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DAPRModule } from './dapr/dapr.module';
import { EmailModule } from './email/email.module';
import { PubNubModule } from './pubnub/pubnub.module';

@Module({
  controllers: [AppController],
  providers: [Logger],
  imports: [
    DAPRModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvFile: true,
      load: [environment]
    }),
    HttpModule,
    TerminusModule,
    EmailModule,
    PubNubModule
  ]
})
export class AppModule {}
