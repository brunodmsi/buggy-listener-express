import { IParseStackString } from './types';

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
  const where = stackString.match(/[/.]\w+/g)?.join('') as string;
  const line = stackString.split(':')[1];

  return {
    where,
    line,
  }
}
