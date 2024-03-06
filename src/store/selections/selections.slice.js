import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectionsCount: 0,
  selectionName: undefined,
};

export const selectionsSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    saveSelectionsCount(state, action) {
      state.selectionsCount = action.payload;
    },
    saveSelectionName(state, action) {
      state.selectionName = action.payload;
    },
  },
});

export const selectionsActions = selectionsSlice.actions;
export const selectionsReducer = selectionsSlice.reducer;
