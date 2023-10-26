import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";
import { clientsReducer } from "./clients/clients.slice";
import { clients } from "./clients/clients.api";
import { requests } from "./requests/requests.api";
import { requestsReducer } from "./requests/requests.slice";
import { objects } from "./objects/objects.api";
import { objectsReducer } from "./objects/objects.slice";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    auth: authReducer,
    [clients.reducerPath]: clients.reducer,
    clients: clientsReducer,
    [requests.reducerPath]: requests.reducer,
    requests: requestsReducer,
    [objects.reducerPath]: objects.reducer,
    objects: objectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      clients.middleware,
      requests.middleware,
      objects.middleware
    ),
});

setupListeners(store.dispatch);
