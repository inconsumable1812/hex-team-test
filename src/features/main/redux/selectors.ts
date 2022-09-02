import type { RootState } from 'src/app/store';

const selectLinkObjects = (state: RootState) => state.main;

export { selectLinkObjects };
