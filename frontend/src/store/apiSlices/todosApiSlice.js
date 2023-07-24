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
        body: {
          userId: data.userId,
          todo: data.todo,
        },
        headers: {
          token: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    markComplete: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/${data.todoId}/complete`,
        method: 'PUT',
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
