import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  structure: null,
};

export const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {},
});

export const structureActions = structureSlice.actions;
export const structureReducer = structureSlice.reducer;
