// http://79.143.31.216/docs#/default/log_in_login_post

type QueryParameters = {
  username: string;
  password: string;

  grant_type?: boolean;
  scope?: boolean;
  client_id?: string;
  client_secret?: string;
};

type Response = {
  access_token?: string;
  token_type?: string;

  detail?: string;
};

export type { QueryParameters, Response };
