import { TODOS_URL } from '../constant';
import { apiSlice } from './apiSlice';

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (data) => ({
        url: `${TODOS_URL}/${data.userId}`,
        headers: {
          token: `Bearer ${data.token}`,
        },
      }),
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: TODOS_URL,
        method: 'POST',
        headers: {
          token: `Bearer ${data.token}`,
        },
        body: {
          userId: data.userId,
          todo: data.todo,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/tasks/${data.id}`,
        method: 'DELETE',
        headers: {
          token: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    markComplete: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/${data.todoId}/complete`,
        method: 'PUT',
        headers: {
          token: `Bearer ${data.token}`,
        },
        body: {
          todoId: data.todoId,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    markIncomplete: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/${data.todoId}/incomplete`,
        method: 'PUT',
        headers: {
          token: `Bearer ${data.token}`,
        },
        body: {
          todoId: data.todoId,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTaskTitle: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/update/${data.taskId}`,
        method: 'PUT',
        headers: {
          token: `Bearer ${data.token}`,
        },
        body: {
          newTaskTitle: data.newTaskTitle,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTaskMutation,
  useMarkCompleteMutation,
  useMarkIncompleteMutation,
  useUpdateTaskTitleMutation,
} = todosApiSlice;
