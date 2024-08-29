import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "~/types/user";


interface UserState {
    currentUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const users: User[] = [];

const initialState: UserState = {
    currentUser: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'user/login',
    async (userCredentials: { email: string; password: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const user = users.find(
            (user: User) =>
                user.email === userCredentials.email &&
                user.password === userCredentials.password
        );
        if (user) {
            return user;
        } else {
            throw new Error('Wrong email or password');
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (userDetails: { name: string; email: string; password: string }) => {
        const userExists = users.some((user: User) => user.email === userDetails.email);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (userExists) {
            throw new Error('User already exists');
        } else {
            const newUser: User = {
                id: users.length + 1, 
                ...userDetails
            };
            users.push(newUser);
            return newUser;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
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
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to register';
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
