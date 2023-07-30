import { USERS_URL } from '../constant';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    updateDisplayName: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: {
          userId: data.userId,
          newDisplayName: data.newDisplayName,
        },
      }),
      invalidatesTags: ['User'],
    }),
    updateEmail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}/email`,
        method: 'PUT',
        body: {
          userId: data.userId,
          newEmail: data.newEmail,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserInfoMutation,
  useRegisterMutation,
  useUpdateDisplayNameMutation,
  useUpdateEmailMutation,
} = usersApiSlice;
