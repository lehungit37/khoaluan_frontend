import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/helper";
import postApi from "./../../../api/post";

export const getPostData = createAsyncThunk(
  "post/getdata",
  payloadCreator(postApi.getDataByCategories)
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: {
      getData: false
    },
    postData: []
  },
  reducer: {},
  extraReducers: {
    [getPostData.pending]: (state) => {
      state.loading.getData = true;
    },
    [getPostData.fulfilled]: (state, action) => {
      state.loading.getData = false;
      state.postData = action.payload?.data;
    },
    [getPostData.rejected]: (state) => {
      state.loading.getData = false;
    }
  }
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
