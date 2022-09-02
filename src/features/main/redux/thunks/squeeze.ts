import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchSqueeze, SqueezeQueryParameters } from 'src/shared/api/squeeze';

const squeeze = createAsyncThunk(
  'squeeze',
  async (queryParameters: SqueezeQueryParameters) => {
    const result = await fetchSqueeze(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result;
  }
);

export { squeeze };
