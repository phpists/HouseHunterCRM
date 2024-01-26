import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workersCount: null,
};

export const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {
    saveStructureWorkersCount(state, action) {
      state.workersCount = action.payload;
    },
  },
});

export const structureActions = structureSlice.actions;
export const structureReducer = structureSlice.reducer;
