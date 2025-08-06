import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smsMessage: "",
  smsTagsMessage: "",
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setSmsMessage(state, action) {
      state.smsMessage = action.payload;
    },
    setSmsTagsMessage(state, action) {
      state.smsTagsMessage = action.payload;
    },
  },
});

export const carActions = carSlice.actions;
export const carReducer = carSlice.reducer;
