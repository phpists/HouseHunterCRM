import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestsCount: 0,
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    saveRequestsCount(state, action) {
      state.requestsCount = action.payload;
    },
  },
});

export const requestsActions = requestsSlice.actions;
export const requestsReducer = requestsSlice.reducer;
