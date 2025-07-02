import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectsCount: null,
  objects: [],
  selected: [],
  isFavorite: [],
  filtersFields: [],
  isAllPages: false,
  loading: false,
  allCount: 0,
  updateData: false,
  actionLoading: false,
  phoneCode: 1,
  isDeleted: false,
};

export const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    saveObjectsCount(state, action) {
      state.objectsCount = action.payload;
    },
    setObjects(state, action) {
      state.objects = action.payload;
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setIsFavorite(state, action) {
      state.isFavorite = action.payload;
    },
    setFilterFields(state, action) {
      state.filtersFields = action.payload;
    },
    setIsAllPages(state, action) {
      state.isAllPages = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAllCount(state, action) {
      state.allCount = action.payload;
    },
    setUpdateData(state, action) {
      state.updateData = action.payload;
    },
    setActionLoading(state, action) {
      state.actionLoading = action.payload;
    },
    setPhoneCode(state, action) {
      state.phoneCode = action.payload;
    },
    setIsDeleted(state, action) {
      state.isDeleted = action.payload;
    },
  },
});

export const objectsActions = objectsSlice.actions;
export const objectsReducer = objectsSlice.reducer;
