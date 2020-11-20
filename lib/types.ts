declare global {
  namespace NodeJS {
    interface Global {
      __DSN_STRING__: string;
    }
  }
}

export interface ILoaderInitConfig {
  dsn?: string;
}

export interface IParseStackString {
  where: string;
  line: string;
}

export interface IApiOptions {
  path: string;
  data?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export interface MiddlewareError extends Error {
  status?: number | string;
  statusCode?: number | string;
  status_code?: number | string;
  query?: string;
}
