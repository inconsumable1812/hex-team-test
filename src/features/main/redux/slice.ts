import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { getStatistics, squeeze } from './thunks';
import { selectLinkObjects } from './selectors';

const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.linkObjects = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        const { payload } = action;

        state.status = 'fulfilled';
        state.linkObjects = payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(squeeze.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(squeeze.fulfilled, (state, action) => {
        const { payload } = action;
        const obj = {
          id: payload.id ?? 0,
          counter: payload.counter ?? 0,
          short: payload.short ?? '',
          target: payload.target ?? ''
        };

        state.status = 'fulfilled';
        state.linkObjects.push(obj);
      })
      .addCase(squeeze.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { reset } = slice.actions;

export { reducer, selectLinkObjects, reset };
