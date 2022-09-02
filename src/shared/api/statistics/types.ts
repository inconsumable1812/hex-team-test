// http://79.143.31.216/docs#/default/statistics_statistics_get

import { LinkObject } from '../types';

type QueryParameters = {
  offset?: number;
  limit?: number;

  token_type: string;
  access_token: string;
};

type Response = Partial<LinkObject>[];

export type { QueryParameters, Response };
