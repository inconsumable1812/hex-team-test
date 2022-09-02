import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchRegister,
  RegisterQueryParameters
} from 'src/shared/api/register';

const register = createAsyncThunk(
  'register',
  async (queryParameters: RegisterQueryParameters) => {
    const result = await fetchRegister(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result;
  }
);

export { register };
