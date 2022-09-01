import { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  access_token: null | string;
  token_type: null | string;
};

export type { State };
