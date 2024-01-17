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
import { structure } from "./structure/structure.api";
import { structureReducer } from "./structure/structure.slice";
import { calls } from "./calls/calls.api";
import { callsReducer } from "./calls/calls.slice";
import { selections } from "./selections/selections.api";
import { selectionsReducer } from "./selections/selections.slice";
import { billing } from "./billing/billing.api";
import { billingReducer } from "./billing/billing.slice";

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
    [structure.reducerPath]: structure.reducer,
    structure: structureReducer,
    [calls.reducerPath]: calls.reducer,
    calls: callsReducer,
    [selections.reducerPath]: selections.reducer,
    selections: selectionsReducer,
    [billing.reducerPath]: billing.reducer,
    billing: billingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      clients.middleware,
      requests.middleware,
      objects.middleware,
      structure.middleware,
      calls.middleware,
      selections.middleware,
      billing.middleware
    ),
});

setupListeners(store.dispatch);
