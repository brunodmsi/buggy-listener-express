import { Response, NextFunction } from 'express';
import { parseStack } from './parsers';
import { requestHandler } from './api';

export const requestError = async (error: Error, _: any, response: Response, next: NextFunction): Promise<void> => {
  if (!error) {
    return;
  }

  const listenerKey = global.__DSN_STRING__;

  if (!listenerKey || listenerKey === '') {
    return;
  }

  const { name, message } = error;

  const { line, where } = parseStack(error);


  await requestHandler({
    method: 'POST',
    path: 'express',
    data: {
      name,
      message,
      stack_where: where,
      stack_line: line,
      listener_key: listenerKey,
      type: 'backend'
    }
  })
}
