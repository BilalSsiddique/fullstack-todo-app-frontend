import todoReducer from './slice/todoSlice'
import { configureStore } from "@reduxjs/toolkit";
import localStorageMiddleware from './slice/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch