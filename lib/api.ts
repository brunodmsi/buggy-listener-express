import axios from 'axios';

import { IApiOptions } from './types';

export const requestHandler = async ({ method, data, path }: IApiOptions) => {
  const baseUrl = 'http://localhost:8080/listeners';

  await axios({
    method,
    url: `${baseUrl}${path ? '/' + path : ''}`,
    data,
  })
}
