import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectsCount: null,
};

export const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    saveObjectsCount(state, action) {
      state.objectsCount = action.payload;
    },
  },
});

export const objectsActions = objectsSlice.actions;
export const objectsReducer = objectsSlice.reducer;
