import Sentry from 'winston-transport-sentry-node';
import { ISentryConfig } from '@corporate/utilities';

export const getSentryTransport = (sentryConfig: ISentryConfig): Sentry => {
  return new Sentry({
    sentry: {
      dsn: sentryConfig.dsn
    },
    level: sentryConfig.level,
    silent: sentryConfig.silent,
    handleExceptions: sentryConfig.handleExceptions,
    format: sentryConfig.format
  });
};
