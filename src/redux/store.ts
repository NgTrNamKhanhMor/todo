import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./userSlices";

export const store = configureStore({
    reducer: {
        user: userSlices
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;