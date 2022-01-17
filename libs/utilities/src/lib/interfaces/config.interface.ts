import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { IObjectKeyValue } from '.';
import { ISentryConfig } from './sentry.config.interface';

export interface IConfiguration {
  server: {
    port: number;
    env: string;
    routePrefix: string;
  };
  dapr: {
    secretVaultURL: string;
    pubsubURL: string;
    healthCheckURL: string;
  };
  sentry: ISentryConfig;
  database?: {
    mongodb?: MongoConnectionOptions;
    mssql?: SqlServerConnectionOptions
  };
  pubsub?: {
    kafka?: {
      topic: IObjectKeyValue;
    };
  };
  sendGrid?: {
    apiKey: string;
    verifiedSender: string;
  };
  pubnub?: {
    publishKey: string;
    subscribeKey: string;
    uuid: string;
  };
}
