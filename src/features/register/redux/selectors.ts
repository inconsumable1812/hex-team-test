import type { RootState } from 'src/app/store';

const selectRegister = (state: RootState) => state.register;

export { selectRegister };
