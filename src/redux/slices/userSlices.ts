import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "~/const/system"; // Mock API URL or local storage
import { User, UserState } from "~/types/user";

const initialState: UserState = {
  currentUserId: null,
  status: "idle",
  error: null,
};

const USER_URL = API_URL + "/users";

export const login = createAsyncThunk(
  "user/login",
  async (userCredentials: { email: string; password: string }) => {
    try {
      const response = await axios.get(`${USER_URL}`);
      const users: User[] = response.data;

      const user = users.find(
        (user) =>
          user.email === userCredentials.email &&
          user.password === userCredentials.password
      );

      if (user) {
        return user;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userDetails: { name: string; email: string; password: string }) => {
    try {
      const response = await axios.get(`${USER_URL}`);
      const users: User[] = response.data;

      const userExists = users.some((user) => user.email === userDetails.email);

      if (userExists) {
        throw new Error("User with this email already exists");
      }

      const newUser: User = {
        id: users.length + 1,
        ...userDetails,
      };

      await axios.post(`${USER_URL}`, newUser);

      return newUser;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(
        error.response?.data?.message ||
          "Registration failed due to server error"
      );
    }
  }
);


// User slice
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
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUserId = action.payload.id;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      })
      //Register cases
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.currentUserId = action.payload.id;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register";
      });
  },
});

export const { logout, resetUserError } = userSlice.actions;

export default userSlice.reducer;
