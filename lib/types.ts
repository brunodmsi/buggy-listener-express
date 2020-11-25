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
  stack_where: string;
  stack_line: string;
}

export interface IParseRequestJson {
  request_body: string | null;
  request_method: string;
  request_url_protocol: string;
  request_url: string;
  request_url_path: string;
  request_headers: string;
  request_query: string;
  request_params: string;
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
