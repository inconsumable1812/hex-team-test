import type { State } from './types';

const initialState: State = {
  status: 'idle',
  error: null,
  access_token: null,
  token_type: null
};

export { initialState };
