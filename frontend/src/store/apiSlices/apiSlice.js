import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('token', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Todo'],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
});
