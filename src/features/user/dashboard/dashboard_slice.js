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
  reducers: {
    changeLikePost: (state, action) => {
      const { id, status } = action.payload;
      const cloneData = [...state.postData];
      const index = cloneData?.findIndex((item) => item.id === id);

      cloneData[index].favorite = status;

      state.postData = cloneData;
    }
  },
  extraReducers: {
    [getPostData.pending]: (state) => {
      state.loading.getData = true;
    },
    [getPostData.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const favoritePostList = localStorage.getItem("favoritePost")?.split(",");
      const cloneData = [];

      data?.map((item) => {
        return cloneData.push({ ...item, favorite: false });
      });

      console.log(favoritePostList);

      favoritePostList?.map((item) => {
        const index = cloneData?.findIndex((post) => post.id === item);
        if (index !== -1) {
          cloneData[index].favorite = true;
        }
      });

      state.loading.getData = false;
      state.postData = cloneData;
    },
    [getPostData.rejected]: (state) => {
      state.loading.getData = false;
    }
  }
});

export const { changeLikePost } = dashboardSlice.actions;
export default dashboardSlice.reducer;