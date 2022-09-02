import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchStatistics,
  StatisticsQueryParameters
} from 'src/shared/api/statistics';
import { isFullObject } from '../../guards/isFullObject';

const getStatistics = createAsyncThunk(
  'getStatistics',
  async (queryParameters: StatisticsQueryParameters) => {
    const result = await fetchStatistics(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result.filter(isFullObject);
  }
);

export { getStatistics };
