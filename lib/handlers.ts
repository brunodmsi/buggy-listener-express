import { parseStack } from './parsers';
import { requestHandler } from './api';
import { MiddlewareError } from './types';

export function requestError(options?: {
  notInstanceOf?: any,
  statusCode?: number;
}): (
  error: MiddlewareError,
  _: any,
  response: Response,
  next: (error: MiddlewareError) => void,
) => void {
  return function buggyErrorMiddleware(
    error: MiddlewareError,
    _: any,
    __: any,
    next: (error: MiddlewareError) => void
  ): void {
    if (!error) {
      next(error);
    }

    if (options?.notInstanceOf && error instanceof options.notInstanceOf
      && (
        error.status !== 500 ||
        error.statusCode !== 500 ||
        error.status_code !== 500
      )
    ) {
      next(error);
      return;
    }

    const listenerKey = global.__DSN_STRING__;

    if (!listenerKey || listenerKey === '') {
      next(error);
      return;
    }

    const { name, message, query } = error;

    const { line, where } = parseStack(error);

    requestHandler({
      method: 'POST',
      path: 'express',
      data: {
        name,
        message,
        stack_where: where,
        stack_line: line,
        listener_key: listenerKey,
        query,
        type: 'backend'
      }
    }).then(() => {});

    next(error);
  }
}
