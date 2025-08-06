import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smsMessage: "",
  smsTagsMessage: "",
  isFavorite: "",
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
    setIsFavorite(state, action) {
      state.isFavorite = action.payload;
    },
  },
});

export const carActions = carSlice.actions;
export const carReducer = carSlice.reducer;
