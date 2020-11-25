import { Request } from 'express';
import * as http from 'http';

import { prepareAndSendData } from './client';
import { parseStack, parseRequest } from './parsers';
import { MiddlewareError } from './types';

export function requestError(options?: {
  notInstanceOf?: any,
}): (
  error: MiddlewareError,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: (error: MiddlewareError) => void,
) => void {
  return function buggyErrorMiddleware(
    error: MiddlewareError,
    _req: http.IncomingMessage,
    res: http.ServerResponse,
    next: (error: MiddlewareError) => void,
  ): void {
    if (!error) {
      next(error);
    }

    if (options?.notInstanceOf && error instanceof options.notInstanceOf
      && (
        error.status !== 500 ||
        error.statusCode !== 500 ||
        error.status_code !== 500
      ) || error.name === 'Error'
    ) {
      next(error);
      return;
    }

    if (!global.__DSN_STRING__ || global.__DSN_STRING__ === '') {
      next(error);
      return;
    }

    prepareAndSendData(error, _req as Request);

    next(error);
  }
}
