import type { QueryParameters, Response } from './types';

const fetch = async ({
  token_type,
  access_token,
  offset = 0,
  limit = 0
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const response = await globalThis.fetch(
      `http://79.143.31.216/statistics?order=asc_short&offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token_type} ${access_token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

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
