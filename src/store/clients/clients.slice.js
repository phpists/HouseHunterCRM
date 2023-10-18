import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientsCount: 0,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    saveClientsCount(state, action) {
      state.clientsCount = action.payload;
    },
  },
});

export const clientsActions = clientsSlice.actions;
export const clientsReducer = clientsSlice.reducer;
