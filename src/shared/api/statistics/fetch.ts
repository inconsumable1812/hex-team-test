import type {
  AuthorizationParameters,
  QueryParameters,
  Response
} from './types';

const fetch = async (
  { offset = 0, limit = 0 }: QueryParameters,
  { token_type, access_token }: AuthorizationParameters
): Promise<Response | globalThis.Error> => {
  try {
    const response = await globalThis.fetch(
      `http://79.143.31.216/statistics?order=asc_short&offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
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
