import type { RootState } from 'src/app/store';

const selectLogin = (state: RootState) => state.login;

export { selectLogin };
