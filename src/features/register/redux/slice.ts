import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { register } from './thunks/register';
import { selectRegister } from './selectors';

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    statusReset: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        const { payload } = action;
        const { username } = payload;

        state.status = 'fulfilled';
        state.username = username ?? '';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { statusReset } = slice.actions;

export { reducer, selectRegister, statusReset };
