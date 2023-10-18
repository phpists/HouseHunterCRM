import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";
import { clientsReducer } from "./clients/clients.slice";
import { clients } from "./clients/clients.api";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    auth: authReducer,
    [clients.reducerPath]: clients.reducer,
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware, clients.middleware),
});

setupListeners(store.dispatch);
