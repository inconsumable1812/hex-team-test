// http://79.143.31.216/docs#/default/squeeze_squeeze_post

type QueryParameters = {
  link: URL;
};

type AuthorizationParameters = {
  token_type: string;
  access_token: string;
};

type Response = {
  id?: number;
  short?: string;
  target?: string;
  counter?: number;
};

export type { QueryParameters, Response, AuthorizationParameters };
