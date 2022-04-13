import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../utils/helper";
import postApi from "./../api/post";

export const getInfoPost = createAsyncThunk(
  "post/getInfo",
  payloadCreator(postApi.getInfoPost)
);

export const getPostByUser = createAsyncThunk(
  "post/getPostByUser",
  payloadCreator(postApi.getPostByUser)
);

export const displayPost = createAsyncThunk(
  "post/displayPost",
  payloadCreator(postApi.displayPost)
);
export const hiddenPost = createAsyncThunk(
  "post/hiddenPost",
  payloadCreator(postApi.hiddenPost)
);

export const deletePost = createAsyncThunk(
  "post/delete",
  payloadCreator(postApi.deletePost)
);

export const getInfoPostEdit = createAsyncThunk(
  "post/getInfoEdit",
  payloadCreator(postApi.getPostEdit)
);

export const updatePost = createAsyncThunk(
  "post/update",
  payloadCreator(postApi.updatePost)
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    infoPost: {},
    infoAuthorPost: {},
    loading: {
      getInfo: false,
      getPostByUser: false,
      displayPost: false,
      hiddenPost: false,
      deletePost: false,
      updatePost: false
    },
    lastestPost: [],
    relatedPost: [],
    reject: {
      getInfo: false,
      getPostByUser: false
    },
    postData: [],
    totalData: 0,
    page: 1,
    limit: 15
  },
  reducer: {},
  extraReducers: {
    [getInfoPost.pending]: (state) => {
      state.loading.getInfo = true;
      state.reject.getInfo = false;
    },
    [getInfoPost.fulfilled]: (state, action) => {
      const { infoPost, infoAuthPost, lastestPost, relatedPost } =
        action.payload;
      state.infoPost = infoPost;
      state.infoAuthorPost = infoAuthPost;
      state.loading.getInfo = false;
      state.lastestPost = lastestPost;
      state.relatedPost = relatedPost;
      state.reject.getInfo = false;
    },
    [getInfoPost.rejected]: (state) => {
      state.loading.getInfo = false;
      state.reject.getInfo = true;
    },
    [getPostByUser.pending]: (state) => {
      state.loading.getPostByUser = true;
      state.reject.getPostByUser = false;
    },
    [getPostByUser.fulfilled]: (state, action) => {
      const { postData, totalData } = action.payload;
      state.postData = postData;
      state.totalData = totalData;
      state.loading.getPostByUser = false;
      state.reject.getPostByUser = false;
    },
    [getPostByUser.rejected]: (state) => {
      state.loading.getPostByUser = false;
      state.reject.getPostByUser = true;
    },
    [displayPost.pending]: (state) => {
      state.loading.displayPost = true;
    },
    [displayPost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postData?.findIndex((post) => post.id === id);
      state.postData[indexPost].status = true;
      state.loading.displayPost = false;
    },
    [displayPost.rejected]: (state) => {
      state.loading.displayPost = false;
    },
    [hiddenPost.pending]: (state) => {
      state.loading.hiddenPost = true;
    },
    [hiddenPost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postData?.findIndex((post) => post.id === id);
      state.postData[indexPost].status = false;
      state.loading.hiddenPost = false;
    },
    [hiddenPost.rejected]: (state) => {
      state.loading.hiddenPost = false;
    },
    [deletePost.pending]: (state) => {
      state.loading.deletePost = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const cloneData = [...state.postData];
      const indexPost = cloneData?.findIndex((post) => post.id === id);
      cloneData.splice(indexPost, 1);
      state.postData = cloneData;
      state.loading.deletePost = false;
    },
    [deletePost.rejected]: (state) => {
      state.loading.deletePost = false;
    },
    [getInfoPostEdit.pending]: (state) => {
      state.loading.getInfo = true;
    },
    [getInfoPostEdit.fulfilled]: (state, action) => {
      state.loading.getInfo = false;

      state.infoPost = action.payload;
    },
    [getInfoPostEdit.rejected]: (state) => {
      state.loading.getInfo = false;
    },
    [updatePost.pending]: (state) => {
      state.loading.updatePost = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading.updatePost = false;
    },
    [updatePost.rejected]: (state) => {
      state.loading.updatePost = false;
    }
  }
});

export const {} = postSlice.actions;
export default postSlice.reducer;
