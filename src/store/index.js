import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
});

setupListeners(store.dispatch);
