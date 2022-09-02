// http://79.143.31.216/docs#/default/squeeze_squeeze_post

import { LinkObject } from '../types';

type QueryParameters = {
  link: URL;
  token_type: string;
  access_token: string;
};

type Response = Partial<LinkObject>;

export type { QueryParameters, Response };
