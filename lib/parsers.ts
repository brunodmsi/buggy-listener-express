import { Request } from 'express';
import { IParseStackString, IParseRequestJson } from './types';

export const parseStack = ({ message, stack }: Error): IParseStackString => {
  const messageLines = (message.match(/\n/g) || []).length + 1;
  let newStack = {} as IParseStackString;

  if (stack) {
    const tempStack = stack.split('\n').slice(0, messageLines + 1);
    newStack = parseStackString(tempStack[tempStack.length - 1]);
  }

  return newStack;
}

export const parseStackString = (stackString: string): IParseStackString => {
  const stack_where = stackString.match(/[/.]\w+/g)?.join('') as string;
  const stack_line = stackString.split(':')[1];

  return {
    stack_where,
    stack_line,
  }
}

export const parseRequest = (request: Request): IParseRequestJson => {
  const { body, method, params,  path, headers, query, protocol } = request;

  const hostname = request.get('host') as string;

  return {
    request_body: JSON.stringify(body) || null,
    request_method: method,
    request_url_protocol: protocol,
    request_url: hostname,
    request_url_path: path,
    request_headers: JSON.stringify(headers),
    request_query: JSON.stringify(query),
    request_params: JSON.stringify(params),
  }
};
