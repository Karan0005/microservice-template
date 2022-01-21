import { IConfiguration, AppHttpService, IObjectKeyValue } from '@corporate/utilities';
import { getMetadataArgsStorage } from 'typeorm';
import { DAPR_ENDPOINTS } from './common';

let dbURL: string;
let sentryDSN: string;

export async function setupSecretValues() {
  try {
    const appHttpService = new AppHttpService();
    dbURL = await getSecretFromVault(appHttpService, 'MONGO_DB_CONNECTION_SECRET_KEY');
    sentryDSN = await getSecretFromVault(appHttpService, 'SENTRY_DSN_SECRET_KEY');
  } catch (error) {
    throw new Error(error);
  }
}

export function environment(): IConfiguration {
  try {
    return {
      server: {
        env: 'local',
        port: 8000,
        routePrefix: 'base/v1'
      },
      dapr: {
        secretVaultURL: DAPR_ENDPOINTS.secretVaultURL,
        pubsubURL: DAPR_ENDPOINTS.pubsubURL,
        healthCheckURL: DAPR_ENDPOINTS.healthCheckURL
      },
      database: {
        mongodb: {
          type: 'mongodb',
          url: dbURL,
          database: 'base',
          synchronize: true,
          useUnifiedTopology: true,
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target)
        }
      },
      sentry: {
        dsn: sentryDSN,
        level: 'local',
        silent: false,
        handleExceptions: true
      },
      pubsub: {
        kafka: {
          topic: {
            email: 'local.corporate.boilerplate.notification.email'
          }
        }
      }
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function getSecretFromVault(appHttpService: AppHttpService, key: string) {
  const response: IObjectKeyValue = (await appHttpService.get(DAPR_ENDPOINTS.secretVaultURL + key)) as IObjectKeyValue;
  return response[key];
}
