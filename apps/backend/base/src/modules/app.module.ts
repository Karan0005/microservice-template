import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { environment } from '../environments/environment';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DAPRModule } from './dapr/dapr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFormatErrorFactory, GraphQLFormatResponseFactory, TypeORMConfigFactory } from '@corporate/utilities';
import { DemoModule } from './demo/demo.module';
import { GraphQLModule } from '@nestjs/graphql';

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
    GraphQLModule.forRoot({
      useGlobalPrefix: true,
      autoSchemaFile: true,
      formatError: GraphQLFormatErrorFactory,
      formatResponse: GraphQLFormatResponseFactory
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeORMConfigFactory
    }),
    HttpModule,
    TerminusModule,
    DemoModule
  ]
})
export class AppModule {}
