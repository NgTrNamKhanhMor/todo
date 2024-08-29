import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import todoSlices from "./slices/todoSlices";

export const store = configureStore({
    reducer: {
        user: userSlices,
        todos: todoSlices,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;