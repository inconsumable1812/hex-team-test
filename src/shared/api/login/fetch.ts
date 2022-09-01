import type { QueryParameters, Response } from './types';

const fetch = async (
  queryParameters: QueryParameters
): Promise<Response | globalThis.Error> => {
  try {
    const body = Object.entries(queryParameters)
      .map((el) => el.join('='))
      .join('&');
    const response = await globalThis.fetch(`http://79.143.31.216/login`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await response.json();

    if (data.detail !== undefined) {
      throw new Error(data.detail);
    }

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    return error as globalThis.Error;
  }
};

export { fetch };
