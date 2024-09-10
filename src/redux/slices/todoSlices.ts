import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "~/const/system";
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

const TODO_URL = API_URL + "/todo";

// Existing async thunks
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (currentUserId: number) => {
    const response = await axios.get(TODO_URL);
    const userTodos = response.data.filter(
      (todo: Todo) => todo.user === currentUserId
    );
    return userTodos;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: Todo) => {
    const response = await axios.post(TODO_URL, newTodo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: Todo) => {
    const response = await axios.put(
      `${TODO_URL}/${updatedTodo.id}`,
      updatedTodo
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId: number) => {
    await axios.delete(`${TODO_URL}/${todoId}`);
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
        await axios.put(`${TODO_URL}/${todoId}`, {
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
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to add todo";
      })

      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to update todo";
      })

      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to delete todo";
      })
      // Toggle Complete
      .addCase(toggleComplete.fulfilled, (state, action) => {
        state.status = "succeeded";
      })

      .addCase(toggleComplete.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to update todo completion status";
      });
  },
});

export const { resetTodoError } = todoSlice.actions;
export default todoSlice.reducer;
