// http://79.143.31.216/docs#/default/register_register_post

type QueryParameters = {
  username: string;
  password: string;
};

type Response = {
  username?: string;
};

export type { QueryParameters, Response };
