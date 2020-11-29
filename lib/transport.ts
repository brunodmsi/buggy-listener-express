import axios from 'axios';

import { IApiOptions } from './types';

export const requestHandler = async ({ method, data, path }: IApiOptions) => {
  try {
    const url = `https://buggy.demasi.dev/api/listeners${path ? '/' + path : ''}`;

    await axios({
      method,
      url,
      data,
    })
  } catch (err) {
    console.log('Error when sending bug to Buggy')
  }
}
