import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessData: null,
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
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
