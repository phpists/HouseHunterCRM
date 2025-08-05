import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smsMessage: "",
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setSmsMessage(state, action) {
      state.smsMessage = action.payload;
    },
  },
});

export const carActions = carSlice.actions;
export const carReducer = carSlice.reducer;
