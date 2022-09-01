import type { QueryParameters, Response } from './types';

const fetch = async ({
  username,
  password
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const response = await globalThis.fetch(
      `http://79.143.31.216/register?username=${username}&password=${password}`,
      {
        method: 'POST',
        headers: {
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
