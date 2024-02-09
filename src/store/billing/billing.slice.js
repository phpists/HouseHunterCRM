import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  workersCount: 0,
  companyPhoto: null,
};

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    saveBalance(state, action) {
      state.balance = action.payload;
    },
    saveWorkersCount(state, action) {
      state.workersCount = action.payload;
    },
    saveCompanyPhoto(state, action) {
      state.companyPhoto = action.payload;
    },
  },
});

export const billingActions = billingSlice.actions;
export const billingReducer = billingSlice.reducer;
