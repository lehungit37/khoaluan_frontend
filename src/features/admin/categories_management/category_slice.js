import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../../../api/category_api";
import { payloadCreator } from "./../../../utils/helper";

export const addCategory = createAsyncThunk(
  "category/add",
  payloadCreator(categoryApi.addCategory)
);

export const getData = createAsyncThunk(
  "category/getData",
  payloadCreator(categoryApi.getAllData)
);

export const updateCategory = createAsyncThunk(
  "category/update",
  payloadCreator(categoryApi.updateCategory)
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  payloadCreator(categoryApi.deleteCategory)
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    infoEdit: {
      id: "",
      nameCategories: ""
    },
    categoryList: [],
    totalData: 0,
    page: 1,
    limit: 10,
    loading: {
      add: false,
      getData: false,
      update: false,
      delete: false
    }
  },
  reducers: {
    setValueEditCategory: (state, action) => {
      const data = action.payload;
      state.infoEdit = data;
    },
    resetValueEditCategory: (state, action) => {
      state.infoEdit = {
        id: "",
        nameCategories: ""
      };
    }
  },
  extraReducers: {
    [addCategory.pending]: (state, action) => {
      state.loading.add = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      const newDataItem = action.payload;
      const cloneData = [...state.categoryList];
      cloneData.unshift(newDataItem);
      state.categoryList = cloneData;
      state.loading.add = false;
    },
    [getData.pending]: (state, action) => {
      state.loading.getData = true;
    },
    [getData.fulfilled]: (state, action) => {
      const { data, totalData } = action.payload;
      state.totalData = totalData;
      state.categoryList = data;
      state.loading.getData = false;
    },
    [updateCategory.pending]: (state) => {
      state.loading.update = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      const newCategory = action.meta.arg;
      const cloneData = [...state.categoryList];

      const index = cloneData.findIndex((item) => item.id === newCategory.id);
      cloneData.splice(index, 1, newCategory);

      state.categoryList = cloneData;
    },
    [deleteCategory.pending]: (state) => {
      state.loading.delete = true;
    },
    [deleteCategory.fulfilled]: (state) => {
      state.loading.delete = false;
    }
  }
});

export const { setValueEditCategory, resetValueEditCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
