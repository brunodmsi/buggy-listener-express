import { Request } from 'express';
import { parseRequest, parseStack } from './parsers';
import { requestHandler } from './transport';
import { MiddlewareError } from './types';

export const prepareAndSendData = (error: MiddlewareError, request: Request) => {
  const { name, message, query } = error;

  const _stackParsed = parseStack(error);
  const _requestParsed = parseRequest(request);

  requestHandler({
    method: 'POST',
    path: 'express',
    data: {
      name,
      message,
      error_query: query || null,
      ..._stackParsed,
      ..._requestParsed,
      listener_key: global.__DSN_STRING__,
      type: 'backend'
    }
  })
}
