import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "~/types/user";

const initialState: UserState = {
    users: [],
    currentUser: null,
    status: 'idle',
    error: null,
};

// Thunks
export const login = createAsyncThunk(
    'user/login',
    async (userCredentials: { email: string; password: string }, { getState }) => {
        const state = getState() as { user: UserState };
        if (state.user.users) {
            const user = state.user.users.find(
                (user) => user.email === userCredentials.email && user.password === userCredentials.password
            );
            if (user) {
                return user;
            } else {
                throw new Error('Wrong email or password');
            }
        } else {
            throw new Error('Wrong email or password');
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (userDetails: { name: string; email: string; password: string }, { getState }) => {
        const state = getState() as { user: UserState };
        const userExists = state.user.users?.some((user) => user.email === userDetails.email);

        if (userExists) {
            throw new Error('User already exists');
        } else {
            const newUser: User = {
                id: state.user.users ? state.user.users.length + 1 : 1,
                ...userDetails,
            };
            return newUser;
        }
    }
);

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.status = 'idle';
            state.error = null;
        },
        resetError: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to login';
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.users?.push(action.payload);
                state.currentUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to register';
            });
    },
});

export const { logout, resetError } = userSlice.actions;

export default userSlice.reducer;
