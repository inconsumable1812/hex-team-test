import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLogin, LoginQueryParameters } from 'src/shared/api/login';

const login = createAsyncThunk(
  'login',
  async (queryParameters: LoginQueryParameters) => {
    const result = await fetchLogin(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result;
  }
);

export { login };
