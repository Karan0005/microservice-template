import * as logform from 'logform';

export interface ISentryConfig {
  dsn: string;
  level: string;
  silent: boolean;
  handleExceptions: boolean;
  format?: logform.Format;
}
