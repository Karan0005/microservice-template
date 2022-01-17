import * as winston from 'winston';
import { utilities } from 'nest-winston';
import * as TransportStream from 'winston-transport';

export const AppLoggerTransports: TransportStream[] = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), utilities.format.nestLike('App', { prettyPrint: true }))
  })
];
