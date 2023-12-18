import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callsCount: 0,
};

export const callsSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    saveCallsCount(state, action) {
      state.callsCount = action.payload;
    },
  },
});

export const callsActions = callsSlice.actions;
export const callsReducer = callsSlice.reducer;
