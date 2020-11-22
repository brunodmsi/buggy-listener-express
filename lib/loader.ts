import { ILoaderInitConfig } from './types';

export const init = (options?: ILoaderInitConfig) => {
  if (options?.dsn && typeof options.dsn !== 'string') {
    console.error('DSN is not a string! Listener not started');
    return;
  }

  if (options && options.dsn === undefined && process.env.BUGGY_DSN) {
    options.dsn = process.env.BUGGY_DSN;
  }

  global.__DSN_STRING__ = options?.dsn || '';
}
