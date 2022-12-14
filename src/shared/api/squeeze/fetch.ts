import type { QueryParameters, Response } from './types';

const fetch = async ({
  link,
  token_type,
  access_token
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const response = await globalThis.fetch(
      `http://79.143.31.216/squeeze?link=${link}`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token_type} ${access_token}`,
          accept: 'application/json'
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
