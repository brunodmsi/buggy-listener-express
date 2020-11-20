import axios from 'axios';

import { IApiOptions } from './types';

export const requestHandler = async ({ method, data, path }: IApiOptions) => {
  const url = `http://localhost:8080/listeners${path ? '/' + path : ''}`;

  await axios({
    method,
    url,
    data,
  })
}
