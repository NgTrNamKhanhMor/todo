import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "~/types/user";

interface UserState {
  currentUserId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  currentUserId: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUserId = null;
      state.status = "idle";
      state.error = null;
    },
    resetUserError: (state) => {
      state.status = "idle";
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.status = "succeeded";
      state.currentUserId = action.payload.id;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.status = "succeeded";
      state.currentUserId = action.payload.id;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  logout,
  resetUserError,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export default userSlice.reducer;
