import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "~/api/endpoints";
import { Todo } from "~/types/todo";
import { RootState } from "~redux/store";

interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (currentUserId: number) => {
    const response = await axios.get(apiEndpoints.todo.getAll);
    const userTodos = response.data.filter(
      (todo: Todo) => todo.user === currentUserId
    );
    return userTodos;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: Todo) => {
    const response = await axios.post(apiEndpoints.todo.create, newTodo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: Todo) => {
    const response = await axios.put(
      apiEndpoints.todo.updateById(updatedTodo.id),
      updatedTodo
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId: number) => {
    await axios.delete(apiEndpoints.todo.deleteById(todoId));
    return todoId;
  }
);

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (todoId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const todo = state.todos.todos.find((todo) => todo.id === todoId);

    if (todo) {
      dispatch(todoSlice.actions.toggleCompleteOptimistic(todoId));

      try {
        await axios.put(apiEndpoints.todo.updateById(todoId), {
          completed: !todo.completed,
        });
      } catch (error) {
        dispatch(todoSlice.actions.toggleCompleteOptimistic(todoId));
        throw error;
      }
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleCompleteOptimistic: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    resetTodoError: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch todos";
      })

      // Add Todo
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to add task";
      })

      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to update task";
      })

      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to delete task";
      })

      // Toggle Complete
      .addCase(toggleComplete.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(toggleComplete.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetTodoError} = todoSlice.actions;
export default todoSlice.reducer;
