import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '~/types/todo';

// Interface for TodoState
interface TodoState {
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    status: 'idle',
    error: null,
};

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (userId: number) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return userId;
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (newTodo: Omit<Todo, 'id'>) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return newTodo;
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (updatedTodo: Todo) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return updatedTodo;
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (todoId: number) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return todoId;
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = state.todos.filter(todo => todo.user === action.payload);
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todos';
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                const newTodoWithId: Todo = {
                    id: state.todos.length ? Math.max(...state.todos.map(todo => todo.id)) + 1 : 1,
                    ...action.payload,
                };
                state.todos.push(newTodoWithId);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
