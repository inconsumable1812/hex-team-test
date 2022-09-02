import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as loginReducer } from 'src/features/login';
import { reducer as mainReducer } from 'src/features/main';
import { reducer as registerReducer } from 'src/features/register';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    main: mainReducer,
    register: registerReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
