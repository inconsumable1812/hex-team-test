import { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  username: string;
};

export type { State };
