import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { login } from './thunks/login';
import { selectLogin } from './selectors';

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    statusReset: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action;
        const { access_token, token_type } = payload;

        state.status = 'fulfilled';
        state.access_token = access_token ?? null;
        state.token_type = token_type ?? null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { statusReset } = slice.actions;

export { reducer, selectLogin, statusReset };
