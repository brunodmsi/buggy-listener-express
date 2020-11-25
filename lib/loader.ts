import 'dotenv/config';
import { ILoaderInitConfig } from './types';

export const init = (options: ILoaderInitConfig = {
  dsn: undefined
}) => {
  if (options.dsn === undefined && process.env.BUGGY_DSN) {
    options.dsn = process.env.BUGGY_DSN;
  }

  if (options.dsn && typeof options.dsn !== 'string') {
    console.error('DSN is not a string! Listener not started');
    return;
  }

  global.__DSN_STRING__ = options.dsn || 'empty-string-but-not-really';
}
