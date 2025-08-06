import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsCount: 0,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    saveNotificationsCount(state, action) {
      state.notificationsCount = action.payload;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
