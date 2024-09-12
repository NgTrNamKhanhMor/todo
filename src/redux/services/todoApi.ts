import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "~/api/api";
import { apiEndpoints } from "~/api/endpoints";
import { Todo } from "~/types/todo";

const baseQuery = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: any;
}) => {
  try {
    const result = await axiosInstance({
      url,
      method,
      data: body,
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as { response?: { data: any; status: number } };
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery,
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todo[], number>({
      query: (userId) => ({
        url: apiEndpoints.todo.base,
        method: "GET",
      }),
      transformResponse: (response: Todo[], meta, userId: number) =>
        response.filter((todo) => todo.user === userId),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos", id } as const)),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<Todo, Todo>({
      query: (newTodo) => ({
        url: apiEndpoints.todo.base,
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (updatedTodo) => ({
        url: `${apiEndpoints.todo.base}/${updatedTodo.id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }],
    }),
    deleteTodo: builder.mutation<number, number>({
      query: (todoId) => ({
        url: `${apiEndpoints.todo.base}/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
    toggleComplete: builder.mutation<
      void,
      { todoId: number; completed: boolean }
    >({
      query: ({ todoId, completed }) => ({
        url: `${apiEndpoints.todo.base}/${todoId}`,
        method: "PUT",
        body: { completed },
      }),
      async onQueryStarted(
        { todoId, completed },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("fetchTodos", 1, (draft) => {
            const todo = draft.find((todo) => todo.id === todoId);
            if (todo) {
              todo.completed = completed;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { todoId }) => [
        { type: "Todos", id: todoId },
      ],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleCompleteMutation,
} = todoApi;
