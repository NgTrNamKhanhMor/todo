import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '~/types/todo';
import { RootState } from '~redux/store';

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

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (newTodo: Todo) => {
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
    reducers: {
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(addTodo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { id, ...rest } = action.payload;
                const newId = id || (state.todos.length ? Math.max(...state.todos.map(todo => todo.id)) + 1 : 1);
                const newTodoWithId: Todo = {
                    id: newId,
                    ...rest,
                };
                state.todos.push(newTodoWithId);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todos';
            })
            .addCase(updateTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todos';
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todos';
            });

    },
});
export const getTodosByUserId = (userId: number) => (state: RootState) => {
    return state.todos.todos.filter(todo => todo.user === userId);
};
export const { toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;

