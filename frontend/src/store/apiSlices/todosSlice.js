import { TODOS_URL } from '../constant';
import { apiSlice } from './apiSlice';

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (data) => ({
        url: TODOS_URL,
        method: 'POST',
        headers: {
          token: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    getTodos: builder.query({
      query: () => ({
        url: TODOS_URL,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const { useCreateTodoMutation, useGetTodosQuery } = todosApiSlice;
