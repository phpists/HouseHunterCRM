import { createSlice } from "@reduxjs/toolkit";
import { checkIsJSON } from "../../utilits";

const initialState = {
  user: null,
  accessData: null,
  theme: "dark",
  notifications: checkIsJSON(localStorage.getItem("savedNotifications"))
    ? JSON.parse(localStorage.getItem("savedNotifications"))
    : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    saveAccess(state, action) {
      state.accessData = action.payload;
    },
    changeTheme(state, action) {
      state.theme = action.payload;
    },
    addNotification(state, action) {
      const updatedValue = [...state.notifications, action.payload];
      localStorage.setItem("savedNotifications", JSON.stringify(updatedValue));
      state.notifications = [...state.notifications, action.payload];
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
