import { IConfiguration, AppHttpService, IObjectKeyValue } from '@corporate/utilities';
import { DAPR_ENDPOINTS } from './common';

let sentryDSN: string;
let sendGridApiKey: string;

export async function setupSecretValues() {
  try {
    const appHttpService = new AppHttpService();
    sentryDSN = await getSecretFromVault(appHttpService, 'SENTRY_DSN_SECRET_KEY');
    sendGridApiKey = await getSecretFromVault(appHttpService, 'SEND_GRID_API_KEY');
  } catch (error) {
    throw new Error(error);
  }
}

export function environment(): IConfiguration {
  try {
    return {
      server: {
        env: 'local',
        port: 8100,
        routePrefix: 'notification/v1'
      },
      dapr: {
        secretVaultURL: DAPR_ENDPOINTS.secretVaultURL,
        pubsubURL: DAPR_ENDPOINTS.pubsubURL,
        healthCheckURL: DAPR_ENDPOINTS.healthCheckURL
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
      },
      sendGrid: {
        apiKey: sendGridApiKey,
        verifiedSender: ''
      },
      pubnub: {
        publishKey: '12',
        subscribeKey: '12',
        uuid: '12'
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
