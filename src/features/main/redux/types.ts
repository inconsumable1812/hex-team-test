import { LinkObject } from 'src/shared/api/types';
import { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  linkObjects: LinkObject[];
};

export type { State };
