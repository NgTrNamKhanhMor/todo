import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { basePaths } from "~/api/endpoints";
import { Todo } from "~/types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: basePaths.todo }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todo[], number>({
      query: (userId) => "/",
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
        url: "",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (updatedTodo) => ({
        url: `/${updatedTodo.id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }],
    }),
    deleteTodo: builder.mutation<number, number>({
      query: (todoId) => ({
        url: `/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
    toggleComplete: builder.mutation<
      void,
      { todoId: number; completed: boolean }
    >({
      query: ({ todoId, completed }) => ({
        url: `/${todoId}`,
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
